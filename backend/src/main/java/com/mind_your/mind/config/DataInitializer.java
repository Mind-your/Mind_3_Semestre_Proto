package com.mind_your.mind.config;

import com.mind_your.mind.models.Paciente;
import com.mind_your.mind.repository.PacienteRepository;
import com.mind_your.mind.models.Psicologo;
import com.mind_your.mind.repository.PsicologoRepository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initPsicologos(PsicologoRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                List<Psicologo> psicologos = List.of(
                    createPsicologo("ana", "1234", "ana@gmail.com", "Ana", "Silva", "Feminino", "1985-05-20", "(11) 98765-4321", "São Paulo", "perfil-ana.png", "123456"),
                    createPsicologo("bruno", "5678", "bruno@gmail.com", "Bruno", "Ferreira", "Masculino", "1990-11-10", "(21) 91234-5678", "Rio de Janeiro", "perfil-bruno.png", "654321")
                );
                repository.saveAll(psicologos);
                System.out.println("Psicólogos de teste criados!");
            }
        };
    }

    @Bean
    CommandLineRunner init(PacienteRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                List<Paciente> usuarios = List.of(
                    createPaciente("gabriel", "2000", "gabriel@gmail.com", "Gabriel", "", "Masculino", "2000-09-13", "(12) 2959-7375", "São Paulo", "perfil-snoopy.png"),
                    createPaciente("snoopy", "1950", "snoopy@gmail.com", "Snoopy", "", "Masculino", "1969-09-13", "(79) 2337-2615", "São Paulo", "perfil-snoopy.png"),
                    createPaciente("scooby", "1950", "scooby@gmail.com", "Scoobert", "Cornelius Doo", "Masculino", "1950-10-04", "(61) 3070-0787", "São Paulo", "perfil-scooby.png")
                );

                repository.saveAll(usuarios);
                System.out.println("Usuários de teste criados!");
            }
        };
    }
    
    private Paciente createPaciente(String login, String senha, String email, String nome, String sobrenome,
                                    String genero, String dtNascimento, String telefone, String local, String imgPerfil) {
        Paciente p = new Paciente();
        p.setLogin(login);
        p.setSenha(passwordEncoder.encode(senha)); // CRIPTOGRAFA A SENHA
        p.setEmail(email);
        p.setNome(nome);
        p.setSobrenome(sobrenome);
        p.setGenero(genero);
        p.setDtNascimento(LocalDate.parse(dtNascimento));
        p.setTelefone(telefone);
        p.setEndereco(local);
        p.setImgPerfil(imgPerfil);
        return p;
    }

    private Psicologo createPsicologo(String login, String senha, String email, String nome, String sobrenome,
                                    String genero, String dtNascimento, String telefone, String local, String imgPerfil, String crp) {
        Psicologo p = new Psicologo();
        p.setLogin(login);
        p.setSenha(passwordEncoder.encode(senha)); // CRIPTOGRAFA A SENHA
        p.setEmail(email);
        p.setNome(nome);
        p.setSobrenome(sobrenome);
        p.setGenero(genero);
        p.setDtNascimento(LocalDate.parse(dtNascimento));
        p.setTelefone(telefone);
        p.setEndereco(local);
        p.setImgPerfil(imgPerfil);
        p.setCrp(crp);
        return p;
    }
}