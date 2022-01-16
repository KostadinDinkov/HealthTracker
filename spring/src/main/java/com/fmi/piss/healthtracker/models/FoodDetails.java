package com.fmi.piss.healthtracker.models;

import com.fasterxml.jackson.annotation.JsonProperty;


import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="food_details")
public class FoodDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private LocalDateTime localDateTime;
    private long id;
    private String foodName;
    private String brandName;
    private long servingQty;
    private String servingUnit;
    private double servingWeightGrams;
    private double nfCalories;
    private double nfTotalFat;
    private double nfSaturatedFat;
    private double nfCholesterol;
    private double nfSodium;
    private double nfTotalCarbohydrate;
    private long nfDietaryFiber;
    private double nfSugars;
    private double nfProtein;
    private double nfPotassium;
    private double nfP;
    private String nixBrandName;
    private String nixBrandID;
    private String nixItemName;
    private String nixItemID;
    private String upc;
    private long source;
    private long ndbNo;
    private long mealType;
//    private Photo photo;
    private String tagID;

    @JsonProperty("food_name")
    public String getFoodName() { return foodName; }
    @JsonProperty("food_name")
    public void setFoodName(String value) { this.foodName = value; }

    @JsonProperty("brand_name")
    public String getBrandName() { return brandName; }
    @JsonProperty("brand_name")
    public void setBrandName(String value) { this.brandName = value; }

    @JsonProperty("serving_qty")
    public long getServingQty() { return servingQty; }
    @JsonProperty("serving_qty")
    public void setServingQty(long value) { this.servingQty = value; }

    @JsonProperty("serving_unit")
    public String getServingUnit() { return servingUnit; }
    @JsonProperty("serving_unit")
    public void setServingUnit(String value) { this.servingUnit = value; }

    @JsonProperty("serving_weight_grams")
    public double getServingWeightGrams() { return servingWeightGrams; }
    @JsonProperty("serving_weight_grams")
    public void setServingWeightGrams(double value) { this.servingWeightGrams = value; }

    @JsonProperty("nf_calories")
    public double getNfCalories() { return nfCalories; }
    @JsonProperty("nf_calories")
    public void setNfCalories(double value) { this.nfCalories = value; }

    @JsonProperty("nf_total_fat")
    public double getNfTotalFat() { return nfTotalFat; }
    @JsonProperty("nf_total_fat")
    public void setNfTotalFat(double value) { this.nfTotalFat = value; }

    @JsonProperty("nf_saturated_fat")
    public double getNfSaturatedFat() { return nfSaturatedFat; }
    @JsonProperty("nf_saturated_fat")
    public void setNfSaturatedFat(double value) { this.nfSaturatedFat = value; }

    @JsonProperty("nf_cholesterol")
    public double getNfCholesterol() { return nfCholesterol; }
    @JsonProperty("nf_cholesterol")
    public void setNfCholesterol(double value) { this.nfCholesterol = value; }

    @JsonProperty("nf_sodium")
    public double getNfSodium() { return nfSodium; }
    @JsonProperty("nf_sodium")
    public void setNfSodium(double value) { this.nfSodium = value; }

    @JsonProperty("nf_total_carbohydrate")
    public double getNfTotalCarbohydrate() { return nfTotalCarbohydrate; }
    @JsonProperty("nf_total_carbohydrate")
    public void setNfTotalCarbohydrate(double value) { this.nfTotalCarbohydrate = value; }

    @JsonProperty("nf_dietary_fiber")
    public long getNfDietaryFiber() { return nfDietaryFiber; }
    @JsonProperty("nf_dietary_fiber")
    public void setNfDietaryFiber(long value) { this.nfDietaryFiber = value; }

    @JsonProperty("nf_sugars")
    public double getNfSugars() { return nfSugars; }
    @JsonProperty("nf_sugars")
    public void setNfSugars(double value) { this.nfSugars = value; }

    @JsonProperty("nf_protein")
    public double getNfProtein() { return nfProtein; }
    @JsonProperty("nf_protein")
    public void setNfProtein(double value) { this.nfProtein = value; }

    @JsonProperty("nf_potassium")
    public double getNfPotassium() { return nfPotassium; }
    @JsonProperty("nf_potassium")
    public void setNfPotassium(double value) { this.nfPotassium = value; }

    @JsonProperty("nf_p")
    public double getNfP() { return nfP; }
    @JsonProperty("nf_p")
    public void setNfP(double value) { this.nfP = value; }

    @JsonProperty("nix_brand_name")
    public String getNixBrandName() { return nixBrandName; }
    @JsonProperty("nix_brand_name")
    public void setNixBrandName(String value) { this.nixBrandName = value; }

    @JsonProperty("nix_brand_id")
    public String getNixBrandID() { return nixBrandID; }
    @JsonProperty("nix_brand_id")
    public void setNixBrandID(String value) { this.nixBrandID = value; }

    @JsonProperty("nix_item_name")
    public String getNixItemName() { return nixItemName; }
    @JsonProperty("nix_item_name")
    public void setNixItemName(String value) { this.nixItemName = value; }

    @JsonProperty("nix_item_id")
    public String getNixItemID() { return nixItemID; }
    @JsonProperty("nix_item_id")
    public void setNixItemID(String value) { this.nixItemID = value; }

    @JsonProperty("upc")
    public String getUpc() { return upc; }
    @JsonProperty("upc")
    public void setUpc(String value) { this.upc = value; }

    @JsonProperty("source")
    public long getSource() { return source; }
    @JsonProperty("source")
    public void setSource(long value) { this.source = value; }

    @JsonProperty("ndb_no")
    public long getNdbNo() { return ndbNo; }
    @JsonProperty("ndb_no")
    public void setNdbNo(long value) { this.ndbNo = value; }

    @JsonProperty("meal_type")
    public long getMealType() { return mealType; }
    @JsonProperty("meal_type")
    public void setMealType(long value) { this.mealType = value; }

