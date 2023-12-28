package com.intervention.app.intervention.controllers;

import com.intervention.app.intervention.entities.*;
import com.intervention.app.intervention.services.*;
import com.sun.tools.jconsole.JConsoleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.tree.ExpandVetoException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.net.URLDecoder;
import java.util.Objects;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

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

    @Autowired
    AttachmentService attachmentService;

    /**
     * GetMapping
     */
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

    /**
     * PostMapping
     */
    @PostMapping(value = "/save/{idSousCategorie}/{matricule}")
    public ResponseEntity<String> saveIntervention(
            @PathVariable("idSousCategorie") Long idSousCategorie,
            @PathVariable("matricule") String matricule,
            @RequestParam(name = "file", required = false) List<MultipartFile> multipartFileList,
            @RequestParam("libelleIntervention") String libelleIntervention
    ) {
        try {
            interventionService.save(idSousCategorie, matricule, multipartFileList, libelleIntervention);
            return new ResponseEntity<>("Good", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Bas", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * PutMapping
     */
    @PutMapping("/update/{status}/{idDemande}/{codePersonnel}")
    public void updateInterventionStatus(
            @PathVariable("idDemande") Long idDemande,
            @PathVariable("status") String status,
            @PathVariable("codePersonnel") Long codePersonnel
    ) {
        interventionService.update(idDemande, status, codePersonnel);
    }

    @PutMapping("/update/{idDemande}")
    public void termineeIntervention(
            @PathVariable("idDemande") Long idDemande,
            @RequestParam("libelleMail") String libelleMail,
            @RequestParam(name = "file", required = false) List<MultipartFile> multipartFileList
    ) throws IOException {
        interventionService.termineIntervention(idDemande, libelleMail, multipartFileList);
    }
}
