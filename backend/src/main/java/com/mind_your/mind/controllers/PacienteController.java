package com.mind_your.mind.controllers;

import com.mind_your.mind.models.Paciente;
import com.mind_your.mind.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;

import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    private final PacienteRepository pacienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public PacienteController(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    // Cadastrar
    @PostMapping("/cadastrar")
    public ResponseEntity<Paciente> cadastrar(@RequestBody Paciente paciente) {
        // Se o login não for fornecido, usa o email como login
        if (paciente.getLogin() == null || paciente.getLogin().isEmpty()) {
            paciente.setLogin(paciente.getEmail());
        }
        // Criptografar a senha antes de salvar
        paciente.setSenha(passwordEncoder.encode(paciente.getSenha()));
        Paciente novo = pacienteRepository.save(paciente);
        return ResponseEntity.ok(novo);
    }

    // Listar todos
    @GetMapping
    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    // Buscar por email
    @GetMapping("/email/{email}")
    public ResponseEntity<Paciente> buscarPorEmail(@PathVariable String email) {
        Optional<Paciente> paciente = pacienteRepository.findByEmail(email);
        return paciente.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Buscar por nome
    @GetMapping("/nome/{nome}")
    public ResponseEntity<Paciente> buscarPorNome(@PathVariable String nome) {
        Optional<Paciente> paciente = pacienteRepository.findByNome(nome);
        return paciente.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Buscar por login (email ou username)
    @GetMapping("/login/{login}")
    public ResponseEntity<Paciente> buscarPorLogin(@PathVariable String login) {
        // Se for e-mail válido
        if (login.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            return pacienteRepository.findByEmail(login)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } else {
            return pacienteRepository.findByLogin(login)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
    }

    // Atualizar
@PutMapping("/{id}")
public ResponseEntity<Paciente> atualizar(@PathVariable String id, @RequestBody Paciente camposAtualizados) {
    return pacienteRepository.findById(id)
            .map(p -> {
                if (camposAtualizados.getNome() != null) p.setNome(camposAtualizados.getNome());
                if (camposAtualizados.getSobrenome() != null) p.setSobrenome(camposAtualizados.getSobrenome());
                if (camposAtualizados.getLogin() != null) p.setLogin(camposAtualizados.getLogin()); // ✅ ADICIONAR ESTA LINHA
                if (camposAtualizados.getEmail() != null) p.setEmail(camposAtualizados.getEmail());
                if (camposAtualizados.getSenha() != null) p.setSenha(passwordEncoder.encode(camposAtualizados.getSenha()));
                if (camposAtualizados.getDtNascimento() != null) p.setDtNascimento(camposAtualizados.getDtNascimento());
                if (camposAtualizados.getGenero() != null) p.setGenero(camposAtualizados.getGenero());
                if (camposAtualizados.getTelefone() != null) p.setTelefone(camposAtualizados.getTelefone());
                if (camposAtualizados.getEndereco() != null) p.setEndereco(camposAtualizados.getEndereco());
                if (camposAtualizados.getImgPerfil() != null) p.setImgPerfil(camposAtualizados.getImgPerfil());
                if (camposAtualizados.getSobreMim() != null) p.setSobreMim(camposAtualizados.getSobreMim());
                if (camposAtualizados.getMedicamentos() != null) p.setMedicamentos(camposAtualizados.getMedicamentos());
                if (camposAtualizados.getPreferencias() != null) p.setPreferencias(camposAtualizados.getPreferencias());

                Paciente atualizado = pacienteRepository.save(p);
                return ResponseEntity.ok(atualizado);
            }).orElse(ResponseEntity.notFound().build());
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPorId(@PathVariable String id) {
        return pacienteRepository.findById(id)
                .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Deletar por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) {
        if (pacienteRepository.existsById(id)) {
            pacienteRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Paciente> login(@RequestBody Map<String, String> dados) {
    String login = dados.get("login");
    String senha = dados.get("senha");

    Optional<Paciente> pacienteOpt;

    if (login.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
        pacienteOpt = pacienteRepository.findByEmail(login);
    } else {
        pacienteOpt = pacienteRepository.findByLogin(login);
    }

    if (pacienteOpt.isEmpty()) {
        return ResponseEntity.status(400).build();
    }

    Paciente paciente = pacienteOpt.get();

    if (!passwordEncoder.matches(senha, paciente.getSenha())) {
        return ResponseEntity.status(400).build();
    }

    return ResponseEntity.ok(paciente);
}

@PostMapping("/{id}/imagem")
    public ResponseEntity<?> uploadImagem(
            @PathVariable String id, 
            @RequestParam("imagem") MultipartFile file) {
        
        System.out.println("Recebido upload para paciente ID: " + id);
        System.out.println("Nome do arquivo: " + file.getOriginalFilename());
        System.out.println("Tamanho: " + file.getSize() + " bytes");
        
        try {
            // Validar se o arquivo é uma imagem
            String contentType = file.getContentType();
            System.out.println("Content-Type: " + contentType);
            
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest().body("Arquivo deve ser uma imagem");
            }

            // Validar tamanho (máximo 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                return ResponseEntity.badRequest().body("Imagem deve ter no máximo 5MB");
            }

            // Buscar paciente
            Optional<Paciente> pacienteOpt = pacienteRepository.findById(id);
            if (pacienteOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Paciente paciente = pacienteOpt.get();

            // Criar diretório se não existir
            Path uploadPath = Paths.get("uploads/users-pictures").toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);
            System.out.println("Diretório de upload: " + uploadPath);

            // Deletar imagem antiga se existir
            if (paciente.getImgPerfil() != null && !paciente.getImgPerfil().isEmpty()) {
                try {
                    Path oldImagePath = uploadPath.resolve(paciente.getImgPerfil());
                    Files.deleteIfExists(oldImagePath);
                    System.out.println("Imagem antiga deletada");
                } catch (Exception e) {
                    System.out.println("Não foi possível deletar imagem antiga");
                }
            }

            // Gerar nome único para o arquivo
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".") 
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : ".png";
            
            String filename = "perfil-" + paciente.getLogin() + "-" + UUID.randomUUID().toString().substring(0, 8) + extension;
            System.out.println("Nome do arquivo gerado: " + filename);

            // Salvar arquivo
            Path targetLocation = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Arquivo salvo em: " + targetLocation);

            // Atualizar banco de dados
            paciente.setImgPerfil(filename);
            pacienteRepository.save(paciente);
            
            System.out.println("Imagem salva com sucesso: " + filename);
            System.out.println("Paciente atualizado no banco");

            return ResponseEntity.ok(Map.of(
                "mensagem", "Imagem enviada com sucesso",
                "imgPerfil", filename
            ));

        } catch (Exception e) {
            System.err.println("Erro no upload: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao fazer upload da imagem: " + e.getMessage());
        }
    }
    
}
