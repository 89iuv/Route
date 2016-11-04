package com.lazydash.route.persistence.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by VUveges on 11/1/2016.
 */
@Entity(name = "transport")
public class Transport {

    @Id
    @GeneratedValue
    private long id;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "distance")
    private double distance;

    @Lob
    @Column(name = "directions")
    private String directions;

    @ManyToOne
    private Driver driver;

    @ManyToMany
    private List<Location> locations;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public String getDirections() {
        return directions;
    }

    public void setDirections(String directions) {
        this.directions = directions;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }
}
