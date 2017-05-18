package com.lazydash.route.external.google.service;

import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DirectionsLeg;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.DirectionsRoute;
import com.google.maps.model.DirectionsStep;
import com.lazydash.route.external.google.model.Route;
import com.lazydash.route.persistence.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * Created by VUveges on 10/25/2016.
 */
@Service
public class DirectionService {

    @Autowired
    private GeoApiContext geoApiContext;

    public Route getRoute(List<Location> locationList){
        DirectionsResult directionResult = getDirectionResult(transform(locationList));
        return buildRoute(locationList, directionResult);
    }

    private String[] transform(List<Location> locationList){
        String[] locationStringArray = new String[locationList.size()];
        for (int i = 0; i<locationStringArray.length; i++){
            locationStringArray[i] = locationList.get(i).getGps();
        }

        return locationStringArray;
    }

    private DirectionsResult getDirectionResult(String... locationStringArray){
        DirectionsApiRequest directionsApiRequest = DirectionsApi.newRequest(geoApiContext);
        directionsApiRequest.origin(locationStringArray[0]);
        directionsApiRequest.destination(locationStringArray[locationStringArray.length - 1]);
        directionsApiRequest.waypoints(Arrays.copyOfRange(locationStringArray, 1, locationStringArray.length - 1));
        directionsApiRequest.language("ro");

        DirectionsResult directionsResult = null;
        try {
            directionsResult = directionsApiRequest.await();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return directionsResult;
    }

    private Route buildRoute(List<Location> locationList, DirectionsResult directionsResult){
        Route bestRoute = new Route();
        bestRoute.setLocations(locationList);

        StringBuilder directionsStringBuilder = new StringBuilder();
        double routeDistance = 0;
        for (DirectionsRoute route : directionsResult.routes){
            for (DirectionsLeg directionsLeg : route.legs){
                routeDistance = routeDistance + (double) directionsLeg.distance.inMeters/1000;
                directionsStringBuilder
                        .append(directionsLeg.startAddress)
                        .append(" - ")
                        .append((double) directionsLeg.distance.inMeters/1000)
                        .append(" km - ")
                        .append(directionsLeg.endAddress)
                        .append("</br>\n");
                int index = 1;
                for (DirectionsStep directionsStep : directionsLeg.steps){
                    directionsStringBuilder
                            .append(index)
                            .append(". (")
                            .append((double) directionsStep.distance.inMeters/1000)
                            .append(" km) ")
                            .append(directionsStep.htmlInstructions)
                            .append("</br>\n");

                    index++;
                }

                directionsStringBuilder.append("</br>\n");
            }
            break;
        }

        bestRoute.setInstructions(directionsStringBuilder.toString());
        bestRoute.setDistance(routeDistance);

        return bestRoute;
    }

}
