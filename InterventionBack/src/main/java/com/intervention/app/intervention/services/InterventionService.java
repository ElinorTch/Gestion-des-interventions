package com.intervention.app.intervention.services;

import com.intervention.app.intervention.entities.Intervention;
import com.intervention.app.intervention.repositories.InterventionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class InterventionService {

    @Autowired
    InterventionRepository interventionRepository;

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

    public void save(Intervention intervention) {
        interventionRepository.save(intervention);
    }

    public Intervention getInterventionById(Long idDemande) {
        return interventionRepository.findByIdDemande(idDemande);
    }
}
