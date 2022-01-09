package com.fmi.piss.healthtracker.models;

import java.io.FileOutputStream;
import java.util.Arrays;
import java.util.List;

public class FoodResponse {
    private Food[] common;
    private Food[] branded;
    private Food[] self;

    public Food[] getCommon() {
        return common;
    }

    public void setCommon(Food[] common) {
        this.common = common;
    }

    public Food[] getBranded() {
        return branded;
    }

    public void setBranded(Food[] branded) {
        this.branded = branded;
    }

    public Food[] getSelf() {
        return self;
    }

    public void setSelf(Food[] self) {
        this.self = self;
    }

    @Override
    public String toString() {
        return "FoodResponse{" +
                "common=" + Arrays.toString(common) +
                ", branded=" + Arrays.toString(branded) +
                ", self=" + Arrays.toString(self) +
                '}';
    }
}
