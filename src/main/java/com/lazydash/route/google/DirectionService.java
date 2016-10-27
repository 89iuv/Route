package com.lazydash.route.google;

import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DirectionsLeg;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.DirectionsRoute;
import com.google.maps.model.DirectionsStep;
import com.lazydash.route.config.Configuration;
import com.lazydash.route.model.Location;
import com.lazydash.route.model.Route;
import org.jsoup.Jsoup;

import java.util.Arrays;
import java.util.List;

/**
 * Created by VUveges on 10/25/2016.
 */
public class DirectionService {

    private GeoApiContext geoApiContext = Configuration.getGeoApiContext();

    public Route getRoute(List<Location> locationList){
        DirectionsResult directionResult = getDirectionResult(transform(locationList));
        return buildRoute(locationList, directionResult);
    }

    private String[] transform(List<Location> locationList){
        String[] locationStringArray = new String[locationList.size()];
        for (int i = 0; i<locationStringArray.length; i++){
            locationStringArray[i] = locationList.get(i).getName();
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

        StringBuilder bestRouteStringBuilder = new StringBuilder();
        for (Location location : locationList){
            bestRouteStringBuilder.append(location.getName()).append(" ");
        }

        bestRoute.setLocationsOrder(bestRouteStringBuilder.toString());

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

        bestRoute.setDirections(directionsStringBuilder.toString());
        bestRoute.setDistance(routeDistance);

        return bestRoute;
    }

}
