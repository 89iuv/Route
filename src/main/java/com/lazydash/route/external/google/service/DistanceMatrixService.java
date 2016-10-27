package com.lazydash.route.external.google.service;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import com.lazydash.route.external.google.config.GoogleConfig;
import com.lazydash.route.core.model.LocationNeighbors;
import com.lazydash.route.core.util.LocationsUtil;
import com.lazydash.route.persistence.model.Location;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by VUveges on 10/24/2016.
 */
public class DistanceMatrixService {

    private GeoApiContext geoApiContext = GoogleConfig.getGeoApiContext();

    public List<LocationNeighbors> getLocationListWithNeighbors(List<Location> locationList){
        String[] locationsGpsCoordinates = LocationsUtil.getLocationsGpsCoordinates(locationList);
        DistanceMatrix distanceMatrix = getDistanceMatrix(locationsGpsCoordinates);
        return buildLocationListWithNeighbors(locationList, distanceMatrix);

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

    private List<LocationNeighbors> buildLocationListWithNeighbors(List<Location> locationList, DistanceMatrix distanceMatrix){
        List<LocationNeighbors> locationNeighborsList = new LinkedList<LocationNeighbors>();

        for (int i = 0; i<locationList.size(); i++){
            LocationNeighbors locationNeighbors = new LocationNeighbors();
            locationNeighbors.setLocation(locationList.get(i));

            for (int j = 0; j<distanceMatrix.rows[i].elements.length; j++){
                long distance = distanceMatrix.rows[i].elements[j].distance.inMeters;
                locationNeighbors.getNeighborToDistanceMap().put(locationList.get(j), distance);
            }

            locationNeighborsList.add(locationNeighbors);
        }

        return locationNeighborsList;
    }
}
