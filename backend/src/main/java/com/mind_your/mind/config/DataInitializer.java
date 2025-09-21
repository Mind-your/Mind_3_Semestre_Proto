package com.mind_your.mind.config;

import com.mind_your.mind.models.Paciente;
import com.mind_your.mind.repository.PacienteRepository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner init(PacienteRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                // Lista de usuários de exemplo - SNOOPY SUPREMACY
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
        p.setSenha(senha);
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
}