package com.intervention.app.intervention.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.servlet.function.ServerRequest;

import java.io.Serializable;
import java.util.List;import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "utilisateur")
//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "jsonIdentifier")
public class Personnel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code")
    private Long codePersonnel;

    private String email;

    private String login;
    private String mot_de_passe;

    private String nom;
    private String prenom;
    private String sexe;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jsonIdentifier;

    @JsonIgnore
    @ToString.Exclude
    @OneToMany(mappedBy = "personnel")
    private List<Intervention> interventions;

    @ToString.Exclude
    @ManyToMany
    @JoinTable(name = "utilisateur_role",
        joinColumns = @JoinColumn(name = "code_utilisateur", referencedColumnName = "code"),
        inverseJoinColumns = @JoinColumn(name = "code_role", referencedColumnName = "code"))
    private List<Departement> departements;
}
