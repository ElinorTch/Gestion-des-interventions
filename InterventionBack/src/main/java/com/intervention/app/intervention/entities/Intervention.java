package com.intervention.app.intervention.entities;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table
//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "jsonIdentifier")
public class Intervention implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDemande;

    private Date dateDemande = new Date();

    private String libelleIntervention;

    private String status;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jsonIdentifier;

    @ManyToOne
    @JoinColumn(name = "codeEtudiant")
    private Etudiant etudiant;

    @ManyToOne
    @JoinColumn(name = "codePersonnel")
    private Personnel personnel;

    @ManyToOne
    @JoinColumn(name = "idSousCategorie")
    private SousCategorie sousCategorie;

    @ToString.Exclude
    @OneToMany(mappedBy = "intervention")
    private List<PieceJointe> pieceJointe;

    @ToString.Exclude
    @OneToMany(mappedBy = "intervention")
    private List<Mail> mail;

    private String url;
}
