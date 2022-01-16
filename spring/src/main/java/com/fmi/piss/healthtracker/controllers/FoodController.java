package com.fmi.piss.healthtracker.controllers;

import com.fmi.piss.healthtracker.models.Food;
import com.fmi.piss.healthtracker.models.FoodDetails;
import com.fmi.piss.healthtracker.models.User;
import com.fmi.piss.healthtracker.repos.UserRepository;
import com.fmi.piss.healthtracker.services.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/food")
@RestController
public class FoodController {

    @Autowired
    private UserRepository userRepository;

    private FoodService foodService;

    public FoodController(FoodService foodService, UserRepository userRepository) {
        this.foodService = foodService;
        this.userRepository = userRepository;

    }

    @CrossOrigin
    @PostMapping("/dailyIntake")
    public List<FoodDetails> getDailyIntake(@RequestBody User user) {

        User existingUser = userRepository.findById(user.getEmail()).get();
        if (existingUser != null) {
            return existingUser.getFoods().stream().filter((FoodDetails food) -> {
               return food.getLocalDateTime().toLocalDate().equals(LocalDate.now());
            }).collect(Collectors.toList());
        }
        return null;
    }

    @CrossOrigin
    @PostMapping("/foodList")
    private List<Food> getFoodList(@RequestBody String foodName) {
        return foodService.lookup(foodName);
    }
    //returns list of food by name

    @CrossOrigin
    @PostMapping("/item")
    private FoodDetails getFoodDetails(@RequestBody String foodName) {
        return foodService.getDetails(foodName);
    }
    //returns food details by name

    @CrossOrigin
    @PostMapping()
    private void foodAdded(@RequestBody User user) {
        //receive user with recentlly eaten food

        User existingUser = userRepository.findById(user.getEmail()).get();
        user.getFoods().stream().forEach((FoodDetails food) -> {
            food.setLocalDateTime();
            existingUser.addFood(food);
        });
    }
    //saves info after confirmation

}
