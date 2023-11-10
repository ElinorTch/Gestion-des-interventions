package com.intervention.app.intervention.controllers;

import com.intervention.app.intervention.dto.CredentialsDto;
import com.intervention.app.intervention.dto.EtudiantDto;
import com.intervention.app.intervention.entities.Categorie;
import com.intervention.app.intervention.services.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/categorie")
public class CategorieController {

    @Autowired
    CategorieService categorieService;

    @GetMapping("")
    public List<Categorie> loginEtudiant(@RequestBody CredentialsDto credentialsDto) {
        return categorieService.getAllCategorie();
    }
}
