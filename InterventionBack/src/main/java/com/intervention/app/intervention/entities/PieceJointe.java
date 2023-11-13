package com.intervention.app.intervention.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "pieceJointe")
//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "jsonIdentifier")
public class PieceJointe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPieceJointe")
    private Long idPieceJointe;

    private String fileName;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "idDemande")
    private Intervention intervention;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "idMailTemp")
    private MailTemp mailTemp;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "idMail")
    private Mail mail;
}
