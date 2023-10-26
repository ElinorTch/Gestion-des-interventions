package com.intervention.app.intervention.controllers;

import com.intervention.app.intervention.configuration.UserAuthProvider;
import com.intervention.app.intervention.dto.CredentialsDto;
import com.intervention.app.intervention.dto.EtudiantDto;
import com.intervention.app.intervention.dto.PersonnelDto;
import com.intervention.app.intervention.services.LoginEtudiantService;
import com.intervention.app.intervention.services.LoginPersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("login")
public class AuthController {

    @Autowired
    LoginEtudiantService loginEtudiantService;

    @Autowired
    LoginPersonnelService loginPersonnelService;

    @Autowired
    UserAuthProvider userAuthProvider;

    @PostMapping("/Etudiant")
    public ResponseEntity<EtudiantDto> loginEtudiant(@RequestBody CredentialsDto credentialsDto) {
        EtudiantDto user = loginEtudiantService.login(credentialsDto);
        user.setToken(userAuthProvider.CreateTokenEtudiant(user));
        System.out.println(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/Personnel")
    public ResponseEntity<PersonnelDto> loginPersonnel(@RequestBody CredentialsDto credentialsDto) {
        PersonnelDto user = loginPersonnelService.login(credentialsDto);
        user.setToken(userAuthProvider.CreateTokenPersonel(user));
        System.out.println(user);
        return ResponseEntity.ok(user);
    }

}
