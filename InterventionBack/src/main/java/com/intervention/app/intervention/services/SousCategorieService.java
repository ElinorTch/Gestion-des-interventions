package com.intervention.app.intervention.services;

import com.intervention.app.intervention.entities.SousCategorie;
import com.intervention.app.intervention.repositories.SousCategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class SousCategorieService {
    @Autowired
    SousCategorieRepository sousCategorieRepository;

    public SousCategorie getSousCategorieById(Long id) {
        return sousCategorieRepository.getReferenceById(id);
    }

    public List<SousCategorie> getAllSousCategorie() {
        return sousCategorieRepository.findAll();
    }

    public List<SousCategorie> getAllSousCategorieByIdCategorie(Long idCategorie) {
        List<SousCategorie> sousCategories = this.getAllSousCategorie();
        return sousCategories.stream()
                .filter(sousCategorie -> Objects.equals(sousCategorie.getCategorie().getIdCategorie(), idCategorie))
                .toList();
    }
}
