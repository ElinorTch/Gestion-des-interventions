package com.intervention.app.intervention.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "categorie")
//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "jsonIdentifier")
public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCategorie")
    private Long idCategorie;

    private String libelle;

    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "categorie")
    private List<SousCategorie> sousCategories;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "codeDepartement")
    private Departement departement;

}
