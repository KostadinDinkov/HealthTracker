package com.fmi.piss.healthtracker.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

//@Entity
//@Table(name="USER")
public class User {

  //  @Id
  // @GeneratedValue(strategy = GenerationType.AUTO)
  //  private long ID;
    private List<Exercise> exercises;
    private List<FoodDetails> foods;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Gender gender;
    @JsonProperty("height_cm")
    private double height;
    @JsonProperty("weight_kg")
    private double weight;
    private double age;

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }

    public List<Food> getFoods() {
        return foods;
    }

    public void setFoods(List<Food> foods) {
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
}
