package com.intervention.app.intervention.services;

import com.intervention.app.intervention.entities.*;
import com.intervention.app.intervention.repositories.InterventionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
public class InterventionService {

    @Autowired
    InterventionRepository interventionRepository;

    @Autowired
    EtudiantService etudiantService;

    @Autowired
    SousCategorieService sousCategorieService;

    @Autowired
    AttachmentService attachmentService;

    @Autowired
    PersonnelService personnelService;

    @Autowired
    EmailService emailService;


    public static String DIRECTORY = System.getProperty("user.home") + "/Downloads/uploads/";


    public List<Intervention> getAllIntervention() {
        return interventionRepository.findAll();
    }

    public List<Intervention> getInterventionByStudent(String matricule) {
        List<Intervention> allIntervention = this.getAllIntervention();
        return allIntervention.stream()
                .filter(intervention -> Objects.equals(intervention.getEtudiant().getMatricule(), matricule))
                .toList();
    }

    public List<Intervention> getInterventionByDepartment(Long code) {
        List<Intervention> allIntervention = this.getAllIntervention();
        return allIntervention.stream()
                .filter(intervention -> Objects.equals(intervention.getSousCategorie().getCategorie()
                        .getDepartement().getCodeDepartement(), code))
                .toList();
    }

    public List<Intervention> getInterventionByPersonnel(Long code) {
        List<Intervention> allIntervention = this.getAllIntervention();
        List<Intervention> allInterventionPersonnel = new ArrayList<>();
        for (Intervention intervention : allIntervention) {
            if (intervention.getPersonnel() != null) {
                if (Objects.equals(intervention.getPersonnel().getCodePersonnel(), code)) {
                    allInterventionPersonnel.add(intervention);
                }
            }
        }
        return allInterventionPersonnel;
    }

    public void save(long idSousCategorie, String matricule, List<MultipartFile> multipartFileList, String libelleIntervention) throws IOException {
        Intervention intervention = new Intervention();
        List<PieceJointe> pieceJointes = new ArrayList<>();

        for (MultipartFile file : multipartFileList) {
            String filename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
            copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
            PieceJointe pieceJointe = new PieceJointe(null, filename, intervention, null, null);
            pieceJointes.add(pieceJointe);
        }

        try {
            Etudiant etudiant = etudiantService.getEtudiantByMatricule(matricule);

            SousCategorie sousCategorie = sousCategorieService.getSousCategorieById(idSousCategorie);

            intervention.setLibelleIntervention(libelleIntervention);
            intervention.setEtudiant(etudiant);
            intervention.setSousCategorie(sousCategorie);
            intervention.setStatus("ATTENTE");

            System.out.println("Intervention modifie: " + intervention);
            interventionRepository.save(intervention);
            for (PieceJointe pieceJointe : pieceJointes) {
                attachmentService.save(pieceJointe);
            }
            interventionRepository.save(intervention);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void update(Long idDemande, String status, Long codePersonnel) {
        try {
            Intervention intervention = this.getInterventionById(idDemande);
            System.out.println("First : " + intervention);
            intervention.setStatus(status);
            Personnel personnel = personnelService.getPersonnelById(codePersonnel);
            intervention.setPersonnel(personnel);
            System.out.println("Modified : " + intervention);
            interventionRepository.save(intervention);

            try {
                emailService.sendEmail(
                        intervention.getEtudiant().getCandidat().getEmail(),
                        "Gestion des interventions IUSJ",
                        "Votre demande d'intervention: " + intervention.getLibelleIntervention() + " a été pris en charge par "
                                + personnel.getNom() + ".\n" +
                                "Statut de l'intervention: " + status,
                        intervention
                );
            } catch (Exception e) {
                System.out.println("Erreur dans l'envoie de l'email");
            }

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void termineIntervention(Long idDemande, String text, List<MultipartFile> multipartFileList) throws IOException {
        try {
            Intervention intervention = this.getInterventionById(idDemande);
            System.out.println("First : " + intervention);
            intervention.setStatus("TRAITEE");

            System.out.println("Modified : " + intervention);
            interventionRepository.save(intervention);

            try {
                emailService.sendMailWithAttachment(
                        intervention.getEtudiant().getCandidat().getEmail(),
                        "Gestion des interventions IUSJ",
                        text +
                                "Statut de l'intervention: TRAITEE",
                        intervention,
                        multipartFileList,
                        null
                );
            } catch (Exception e) {
                System.out.println("Erreur dans l'envoie de l'email");
                System.out.println(e);
            }

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public Intervention getInterventionById(Long idDemande) {
        return interventionRepository.findByIdDemande(idDemande);
    }
}
