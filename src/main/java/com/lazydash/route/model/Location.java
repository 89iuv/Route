package com.lazydash.route.model;

import java.util.HashMap;

/**
 * Created by VUveges on 10/24/2016.
 */
public class Location {
    private String name;
    private String address;
    private String geoLocation;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGeoLocation() {
        return geoLocation;
    }

    public void setGeoLocation(String geoLocation) {
        this.geoLocation = geoLocation;
    }
}
