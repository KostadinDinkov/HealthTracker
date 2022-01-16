package com.fmi.piss.healthtracker.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.ManyToAny;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "exercise")
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    //the time of adding the exercise
    private LocalDateTime localDateTime;
    private long tagID;
    private String userInput;
    private double durationMin;
    private long met;
    private double nfCalories;
    @OneToOne
    private Photo photo;
    private long compendiumCode;
    private String name;
    private String description;
    private String benefits;

    @JsonProperty("tag_id")
    public long getTagID() {
        return tagID;
    }

    @JsonProperty("tag_id")
    public void setTagID(long value) {
        this.tagID = value;
    }

    @JsonProperty("user_input")
    public String getUserInput() {
        return userInput;
    }

    @JsonProperty("user_input")
    public void setUserInput(String value) {
        this.userInput = value;
    }

    @JsonProperty("duration_min")
    public double getDurationMin() {
        return durationMin;
    }

    @JsonProperty("duration_min")
    public void setDurationMin(double value) {
        this.durationMin = value;
    }

    @JsonProperty("met")
    public long getMet() {
        return met;
    }

    @JsonProperty("met")
    public void setMet(long value) {
        this.met = value;
    }

    @JsonProperty("nf_calories")
    public double getNfCalories() {
        return nfCalories;
    }

    @JsonProperty("nf_calories")
    public void setNfCalories(double value) {
        this.nfCalories = value;
    }

    @JsonProperty("photo")
    public Photo getPhoto() {
        return photo;
    }

    @JsonProperty("photo")
    public void setPhoto(Photo value) {
        this.photo = value;
    }

    @JsonProperty("compendium_code")
    public long getCompendiumCode() {
        return compendiumCode;
    }

    @JsonProperty("compendium_code")
    public void setCompendiumCode(long value) {
        this.compendiumCode = value;
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String value) {
        this.name = value;
    }

    @JsonProperty("description")
    public String getDescription() {
        return description;
    }

    @JsonProperty("description")
    public void setDescription(String value) {
        this.description = value;
    }

    @JsonProperty("benefits")
    public String getBenefits() {
        return benefits;
    }

    @JsonProperty("benefits")
    public void setBenefits(String value) {
        this.benefits = value;
    }


    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    public void setLocalDateTime() {
        this.localDateTime = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Exercise{" +
                "tagID=" + tagID +
                ", userInput='" + userInput + '\'' +
                ", durationMin=" + durationMin +
                ", met=" + met +
                ", nfCalories=" + nfCalories +
                ", photo=" + photo +
                ", compendiumCode=" + compendiumCode +
                ", name='" + name + '\'' +
                '}';
    }
}
