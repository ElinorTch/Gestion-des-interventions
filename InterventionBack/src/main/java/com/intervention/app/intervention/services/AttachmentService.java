package com.intervention.app.intervention.services;

import com.intervention.app.intervention.entities.Intervention;
import com.intervention.app.intervention.entities.PieceJointe;
import com.intervention.app.intervention.repositories.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttachmentService {
    @Autowired
    AttachmentRepository attachmentRepository;

    public void save(PieceJointe pieceJointe) {
        attachmentRepository.save(pieceJointe);
    }
}
