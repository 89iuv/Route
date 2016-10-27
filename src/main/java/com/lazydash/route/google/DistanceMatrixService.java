package com.lazydash.route.google;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import com.lazydash.route.config.Configuration;
import com.lazydash.route.model.Location;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by VUveges on 10/24/2016.
 */
public class DistanceMatrixService {

    private GeoApiContext geoApiContext = Configuration.getGeoApiContext();

    public List<Location> getLocationList(String... locationArray) {
        DistanceMatrix distanceMatrix = getDistanceMatrix(locationArray);
        return buildLocationList(locationArray, distanceMatrix);
    }

    private DistanceMatrix getDistanceMatrix(String... locationArray){
        DistanceMatrixApiRequest distanceMatrixApiRequest = DistanceMatrixApi.newRequest(geoApiContext);
        distanceMatrixApiRequest.origins(locationArray);
        distanceMatrixApiRequest.destinations(locationArray);

        DistanceMatrix distanceMatrix = null;
        try {
            distanceMatrix = distanceMatrixApiRequest.await();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return distanceMatrix;
    }

    private List<Location> buildLocationList(String[] locationArray, DistanceMatrix distanceMatrix){
        List<Location> locationList = new LinkedList<Location>();
        for (int i = 0; i < distanceMatrix.rows.length; i++){
            Location location = new Location();
            location.setName(locationArray[i]);

            for (int j = 0; j<distanceMatrix.rows[i].elements.length; j++){
                long distance = distanceMatrix.rows[i].elements[j].distance.inMeters;
                location.getDistanceToLocation().put(locationArray[j], distance);
            }

            locationList.add(location);
        }

        return locationList;
    }
}
