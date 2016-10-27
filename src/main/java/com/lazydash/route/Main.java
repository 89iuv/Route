package com.lazydash.route;

import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DirectionsLeg;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.DirectionsRoute;
import com.google.maps.model.DirectionsStep;
import com.lazydash.route.algoritms.BruteForce;
import com.lazydash.route.google.DirectionService;
import com.lazydash.route.google.DistanceMatrixService;
import com.lazydash.route.model.Location;
import com.lazydash.route.model.Route;
import org.jsoup.Jsoup;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;
import java.util.List;

/**
 * Created by VUveges on 10/24/2016.
 */
@SpringBootApplication
public class Main {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Main.class, args);
//        run();
    }

    private static void run(){
        String[] locationStringArray = new String[]{"Calarasi", "Galati", "Bucuresti", "Timisoara", "Braila", "Calarasi"};

        List<Location> locationList = new DistanceMatrixService().getLocationList(locationStringArray);
        List<Location> bestDistanceOrderedLocationList = new BruteForce().run(locationList);
        Route route = new DirectionService().getRoute(bestDistanceOrderedLocationList);

        System.out.println(route);

    }

}
