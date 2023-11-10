package com.intervention.app.intervention.services;

import com.intervention.app.intervention.entities.Categorie;
import com.intervention.app.intervention.repositories.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorieService {

    @Autowired
    CategorieRepository categorieRepository;

    public List<Categorie> getAllCategorie() {
        return categorieRepository.findAll();
    }
}
