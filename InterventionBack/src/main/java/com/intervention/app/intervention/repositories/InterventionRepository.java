package com.intervention.app.intervention.repositories;

import com.intervention.app.intervention.entities.Intervention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterventionRepository extends JpaRepository<Intervention, Long> {
    Intervention findByIdDemande(Long idDemande);
}
