package com.fmi.piss.healthtracker.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;
import java.util.Set;


@Entity
@Table(name = "user")
public class User {
    public User(){

    }
    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email =  email;
        this.password = password;
    }

    //@Id
    // @GeneratedValue(strategy = GenerationType.AUTO)
    //private long ID;
    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @Column(nullable = true)
    private Set<Exercise> exercises;

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @Column(nullable = true)
    private Set<FoodDetails> foods;

    @JsonProperty("first_name")
    private String firstName;
    @JsonProperty("last_name")
    private String lastName;

    @Id
    @Column(length = 100)
    private String email;

    private String password;
    @Column(nullable = true)
    private Gender gender;
    @JsonProperty("height")
    @Column(nullable = true)
    private double height;
    @JsonProperty("weight")
    @Column(nullable = true)
    private double weight;
    @Column(nullable = true)
    private double age;

    private LocalDate birthDate;

    public Set<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(Set<Exercise> exercises) {
        this.exercises = exercises;
    }

    public void addExercise(Exercise exercise){
        exercises.add(exercise);
    }
    public Set<FoodDetails> getFoods() {
        return foods;
    }

    public void setFoods(Set<FoodDetails> foods) {
        this.foods = foods;
    }

    public void addFood(FoodDetails foodDetails){
        foods.add(foodDetails);
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

    public void setBirthDate(LocalDate birthDate){
        this.birthDate = birthDate;
        LocalDate today = LocalDate.now();
        if(birthDate!=null){
            int years = Period.between(birthDate,today).getYears();
            this.age = years;
            System.out.println(age + "years old");
        }

    }

    public LocalDate getBirthDate() {
        return birthDate;
    }


    public User withoutPassword() {
        User result = new User();
        result.setBirthDate(this.getBirthDate());
        result.setFirstName(this.getFirstName());
        result.setGender(this.getGender());
        result.setLastName(this.getLastName());
        result.setHeight(this.getHeight());
        result.setEmail(this.getEmail());
        result.setWeight(this.getWeight());
        result.setExercises(this.getExercises());
        result.setFoods(this.getFoods());
        return result;
    }

    @Override
    public String toString() {
        return "User{" +
                //  "ID=" + ID +
                ", foods=" + foods +
                ", exercises=" + exercises +
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
