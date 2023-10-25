package com.intervention.app.intervention.controllers;

import com.intervention.app.intervention.entities.Departement;
import com.intervention.app.intervention.services.DepartementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/department")
public class DepartementController {
    @Autowired
    DepartementService departementService;

    /** GetMapping */
    @GetMapping
    public ResponseEntity<List<Departement>> getAllDepartment() {
        return new ResponseEntity<>(departementService.getAllDepartment(), HttpStatus.OK);
    }
}
