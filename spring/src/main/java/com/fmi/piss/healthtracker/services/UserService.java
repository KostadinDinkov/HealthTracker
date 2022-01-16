package com.fmi.piss.healthtracker.services;

import com.fmi.piss.healthtracker.models.User;
import com.fmi.piss.healthtracker.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(User user) {
        userRepository.save(user);
    }

    public boolean userExists() {
       // boolean exists = userRepository;
    return false;
    }

    public void updateUser() {

    }


}
