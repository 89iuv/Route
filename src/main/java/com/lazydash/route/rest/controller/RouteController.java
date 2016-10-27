package com.lazydash.route.rest.controller;

import com.lazydash.route.core.algoritm.BruteForce;
import com.lazydash.route.core.model.LocationNeighbors;
import com.lazydash.route.core.util.LocationsUtil;
import com.lazydash.route.external.google.service.DirectionService;
import com.lazydash.route.external.google.service.DistanceMatrixService;
import com.lazydash.route.external.google.service.GeoCodingService;
import com.lazydash.route.persistence.model.Location;
import com.lazydash.route.persistence.model.Route;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by VUveges on 10/25/2016.
 */
@RestController
public class RouteController {
    private DistanceMatrixService distanceMatrixService = new DistanceMatrixService();
    private BruteForce bruteForce = new BruteForce();
    private DirectionService directionService = new DirectionService();
    private GeoCodingService geoCodingService = new GeoCodingService();


    @RequestMapping(value = "/route/{searchText:.+}", method = RequestMethod.GET)
    public Route get(@PathVariable String searchText){

        List<Location> locations = buildLocationList(searchText);

        List<LocationNeighbors> locationList = distanceMatrixService.getLocationListWithNeighbors(locations);
        List<LocationNeighbors> bestDistanceLocationNeighborsList = bruteForce.run(locationList);
        List<Location> bestDistanceLocationList = LocationsUtil.transform(bestDistanceLocationNeighborsList);

        return directionService.getRoute(bestDistanceLocationList);
    }

    private List<Location> buildLocationList(@PathVariable String searchText) {
        String[] locationStringArray = searchText.split("-");

        List<Location> locations = new LinkedList<Location>();
        for (String locationName: locationStringArray){
            Location location = geoCodingService.buildLocation(locationName);
            locations.add(location);
        }
        return locations;
    }
}
