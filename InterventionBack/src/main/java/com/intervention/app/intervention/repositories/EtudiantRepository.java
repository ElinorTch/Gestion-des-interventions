package com.intervention.app.intervention.repositories;

import com.intervention.app.intervention.entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    Etudiant findByMatricule(String matricule);
}
