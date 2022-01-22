package com.fmi.piss.healthtracker.services;

import com.fmi.piss.healthtracker.models.User;
import com.fmi.piss.healthtracker.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
        existingUser.setAge(user.getAge());
        existingUser.setGender(user.getGender());
        existingUser.setHeight(user.getHeight());
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        userRepository.save(user);
        return "Updated.";
    }

    public User getUserByEmail(String email) {
        return userRepository.findById(email).orElse(null);
    }
}
