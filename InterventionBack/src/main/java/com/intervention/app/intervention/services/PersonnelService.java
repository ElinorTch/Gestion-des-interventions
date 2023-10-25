package com.intervention.app.intervention.services;

import com.intervention.app.intervention.entities.Personnel;
import com.intervention.app.intervention.repositories.PersonnelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonnelService {
    @Autowired
    PersonnelRepository personnelRepository;

    public Personnel getPersonnel(String login){
        return personnelRepository.findByLogin(login);
    }

    public Personnel getPersonnelById(Long code) {
        return personnelRepository.getReferenceById(code);
    }

    public List<Personnel> getAllPersonnel() {
        return personnelRepository.findAll();
    }

}
