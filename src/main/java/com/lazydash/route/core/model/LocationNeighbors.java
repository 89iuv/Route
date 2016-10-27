package com.lazydash.route.core.model;

import com.lazydash.route.persistence.model.Location;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by VUveges on 10/27/2016.
 */
public class LocationNeighbors {
    private Location location;
    private Map<Location, Long> neighborToDistanceMap = new HashMap<Location, Long>();

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Map<Location, Long> getNeighborToDistanceMap() {
        return neighborToDistanceMap;
    }

    public void setNeighborToDistanceMap(Map<Location, Long> neighborToDistanceMap) {
        this.neighborToDistanceMap = neighborToDistanceMap;
    }
}
