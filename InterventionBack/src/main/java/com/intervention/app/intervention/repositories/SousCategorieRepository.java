package com.intervention.app.intervention.repositories;

import com.intervention.app.intervention.entities.SousCategorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SousCategorieRepository extends JpaRepository<SousCategorie, Long> {
}
