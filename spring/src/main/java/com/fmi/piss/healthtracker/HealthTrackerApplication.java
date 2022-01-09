package com.fmi.piss.healthtracker;

import com.fmi.piss.healthtracker.services.ExerciseService;
import com.fmi.piss.healthtracker.services.FoodService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HealthTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthTrackerApplication.class, args);
		new FoodService().getDetails("2 large eggs");
	}

}
