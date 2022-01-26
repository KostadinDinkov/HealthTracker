package com.fmi.piss.healthtracker.controllers;

import com.fmi.piss.healthtracker.models.User;
import com.fmi.piss.healthtracker.repos.UserRepository;
import com.fmi.piss.healthtracker.services.FoodService;
import com.fmi.piss.healthtracker.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;
    private UserService userService;

    public ProfileController(UserRepository userRepository, UserService userService) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    private String registerUser(@RequestBody User user) {
        System.out.println(user);
        if (userService.userExists(user)) {
            return "User already exists.";
        }
        userService.registerUser(user);
        return "OK";
    }

    @PostMapping("/login")
    private String login(@RequestBody User user) {
        return userService.userLoginSuccessful(user);
    }

    @PostMapping("/update")
    private String updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @PostMapping("/details")
    private User userDetails(@RequestBody User user) {
        return userService.getUserByEmail(user.getEmail()).withoutPassword();
    }

    @PostMapping("/weeklyBalance")
    private List<Double> weeklyBalance(@RequestBody User user) {
        return userService.weeklyBalance(user);
    }

}
