package com.fmi.piss.healthtracker.models;

import com.fasterxml.jackson.annotation.*;

import java.util.UUID;

public class Food {

    private String foodName;
    private String servingUnit;
    private Object nixBrandID;
    private double servingQty;
    private double nfCalories;
    private Object brandName;
    private UUID uuid;
    private Object nixItemID;

    @JsonProperty("food_name")
    public String getFoodName() { return foodName; }
    @JsonProperty("food_name")
    public void setFoodName(String value) { this.foodName = value; }

    @JsonProperty("serving_unit")
    public String getServingUnit() { return servingUnit; }
    @JsonProperty("serving_unit")
    public void setServingUnit(String value) { this.servingUnit = value; }

    @JsonProperty("nix_brand_id")
    public Object getNixBrandID() { return nixBrandID; }
    @JsonProperty("nix_brand_id")
    public void setNixBrandID(Object value) { this.nixBrandID = value; }

    @JsonProperty("serving_qty")
    public double getServingQty() { return servingQty; }
    @JsonProperty("serving_qty")
    public void setServingQty(double value) { this.servingQty = value; }

    @JsonProperty("nf_calories")
    public double getNfCalories() { return nfCalories; }
    @JsonProperty("nf_calories")
    public void setNfCalories(double value) { this.nfCalories = value; }

    @JsonProperty("brand_name")
    public Object getBrandName() { return brandName; }
    @JsonProperty("brand_name")
    public void setBrandName(Object value) { this.brandName = value; }

    @JsonProperty("uuid")
    public UUID getUUID() { return uuid; }
    @JsonProperty("uuid")
    public void setUUID(UUID value) { this.uuid = value; }

    @JsonProperty("nix_item_id")
    public Object getNixItemID() { return nixItemID; }
    @JsonProperty("nix_item_id")
    public void setNixItemID(Object value) { this.nixItemID = value; }
}
