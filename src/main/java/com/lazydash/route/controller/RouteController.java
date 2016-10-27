package com.lazydash.route.controller;

import com.lazydash.route.algoritms.BruteForce;
import com.lazydash.route.google.DirectionService;
import com.lazydash.route.google.DistanceMatrixService;
import com.lazydash.route.model.Location;
import com.lazydash.route.model.Route;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by VUveges on 10/25/2016.
 */
@RestController
public class RouteController {

    @RequestMapping(value = "/route/{searchText:.+}", method = RequestMethod.GET)
    public Route get(@PathVariable String searchText){
        String[] locationStringArray = searchText.split("-");

        List<Location> locationList = new DistanceMatrixService().getLocationList(locationStringArray);
        List<Location> bestDistanceOrderedLocationList = new BruteForce().run(locationList);
        Route route = new DirectionService().getRoute(bestDistanceOrderedLocationList);

        return route;
    }
}
