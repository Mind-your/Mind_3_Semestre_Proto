package com.mind_your.mind.controllers;

import com.mind_your.mind.models.Psicologo;
import com.mind_your.mind.repository.PsicologoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RestController
@RequestMapping("/psicologos")
public class PsicologoController {

    private final PsicologoRepository psicologoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public PsicologoController(PsicologoRepository psicologoRepository) {
        this.psicologoRepository = psicologoRepository;
    }

    // Cadastrar
    @PostMapping("/cadastrar")
    public ResponseEntity<Psicologo> cadastrar(@RequestBody Psicologo psicologo) {
        // Criptografar a senha antes de salvar
        psicologo.setSenha(passwordEncoder.encode(psicologo.getSenha()));
        Psicologo novo = psicologoRepository.save(psicologo);
        return ResponseEntity.ok(novo);
    }

    // Listar todos
    @GetMapping
    public List<Psicologo> listarTodos() {
        return psicologoRepository.findAll();
    }

    // Buscar por email
    @GetMapping("/email/{email}")
    public ResponseEntity<Psicologo> buscarPorEmail(@PathVariable String email) {
        Optional<Psicologo> psicologo = psicologoRepository.findByEmail(email);
        return psicologo.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Buscar por nome
    @GetMapping("/nome/{nome}")
    public ResponseEntity<Psicologo> buscarPorNome(@PathVariable String nome) {
        Optional<Psicologo> psicologo = psicologoRepository.findByNome(nome);
        return psicologo.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Buscar por login (email ou username)
    @GetMapping("/login/{login}")
    public ResponseEntity<Psicologo> buscarPorLogin(@PathVariable String login) {
        if (login.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            return psicologoRepository.findByEmail(login)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } else {
            return psicologoRepository.findByLogin(login)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
    }

    // Atualizar
    @PutMapping("/{id}")
    public ResponseEntity<Psicologo> atualizar(@PathVariable String id, @RequestBody Psicologo camposAtualizados) {
        return psicologoRepository.findById(id)
                .map(p -> {
                    if (camposAtualizados.getNome() != null) p.setNome(camposAtualizados.getNome());
                    if (camposAtualizados.getSobrenome() != null) p.setSobrenome(camposAtualizados.getSobrenome());
                    if (camposAtualizados.getLogin() != null) p.setLogin(camposAtualizados.getLogin());
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
                    if (camposAtualizados.getCrp() != null) p.setCrp(camposAtualizados.getCrp());
                    if (camposAtualizados.getEspecialidade() != null) p.setEspecialidade(camposAtualizados.getEspecialidade());

                    Psicologo atualizado = psicologoRepository.save(p);
                    return ResponseEntity.ok(atualizado);
                }).orElse(ResponseEntity.notFound().build());
    }
    
    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Psicologo> buscarPorId(@PathVariable String id) {
        return psicologoRepository.findById(id)
                .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Deletar por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) {
        if (psicologoRepository.existsById(id)) {
            psicologoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Psicologo> login(@RequestBody Map<String, String> dados) {
        String login = dados.get("login");
        String senha = dados.get("senha");

        Optional<Psicologo> psicologoOpt;

        if (login.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            psicologoOpt = psicologoRepository.findByEmail(login);
        } else {
            psicologoOpt = psicologoRepository.findByLogin(login);
        }

        if (psicologoOpt.isEmpty()) {
            return ResponseEntity.status(400).build();
        }

        Psicologo psicologo = psicologoOpt.get();

        if (!passwordEncoder.matches(senha, psicologo.getSenha())) {
            return ResponseEntity.status(400).build();
        }

        return ResponseEntity.ok(psicologo);
    }

    // ENDPOINT DE UPLOAD DE IMAGEM
    @PostMapping("/{id}/imagem")
    public ResponseEntity<?> uploadImagem(
            @PathVariable String id, 
            @RequestParam("imagem") MultipartFile file) {
        
        System.out.println("Recebido upload para psicólogo ID: " + id);
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

            // Buscar psicólogo
            Optional<Psicologo> psicologoOpt = psicologoRepository.findById(id);
            if (psicologoOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Psicologo psicologo = psicologoOpt.get();

            // Criar diretório se não existir
            Path uploadPath = Paths.get("uploads/users-pictures").toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            // Deletar imagem antiga se existir
            if (psicologo.getImgPerfil() != null && !psicologo.getImgPerfil().isEmpty()) {
                try {
                    Path oldImagePath = uploadPath.resolve(psicologo.getImgPerfil());
                    Files.deleteIfExists(oldImagePath);
                } catch (Exception e) {
                    // Ignorar erro ao deletar imagem antiga
                }
            }

            // Gerar nome único para o arquivo
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".") 
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : ".png";
            
            String filename = "perfil-psi-" + psicologo.getLogin() + "-" + UUID.randomUUID().toString().substring(0, 8) + extension;

            // Salvar arquivo
            Path targetLocation = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Atualizar banco de dados
            psicologo.setImgPerfil(filename);
            psicologoRepository.save(psicologo);

            return ResponseEntity.ok(Map.of(
                "mensagem", "Imagem enviada com sucesso",
                "imgPerfil", filename
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao fazer upload da imagem: " + e.getMessage());
        }
    }
}