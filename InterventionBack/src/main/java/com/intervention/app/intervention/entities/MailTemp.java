package com.intervention.app.intervention.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "mail_tempon")
public class MailTemp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idMail")
    private Long idMailTemp;

    private String destinateur;
    private String destinataire;
    private String subject;
    private String body;
    private int isSended;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "idDemande")
    private Intervention intervention;

    @ToString.Exclude
    @OneToMany(mappedBy = "mailTemp", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<PieceJointe> pieceJointe;
}
