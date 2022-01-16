package com.fmi.piss.healthtracker.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "user")
public class User {
    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    //@Id
    // @GeneratedValue(strategy = GenerationType.AUTO)
    //private long ID;
    @OneToMany(fetch = FetchType.EAGER)
    @Column(nullable = false)
    private Set<Exercise> exercises;

    @OneToMany(fetch = FetchType.EAGER)
    @Column(nullable = false)
    private Set<FoodDetails> foods;

    private String firstName;
    private String lastName;

    @Id
    private String email;

    private String password;
    @Column(nullable = false)
    private Gender gender;
    @JsonProperty("height_cm")
    @Column(nullable = false)
    private double height;
    @JsonProperty("weight_kg")
    @Column(nullable = false)
    private double weight;
    @Column(nullable = false)
    private double age;

    public Set<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(Set<Exercise> exercises) {
        this.exercises = exercises;
    }

    public Set<FoodDetails> getFoods() {
        return foods;
    }

    public void setFoods(Set<FoodDetails> foods) {
        this.foods = foods;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getAge() {
        return age;
    }

    public void setAge(double age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                //  "ID=" + ID +
                ", foods=" + foods +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", gender=" + gender +
                ", height=" + height +
                ", weight=" + weight +
                ", age=" + age +
                '}';
    }
}