//    @JsonProperty("photo")
//    public Photo getPhoto() { return photo; }
//    @JsonProperty("photo")
//    public void setPhoto(Photo value) { this.photo = value; }

    @JsonProperty("tag_id")
    public String getTagID() { return tagID; }
    @JsonProperty("tag_id")
    public void setTagID(String value) { this.tagID = value; }

//    public LocalDateTime getLocalDateTime() {
//        return localDateTime;
//    }
//
//    public void setLocalDateTime() {
//        this.localDateTime = LocalDateTime.now();
//    }

    @Override
    public String toString() {
        return "FoodDetails{" +
                "foodName='" + foodName + '\'' +
                ", brandName='" + brandName + '\'' +
                ", servingQty=" + servingQty +
                ", servingUnit='" + servingUnit + '\'' +
                ", servingWeightGrams=" + servingWeightGrams +
                ", nfCalories=" + nfCalories +
                ", nfTotalFat=" + nfTotalFat +
                ", nfSaturatedFat=" + nfSaturatedFat +
                ", nfCholesterol=" + nfCholesterol +
                ", nfSodium=" + nfSodium +
                ", nfTotalCarbohydrate=" + nfTotalCarbohydrate +
                ", nfDietaryFiber=" + nfDietaryFiber +
                ", nfSugars=" + nfSugars +
                ", nfProtein=" + nfProtein +
                ", nfPotassium=" + nfPotassium +
                ", nfP=" + nfP +
                ", nixBrandName='" + nixBrandName + '\'' +
                ", nixBrandID='" + nixBrandID + '\'' +
                ", nixItemName='" + nixItemName + '\'' +
                ", nixItemID='" + nixItemID + '\'' +
                ", upc='" + upc + '\'' +
                ", source=" + source +
                ", ndbNo=" + ndbNo +
                ", mealType=" + mealType +
//                ", photo=" + photo +
                ", tagID='" + tagID + '\'' +
                '}';
    }
}
