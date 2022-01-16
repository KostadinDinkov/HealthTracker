package com.fmi.piss.healthtracker.services;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fmi.piss.healthtracker.models.*;
import com.fmi.piss.healthtracker.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.List;

@Service
public class FoodService {
    private UserRepository userRepository;
    private final String BASE_URL = "https://trackapi.nutritionix.com/v2/";
    private final String X_APP_ID = "4467daa7";
    private final String X_APP_KEY = "86a68f2baea1cd00145af07862e8a463";

    @Autowired
    public FoodService(UserRepository userRepository) {
        this.userRepository = userRepository;
        System.out.println("Bean");
        this.getDetails("2 large eggs");
    }

    public List<Food> lookup(String search) {
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-app-id", X_APP_ID);
        headers.set("x-app-key", X_APP_KEY);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        var requestBody = "{\n" +
                "\"query\": \" " + search + "\"\n" +
                "}";

        System.out.println(requestBody);

        HttpEntity<?> http = new HttpEntity<>(requestBody, headers);

        UriComponents uri = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .path("search/instant")
                .build();
        ResponseEntity<FoodResponse> response = new RestTemplate().exchange(
                uri.toUriString(), HttpMethod.POST, http, FoodResponse.class);

//        Exercise body = new JsonMapper().convertValue(response.getBody().get("exercises").get(0), Exercise.class);

        FoodResponse body = response.getBody();
        System.out.println(body);

        return null;
    }

    public FoodDetails getDetails(String search) {
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-app-id", X_APP_ID);
        headers.set("x-app-key", X_APP_KEY);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        var requestBody = "{\n" +
                "\"query\": \" " + search + "\"\n" +
                "}";

        System.out.println(requestBody);

        HttpEntity<?> http = new HttpEntity<>(requestBody, headers);

        UriComponents uri = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .path("natural/nutrients")
                .build();
        ResponseEntity<JsonNode> response = new RestTemplate().exchange(
                uri.toUriString(), HttpMethod.POST, http, JsonNode.class);

        FoodDetails body = new JsonMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false).convertValue(response.getBody().get("foods").get(0), FoodDetails.class);

        System.out.println(body);

        User user = new User();
        userRepository.save(user);
        for (User checkUser : userRepository.findAll()) {
            System.out.println(checkUser);
        }

        return body;
    }
}
