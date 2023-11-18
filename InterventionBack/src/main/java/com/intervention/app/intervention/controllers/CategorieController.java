package com.intervention.app.intervention.controllers;

import com.intervention.app.intervention.dto.CredentialsDto;
import com.intervention.app.intervention.dto.EtudiantDto;
import com.intervention.app.intervention.entities.Categorie;
import com.intervention.app.intervention.entities.Intervention;
import com.intervention.app.intervention.services.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/categorie")
public class CategorieController {

    @Autowired
    CategorieService categorieService;

    @GetMapping()
    public ResponseEntity<List<Categorie>> getAllCategorie() {
        List<Categorie> categories = categorieService.getAllCategorie();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
