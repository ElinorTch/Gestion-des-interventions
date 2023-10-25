package com.intervention.app.intervention.services;

import com.intervention.app.intervention.entities.Etudiant;
import com.intervention.app.intervention.repositories.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
public class EtudiantService {
    @Autowired
    EtudiantRepository etudiantRepository;

    public Etudiant getEtudiantByMatricule(String matricule){
        return etudiantRepository.findByMatricule(matricule);
    }

    public List<Etudiant> getAllEtudiant() {
        return etudiantRepository.findAll();
    }
}
