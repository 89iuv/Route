package com.lazydash.route.core.util;

import com.lazydash.route.core.model.LocationNeighbors;
import com.lazydash.route.persistence.model.Location;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by VUveges on 10/27/2016.
 */
public class LocationsUtil {

    public static String[] getLocationsGpsCoordinates(List<Location> locationList) {
        String[] locationsGpsCoordinates = new String[locationList.size()];
        int i = 0;
        for (Location location : locationList){
            locationsGpsCoordinates[i] = location.getGpsCoordinates();
            i++;
        }
        return locationsGpsCoordinates;
    }

    public static List<Location> transform(List<LocationNeighbors> locationNeighborsList){
        List<Location> locationList = new LinkedList<Location>();

        for (LocationNeighbors locationNeighbors : locationNeighborsList){
            locationList.add(locationNeighbors.getLocation());
        }

        return locationList;
    }
}
