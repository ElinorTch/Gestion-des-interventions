package com.intervention.app.intervention.controllers;

import com.intervention.app.intervention.entities.Etudiant;
import com.intervention.app.intervention.entities.Personnel;
import com.intervention.app.intervention.services.EtudiantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("api/etudiant")
public class EtudiantController {
    @Autowired
    EtudiantService etudiantService;

    /** GetMapping */
    @GetMapping
    public ResponseEntity<List<Etudiant>> getAllEtudiant() {
        return new ResponseEntity<>(etudiantService.getAllEtudiant(), HttpStatus.OK);
    }
    //getEtudiant by matricule
    @GetMapping("/{matricule}")
    public ResponseEntity<Etudiant> getEtudiantByMatricule(@PathVariable("matricule") String matricule) {
        Etudiant etudiant = etudiantService.getEtudiantByMatricule(matricule);
        return new ResponseEntity<>(etudiant, HttpStatus.OK);
    }

    /** PostMapping */
    @PostMapping("/login")
    public ResponseEntity<Etudiant> loginEtudiant(@RequestBody Etudiant etudiantData){
        System.out.println("etudiantData : " + etudiantData);
        Etudiant studentBd = etudiantService.getEtudiantByMatricule(etudiantData.getMatricule());
        System.out.println("studentBd : " + studentBd);
        if (etudiantData.getCodeAuthentification().equals(studentBd.getCodeAuthentification()))
            return ResponseEntity.ok(studentBd);
        return (ResponseEntity<Etudiant>) ResponseEntity.internalServerError();
    }
}
