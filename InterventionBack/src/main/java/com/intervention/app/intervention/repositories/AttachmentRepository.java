package com.intervention.app.intervention.repositories;

import com.intervention.app.intervention.entities.PieceJointe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttachmentRepository extends JpaRepository<PieceJointe, Long> {
}
