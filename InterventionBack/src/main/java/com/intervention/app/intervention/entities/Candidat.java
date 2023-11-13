package com.intervention.app.intervention.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "etudiant")
@Table(name = "candidat")
public class Candidat {
    @Id
    @Column(name = "code")
    private Long code;

    private String nom;
    private String prenom;

    private String email;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "code", referencedColumnName = "codeEtudiant")
    private Etudiant etudiant;
}
