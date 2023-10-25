package com.intervention.app.intervention.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "etudiant")
//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "jsonIdentifier")
public class Etudiant implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code")
    private Long codeEtudiant;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jsonIdentifier;

    @Column(name = "code_authentification")
    private String codeAuthentification;

    private String matricule;

    @JsonIgnore
    @ToString.Exclude
    @OneToMany(mappedBy = "etudiant")
    private List<Intervention> interventions;

    @ToString.Exclude
    @OneToOne(mappedBy = "etudiant")
    private Candidat candidat;

}
