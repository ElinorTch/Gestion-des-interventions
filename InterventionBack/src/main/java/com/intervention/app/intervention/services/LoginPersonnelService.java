package com.intervention.app.intervention.services;

import com.intervention.app.intervention.dto.CredentialsDto;
import com.intervention.app.intervention.dto.PersonnelDto;
import com.intervention.app.intervention.entities.Personnel;
import com.intervention.app.intervention.exceptions.AppException;
import com.intervention.app.intervention.mappers.PersonnelMapper;
import com.intervention.app.intervention.repositories.PersonnelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;

@Service
@RequiredArgsConstructor
public class LoginPersonnelService {

    @Autowired
    PersonnelRepository personnelRepository;

    private final PasswordEncoder passwordEncoder;

    private final PersonnelMapper personnelMapper;

    public PersonnelDto login(CredentialsDto credentialsDto) {
        Personnel personnel = personnelRepository.findByLogin(credentialsDto.login());

        if (personnel == null) {
            throw new AppException("Utilisateur Inconnu", HttpStatus.NOT_FOUND);

        } else {
            char[] password = credentialsDto.password();
            if (password == null) {
                throw new AppException("Password is missing", HttpStatus.BAD_REQUEST);
            } else {
                if (passwordEncoder.matches(CharBuffer.wrap(password),
                        personnel.getMot_de_passe())) {
                    return personnelMapper.topersonnelDto(personnel);
                }
                throw new AppException("Mot de passe Invalide", HttpStatus.BAD_REQUEST);
                // return personnelMapper.topersonnelDto(personnel);
            }
        }
    }
}
