package com.fmi.piss.healthtracker.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "photo")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String thumb;
    private String highres;
    private boolean isUserUploaded;

    @JsonProperty("thumb")
    public String getThumb() { return thumb; }
    @JsonProperty("thumb")
    public void setThumb(String value) { this.thumb = value; }

    @JsonProperty("highres")
    public String getHighres() { return highres; }
    @JsonProperty("highres")
    public void setHighres(String value) { this.highres = value; }

    @JsonProperty("is_user_uploaded")
    public boolean getIsUserUploaded() { return isUserUploaded; }
    @JsonProperty("is_user_uploaded")
    public void setIsUserUploaded(boolean value) { this.isUserUploaded = value; }
}
