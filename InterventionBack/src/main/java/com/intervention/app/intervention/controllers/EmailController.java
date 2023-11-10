package com.intervention.app.intervention.controllers;

import com.intervention.app.intervention.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("api/email")
public class EmailController {

    @Autowired
    EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail() {
        return new ResponseEntity<>("email", HttpStatus.OK);
    }



}
