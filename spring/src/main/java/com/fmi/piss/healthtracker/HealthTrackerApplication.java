package com.fmi.piss.healthtracker;

import com.fmi.piss.healthtracker.services.ExerciseService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HealthTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthTrackerApplication.class, args);
		new ExerciseService().lookup("100 pushups");
	}

}
