package com.intervention.app.intervention.services;

import com.intervention.app.intervention.dto.CredentialsDto;
import com.intervention.app.intervention.dto.EtudiantDto;
import com.intervention.app.intervention.entities.Etudiant;
import com.intervention.app.intervention.exceptions.AppException;
import com.intervention.app.intervention.mappers.EtudiantMapper;
import com.intervention.app.intervention.repositories.EtudiantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;

@Service
@RequiredArgsConstructor
public class LoginEtudiantService {

    @Autowired
    EtudiantRepository etudiantRepository;

    private final PasswordEncoder passwordEncoder;

    private final EtudiantMapper etudiantMapper;

    public EtudiantDto login(CredentialsDto credentialsDto) {
        Etudiant etudiant = etudiantRepository.findByMatricule(credentialsDto.login());

        if(etudiant == null) {
            throw new AppException("Utilisateur Inconnu", HttpStatus.NOT_FOUND);

        } else {
            char[] password = credentialsDto.password();
            if (password == null) {
                throw new AppException("Password is missing", HttpStatus.BAD_REQUEST);
            }else {
                if(passwordEncoder.matches(CharBuffer.wrap(password),
                        etudiant.getCodeAuthentification())) {
                    return etudiantMapper.toetudiantDto(etudiant);
                }
                throw new AppException("Mot de passe Invalide", HttpStatus.BAD_REQUEST);
                // return etudiantMapper.toetudiantDto(etudiant);
            }
        }
    }

}
