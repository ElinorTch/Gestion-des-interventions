package com.intervention.app.intervention.repositories;

import com.intervention.app.intervention.entities.MailTemp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailTempRepository extends JpaRepository<MailTemp, Long> {
}
