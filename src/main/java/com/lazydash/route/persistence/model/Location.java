package com.lazydash.route.persistence.model;

/**
 * Created by VUveges on 10/24/2016.
 */
public class Location {
    private String name;
    private String address;
    private String gpsCoordinates;

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

    public String getGpsCoordinates() {
        return gpsCoordinates;
    }

    public void setGpsCoordinates(String gpsCoordinates) {
        this.gpsCoordinates = gpsCoordinates;
    }

    @Override
    public String toString() {
        return "Location{" +
                "name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", gpsCoordinates='" + gpsCoordinates + '\'' +
                '}';
    }
}
