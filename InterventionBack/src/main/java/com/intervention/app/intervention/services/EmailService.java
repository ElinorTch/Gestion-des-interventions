package com.intervention.app.intervention.services;

import com.intervention.app.intervention.entities.Intervention;
import com.intervention.app.intervention.entities.Mail;
import com.intervention.app.intervention.entities.MailTemp;
import com.intervention.app.intervention.entities.PieceJointe;
import com.intervention.app.intervention.repositories.AttachmentRepository;
import com.intervention.app.intervention.repositories.EmailTempRepository;
import com.intervention.app.intervention.repositories.MailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    MailRepository mailRepository;

    @Autowired
    EmailTempRepository emailTempRepository;

    @Autowired
    AttachmentRepository attachmentRepository;

    public static String DIRECTORY = System.getProperty("user.home") + "/Downloads/uploads/";
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

    public void sendEmail(String toEmail, String subject,
                          String body, Intervention intervention) {
//        if (this.isConnectedToNetwork()) {
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
            Mail email = new Mail(null, null, this.email, toEmail, subject, body, 1, intervention, null);
            mailRepository.save(email);

        } catch (Exception e) {
//                Ajout de l'email en base de donnees avec le statut non envoye
            MailTemp email = new MailTemp(null, this.email, toEmail, subject, body, 0, intervention, null);
            emailTempRepository.save(email);
            System.out.println("Erreur : " + e);
        }
//        }
    }


    public void sendMailWithAttachment(
            String toEmail, String subject,
            String body, Intervention intervention,
            List<MultipartFile> multipartFileList,
            List<PieceJointe> allPieceJointe
    ) throws IOException, MessagingException {
        List<PieceJointe> pieceJointes = new ArrayList<>();

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(this.email);
            mimeMessageHelper.setTo(toEmail);
            mimeMessageHelper.setText(body);
            mimeMessageHelper.setSubject(subject);

            if (multipartFileList != null) {
                for (MultipartFile file : multipartFileList) {
                    String filename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
                    Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
                    copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
                    mimeMessageHelper.addAttachment(Objects.requireNonNull(filename), file);
                    PieceJointe pieceJointe = new PieceJointe(null, filename, intervention, null, null);
                    pieceJointes.add(pieceJointe);
                }

                mailSender.send(mimeMessage);
                Mail email = new Mail(null, null, this.email, toEmail, subject, body, 1, intervention, pieceJointes);
                mailRepository.save(email);

                for (PieceJointe pieceJointe : pieceJointes) {
                    pieceJointe.setMail(email);
                    attachmentRepository.save(pieceJointe);
                }

            } else if (allPieceJointe != null) {
                for (PieceJointe pieceJointe: allPieceJointe) {
                    FileSystemResource fileSystemResource = new FileSystemResource(new File(DIRECTORY + pieceJointe.getFileName()));
                    mimeMessageHelper.addAttachment(Objects.requireNonNull(fileSystemResource.getFilename()), fileSystemResource);
                }

                mailSender.send(mimeMessage);
                Mail email = new Mail(null, null, this.email, toEmail, subject, body, 1, intervention, allPieceJointe);
                mailRepository.save(email);

                for (PieceJointe pieceJointe: allPieceJointe) {
                    pieceJointe.setMail(email);
                    pieceJointe.setMailTemp(null);
                    attachmentRepository.save(pieceJointe);
                }
            }

            System.out.println("Mail send to " + toEmail);
        } catch (Exception e) {
//                Ajout de l'email en base de donnees avec le statut non envoye
            MailTemp email = new MailTemp(null, this.email, toEmail, subject, body, 0, intervention, pieceJointes);
            emailTempRepository.save(email);

            for (PieceJointe pieceJointe : pieceJointes) {
                pieceJointe.setMailTemp(email);
                attachmentRepository.save(pieceJointe);
            }
            System.out.println("Erreur : " + e);
        }
//        }
    }

    @Scheduled(fixedDelay = 60000)
    public void sendTemponMail() throws MessagingException, IOException {
        List<MailTemp> mailTemps = emailTempRepository.findAll();
        if (isConnectedToNetwork()) {
            for (MailTemp mailTemp: mailTemps) {
                this.sendMailWithAttachment(mailTemp.getDestinataire(),
                        mailTemp.getSubject(),
                        mailTemp.getBody(),
                        mailTemp.getIntervention(),
                        null,
                        mailTemp.getPieceJointe());
                emailTempRepository.delete(mailTemp);
            }
        } else {
            System.out.println("Pas connecte");
        }
    }
}