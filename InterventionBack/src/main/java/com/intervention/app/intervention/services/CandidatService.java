package com.intervention.app.intervention.services;

import com.intervention.app.intervention.entities.Candidat;
import com.intervention.app.intervention.repositories.CandidatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CandidatService {

    @Autowired
    CandidatRepository candidatRepository;

    public Candidat getCandidatByCode(Long code) {
        return candidatRepository.getReferenceById(code);
    }
}
