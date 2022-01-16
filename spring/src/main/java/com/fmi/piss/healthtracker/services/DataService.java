package com.fmi.piss.healthtracker.services;

import com.fmi.piss.healthtracker.models.Exercise;
import com.fmi.piss.healthtracker.models.FoodDetails;
import com.fmi.piss.healthtracker.models.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DataService {
    Map<String, User> users = new HashMap<>();

    public void addUser(User newUser) {
        users.put(newUser.getEmail(), newUser);
    }

    public User getUser(String email) {
        return users.get(email);
    }

    public List<Exercise> getDailyExercises(String email) {
//        List<Exercise> exercises = users.get(email).getExercises();
//        exercises.stream().filter(exercise -> {exercise.getLocalDateTime().isAfter()})
        return null;
    }

    public List<FoodDetails> getFoods() {
        return null;
    }

}
