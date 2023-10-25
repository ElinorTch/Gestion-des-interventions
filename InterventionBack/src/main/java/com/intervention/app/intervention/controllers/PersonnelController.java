package com.intervention.app.intervention.controllers;

import com.intervention.app.intervention.entities.Personnel;
import com.intervention.app.intervention.services.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/personnel")
public class PersonnelController {

    @Autowired
    private PersonnelService personnelService;

    @GetMapping
    public ResponseEntity<List<Personnel>> getAllPersonnel() {
        List<Personnel> utilisateurs = personnelService.getAllPersonnel();
        return new ResponseEntity<>(utilisateurs, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Personnel> loginUser(@RequestBody Personnel userData) {
        Personnel userDb = personnelService.getPersonnel(userData.getLogin());
        System.out.println("userData: " + userData);
        System.out.println("userDB: " + userDb);
        if (userData.getMot_de_passe().equals(userDb.getMot_de_passe()))
            return ResponseEntity.ok(userDb);
        return (ResponseEntity<Personnel>) ResponseEntity.internalServerError();
    }
}
