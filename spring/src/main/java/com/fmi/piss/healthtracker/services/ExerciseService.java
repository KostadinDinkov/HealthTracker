package com.fmi.piss.healthtracker.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fmi.piss.healthtracker.models.Exercise;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.concurrent.ExecutionException;

public class ExerciseService {
    private final String BASE_URL = "https://trackapi.nutritionix.com/v2/";
    private final String X_APP_ID = "4467daa7";
    private final String X_APP_KEY = "86a68f2baea1cd00145af07862e8a463";

    public Exercise lookup(String search) {
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
                .path("natural/exercise")
                .build();
        ResponseEntity<JsonNode> response = new RestTemplate().exchange(
                uri.toUriString(), HttpMethod.POST, http, JsonNode.class);

        Exercise body = new JsonMapper().convertValue(response.getBody().get("exercises").get(0), Exercise.class);

        System.out.println(body);

        return null;
    }
}
