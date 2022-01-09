package com.fmi.piss.healthtracker.controllers;

import com.fmi.piss.healthtracker.models.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class ProfileController {

    @PostMapping("/register")
    private void registerUser(@RequestBody User user){

    }

    @PostMapping("/login")
    private void login(@RequestBody User user){

    }

}
