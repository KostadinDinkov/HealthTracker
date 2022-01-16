package com.fmi.piss.healthtracker.controllers;


import com.fmi.piss.healthtracker.models.Exercise;
import com.fmi.piss.healthtracker.services.ExerciseService;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/exercise")
@RestController
public class ExerciseController {

    private ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService){
        this.exerciseService = exerciseService;
    }

    @CrossOrigin
    @PostMapping
    public Exercise getExercise(@RequestBody String exerciseName){
        return exerciseService.lookup(exerciseName);
    }

}

