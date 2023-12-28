package com.intervention.app.intervention.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.w3c.dom.Text;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "mail")
//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "jsonIdentifier")
public class Mail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idMail")
    private Long idMail;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jsonIdentifier;

    private String destinateur;
    private String destinataire;
    private String subject;

    @Column(length=512)
    private String body;

    private int isSended;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "idDemande")
    private Intervention intervention;

    @ToString.Exclude
    @OneToMany(mappedBy = "mail")
    private List<PieceJointe> pieceJointe;
}
