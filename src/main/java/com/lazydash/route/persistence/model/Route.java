package com.lazydash.route.persistence.model;

import javax.persistence.*;

/**
 * Created by VUveges on 10/25/2016.
 */
@Entity(name = "route")
public class Route {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "locations")
    private String locations;

    @Column(name = "distance")
    private double distance;

    @Lob
    @Column(name = "instructions")
    private String instructions;

    public String getLocations() {
        return locations;
    }

    public void setLocations(String locations) {
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
