package com.intervention.app.intervention.services;

import com.intervention.app.intervention.entities.Intervention;
import com.intervention.app.intervention.entities.Mail;
import com.intervention.app.intervention.repositories.MailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.net.InetAddress;
import java.net.UnknownHostException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    MailRepository mailRepository;

    private String email = "tchamoelii@gmail.com";

//    Verifier la connexion a internet
    public boolean isConnectedToNetwork() {
        try {
            InetAddress address = InetAddress.getByName("www.google.com");
            return address.isReachable(5000); // 5000 ms timeout
        } catch (UnknownHostException e) {
            return false; // Unable to resolve host, so not connected
        } catch (Exception e) {
            return false; // Other exceptions, assume not connected
        }
    }

//    @Scheduled(fixedRate = 600000)
    public void sendEmail(String toEmail, String subject,
                          String body, Intervention intervention) {
        if (this.isConnectedToNetwork()) {
            try {
//                Envoie de l'email
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(this.email);
                message.setTo(toEmail);
                message.setText(body);
                message.setSubject(subject);

                mailSender.send(message);
                System.out.println("Mail sent successfully...");

//                Ajout de l'email en base de donnees avec le statut envoye
                Mail email = new Mail(null, null, this.email, toEmail, subject, body, 1, intervention);
                mailRepository.save(email);

            } catch(Exception e) {
//                Ajout de l'email en base de donnees avec le statut non envoye
                Mail email = new Mail(null, null, this.email, toEmail, subject, body, 0, intervention);
                mailRepository.save(email);
                System.out.println("Erreur : " +e);
            }
        } else {
//                Ajout de l'email en base de donnees avec le statut non envoye
            Mail email = new Mail(null, null, this.email, toEmail, subject, body, 0, intervention);
            mailRepository.save(email);
            System.out.println("Vous n'etes pas connectés a internet");
        }
    }
}
