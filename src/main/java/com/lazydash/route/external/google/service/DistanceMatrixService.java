package com.lazydash.route.external.google.service;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import com.lazydash.route.core.model.Neighbors;
import com.lazydash.route.core.util.LocationsUtil;
import com.lazydash.route.persistence.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by VUveges on 10/24/2016.
 */
@Service
public class DistanceMatrixService {

    private GeoApiContext geoApiContext;

    @Autowired
    public void setGeoApiContext(GeoApiContext geoApiContext) {
        this.geoApiContext = geoApiContext;
    }

    public List<Neighbors> getLocationListWithNeighbors(List<Location> locationList){
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

    private List<Neighbors> buildLocationListWithNeighbors(List<Location> locationList, DistanceMatrix distanceMatrix){
        List<Neighbors> neighborsList = new LinkedList<Neighbors>();

        for (int i = 0; i<locationList.size(); i++){
            Neighbors neighbors = new Neighbors();
            neighbors.setLocation(locationList.get(i));

            for (int j = 0; j<distanceMatrix.rows[i].elements.length; j++){
                long distance = distanceMatrix.rows[i].elements[j].distance.inMeters;
                neighbors.getNeighborToDistanceMap().put(locationList.get(j), distance);
            }

            neighborsList.add(neighbors);
        }

        return neighborsList;
    }
}
