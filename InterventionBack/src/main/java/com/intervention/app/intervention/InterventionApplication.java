package com.intervention.app.intervention;

import com.intervention.app.intervention.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class InterventionApplication {

	public static void main(String[] args) {
		SpringApplication.run(InterventionApplication.class, args);
	}
}
