package com.intervention.app.intervention.repositories;

import com.intervention.app.intervention.entities.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PersonnelRepository extends JpaRepository<Personnel, Long> {
    Personnel findByLogin(String login);

}
