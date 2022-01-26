package com.fmi.piss.healthtracker.services;

import com.fmi.piss.healthtracker.models.Exercise;
import com.fmi.piss.healthtracker.models.FoodDetails;
import com.fmi.piss.healthtracker.models.User;
import com.fmi.piss.healthtracker.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    private FoodService foodService;
    private ExerciseService exerciseService;

    @Autowired
    public UserService(UserRepository userRepository, FoodService foodService, ExerciseService exerciseService) {
        this.userRepository = userRepository;
        this.foodService = foodService;
        this.exerciseService = exerciseService;
    }

    public void registerUser(User user) {
        userRepository.save(user);
    }

    public boolean userExists(User user) {
        return userRepository.existsById(user.getEmail());
    }

    public String userLoginSuccessful(User user) {
        if (!userExists(user)) {
            return "No such user.";
        }
        User user1 = userRepository.findById(user.getEmail()).get();
        return user1.getPassword().equals(user.getPassword()) ? "OK" : "Invalid email/password combination";
    }

    public String updateUser(User user) {
        if (!userExists(user)) {
          return  "No such user.";
        }
        User existingUser = userRepository.findById(user.getEmail()).get();
        existingUser.setWeight(user.getWeight());
        existingUser.setBirthDate(user.getBirthDate());
        existingUser.setGender(user.getGender());
        existingUser.setHeight(user.getHeight());
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        userRepository.save(existingUser);
        return "Updated.";
    }

    public List<Double> weeklyBalance(User user) {
        List<Double> balance = new ArrayList<>(8);

        User existingUser = userRepository.findById(user.getEmail()).get();

        Set<FoodDetails> foodsEaten =  existingUser.getFoods();
        Set<Exercise> exercises =  existingUser.getExercises();

        for (int i = 0; i < 8; i++) {
            balance.add(0.);
        }

        for (FoodDetails foodEaten : foodsEaten) {
            int daysOffset = (int) (LocalDateTime.now().toLocalDate().toEpochDay() - foodEaten.getLocalDateTime().toLocalDate().toEpochDay());
            if (daysOffset > 7 || daysOffset < 0) {
                break;
            }
            balance.set(daysOffset, balance.get(daysOffset) + foodEaten.getNfCalories());
        }

        for (Exercise exercise : exercises) {
            int daysOffset = (int) (LocalDateTime.now().toLocalDate().toEpochDay() - exercise.getLocalDateTime().toLocalDate().toEpochDay());
            if (daysOffset > 7 || daysOffset < 0) {
                break;
            }
            balance.set(daysOffset, balance.get(daysOffset) - exercise.getNfCalories());
        }

        return balance;
    }

    public User getUserByEmail(String email) {
        return userRepository.findById(email).orElse(null);
    }
}
