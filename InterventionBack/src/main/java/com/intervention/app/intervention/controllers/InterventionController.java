package com.intervention.app.intervention.controllers;

import com.intervention.app.intervention.entities.*;
import com.intervention.app.intervention.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.tree.ExpandVetoException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/intervention")
public class InterventionController {

    @Autowired
    EmailService emailService;

    @Autowired
    InterventionService interventionService;

    @Autowired
    PersonnelService personnelService;

    @Autowired
    EtudiantService etudiantService;

    @Autowired
    DepartementService departementService;

    @Autowired
    SousCategorieService sousCategorieService;

    @Autowired
    CandidatService candidatService;

    /** GetMapping */
    @GetMapping
    public ResponseEntity<List<Intervention>> getAllIntervention() {
        List<Intervention> interventions = interventionService.getAllIntervention();
        return new ResponseEntity<>(interventions, HttpStatus.OK);
    }

    @GetMapping("/etudiant/{matricule}")
    public ResponseEntity<List<Intervention>> getInterventionByStudent(@PathVariable("matricule") String matricule) {
        List<Intervention> interventions = interventionService.getInterventionByStudent(matricule);
        return new ResponseEntity<>(interventions, HttpStatus.OK);
    }

    @GetMapping("/departement/{code}")
    public ResponseEntity<List<Intervention>> getInterventionByDepartment(@PathVariable("code") Long code) {
        List<Intervention> interventions = interventionService.getInterventionByDepartment(code);
        return new ResponseEntity<>(interventions, HttpStatus.OK);
    }


    @GetMapping("/personnel/{code}")
    public ResponseEntity<List<Intervention>> getInterventionByPersonnel(@PathVariable("code") Long code) {
        List<Intervention> interventions = interventionService.getInterventionByPersonnel(code);
        return new ResponseEntity<>(interventions, HttpStatus.OK);
    }

    /** PostMapping */
    @PostMapping("/save/{idSousCategorie}/{matricule}")
    public ResponseEntity<String> saveIntervention(@RequestBody Intervention intervention, @PathVariable("idSousCategorie") Long idSousCategorie, @PathVariable("matricule") String matricule) {
        try {
            System.out.println("Request body: " + intervention);
            Etudiant etudiant = etudiantService.getEtudiantByMatricule(matricule);
            SousCategorie sousCategorie = sousCategorieService.getSousCategorieById(idSousCategorie);
            intervention.setEtudiant(etudiant);
            intervention.setSousCategorie(sousCategorie);
            intervention.setStatus("ATTENTE");
            System.out.println("Intervention modifie: " + intervention);
            interventionService.save(intervention);
            return new ResponseEntity<>("Good", HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>("Bad", HttpStatus.BAD_REQUEST);
        }
    }

    /** PutMapping */
    @PutMapping("/update/{status}/{idDemande}/{codePersonnel}")
    public void updateInterventionStatus(@PathVariable("idDemande") Long idDemande,
                                         @PathVariable("status") String status,
                                         @PathVariable("codePersonnel") Long codePersonnel)
    {
        try {
            Intervention intervention = interventionService.getInterventionById(idDemande);
            System.out.println("First : " + intervention);
            intervention.setStatus(status);
            Personnel personnel = personnelService.getPersonnelById(codePersonnel);
            intervention.setPersonnel(personnel);
            System.out.println("Modified : " + intervention);
            interventionService.save(intervention);

            try {
                emailService.sendEmail(
                        intervention.getEtudiant().getCandidat().getEmail(),
                        "Gestion des interventions IUSJ",
                        "Votre demande d'intervention: "+ intervention.getLibelleIntervention() +" a été pris en charge par "
                                + personnel.getNom() +".\n" +
                                "Statut de l'intervention: "+ status,
                        intervention
                );
            } catch (Exception e) {
                System.out.println("Erreur dans l'envoie de l'email");
            }

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
