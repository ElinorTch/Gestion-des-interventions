package com.intervention.app.intervention.controllers;

import com.intervention.app.intervention.entities.SousCategorie;
import com.intervention.app.intervention.services.SousCategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/sousCategorie")
public class SousCategorieController {

    @Autowired
    SousCategorieService sousCategorieService;

    @GetMapping
    public ResponseEntity<List<SousCategorie>> getAllSousCategorie() {
        return new ResponseEntity<>(sousCategorieService.getAllSousCategorie(), HttpStatus.OK);
    }
}
