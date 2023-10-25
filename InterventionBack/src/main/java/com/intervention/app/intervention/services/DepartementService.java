package com.intervention.app.intervention.services;

import com.intervention.app.intervention.entities.Departement;
import com.intervention.app.intervention.repositories.DepartementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartementService {

    @Autowired
    DepartementRepository departementRepository;

    public Departement getDepartementById(Long codeDepartment) {
        return departementRepository.getReferenceById(codeDepartment);
    }

    public List<Departement> getAllDepartment() {
        return departementRepository.findAll();
    }
}
