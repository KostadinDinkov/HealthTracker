package com.fmi.piss.healthtracker.controllers;


import com.fmi.piss.healthtracker.models.Exercise;
import com.fmi.piss.healthtracker.models.User;
import com.fmi.piss.healthtracker.repos.UserRepository;
import com.fmi.piss.healthtracker.services.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/exercise")
@RestController
public class ExerciseController {

    @Autowired
    private UserRepository userRepository;
    private ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService,UserRepository userRepository){
        this.exerciseService = exerciseService;
        this.userRepository = userRepository;
    }

    @CrossOrigin
    @PostMapping
    public Exercise getExercise(@RequestBody String exerciseName){
        return exerciseService.lookup(exerciseName);
    }

    @CrossOrigin
    @PostMapping
    public void addExercise(@RequestBody User user){

        User existingUser = userRepository.findById(user.getEmail()).get();
        user.getExercises().stream().forEach((Exercise exercise) -> {exercise.setLocalDateTime();
            existingUser.addExercise(exercise);
        });

    }

    @CrossOrigin
    @PostMapping("/dailyExercises")
    public List<Exercise> getDailyExercises(@RequestBody User user) {

        User existingUser = userRepository.findById(user.getEmail()).get();
        if (existingUser != null) {
            return existingUser.getExercises().stream().filter((Exercise exercises) -> {
                return exercises.getLocalDateTime().toLocalDate().equals(LocalDate.now());
            }).collect(Collectors.toList());
        }
        return null;
    }

}

