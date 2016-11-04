package com.lazydash.route.rest.controller;

import com.lazydash.route.core.algoritm.BruteForce;
import com.lazydash.route.core.model.Neighbors;
import com.lazydash.route.core.util.LocationsUtil;
import com.lazydash.route.external.google.service.DirectionService;
import com.lazydash.route.external.google.service.DistanceMatrixService;
import com.lazydash.route.external.google.service.GeoCodingService;
import com.lazydash.route.persistence.model.Location;
import com.lazydash.route.core.model.Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by VUveges on 10/25/2016.
 */
@RestController
public class RouteController {
    private DistanceMatrixService distanceMatrixService;
    private BruteForce bruteForce;
    private DirectionService directionService;
    private GeoCodingService geoCodingService;

    @Autowired
    public void setDistanceMatrixService(DistanceMatrixService distanceMatrixService) {
        this.distanceMatrixService = distanceMatrixService;
    }

    @Autowired
    public void setBruteForce(BruteForce bruteForce) {
        this.bruteForce = bruteForce;
    }

    @Autowired
    public void setDirectionService(DirectionService directionService) {
        this.directionService = directionService;
    }

    @Autowired
    public void setGeoCodingService(GeoCodingService geoCodingService) {
        this.geoCodingService = geoCodingService;
    }

    @RequestMapping(value = "/route/{searchText:.+}", method = RequestMethod.GET)
    public Route get(@PathVariable String searchText){

        List<Location> locations = buildLocationList(searchText);

        List<Neighbors> neighborsList = distanceMatrixService.getLocationListWithNeighbors(locations);
        List<Neighbors> bestDistanceNeighborsList = bruteForce.run(neighborsList);
        List<Location> bestDistanceLocationList = LocationsUtil.transformNeighborsListToLocationList(bestDistanceNeighborsList);

        return directionService.getRoute(bestDistanceLocationList);
    }

    private List<Location> buildLocationList(String searchText) {
        String[] locationStringArray = searchText.split("-");

        List<Location> locations = new LinkedList<Location>();
        for (String locationName: locationStringArray){
            Location location = new Location();
//            Location location = geoCodingService.buildLocation(locationName);
            locations.add(location);
        }
        return locations;
    }
}
