package com.fmi.piss.healthtracker.controllers;

import com.fmi.piss.healthtracker.models.User;
import com.fmi.piss.healthtracker.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    public ProfileController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    private void registerUser(@RequestBody User user){

    }

    @PostMapping("/login")
    private void login(@RequestBody User user){


    }

    @PostMapping()
    private void updateUser(){

    }

}
