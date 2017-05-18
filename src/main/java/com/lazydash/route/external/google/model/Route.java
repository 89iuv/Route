package com.lazydash.route.external.google.model;

import com.lazydash.route.persistence.model.Location;

import java.util.List;

/**
 * Created by VUveges on 10/25/2016.
 */
public class Route {
    private List<Location> locations;
    private double distance;
    private String instructions;

    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
}
