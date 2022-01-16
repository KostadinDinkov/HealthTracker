package com.fmi.piss.healthtracker.controllers;

import com.fmi.piss.healthtracker.models.Food;
import com.fmi.piss.healthtracker.models.FoodDetails;
import com.fmi.piss.healthtracker.services.FoodService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/food")
@RestController
public class FoodController {

    private FoodService foodService;
    public FoodController(FoodService foodService){
        this.foodService =  foodService;
    }

    @CrossOrigin
    @PostMapping("/foodList")
    private List<Food> getFoodList(@RequestBody String foodName){
        return foodService.lookup(foodName);
    }

    @CrossOrigin
    @PostMapping()
    private FoodDetails getFoodDetails(@RequestBody String foodName){
        return foodService.getDetails(foodName);
    }


}
