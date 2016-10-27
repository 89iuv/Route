package com.lazydash.route;

import com.lazydash.route.core.algoritms.BruteForce;
import com.lazydash.route.external.google.DirectionService;
import com.lazydash.route.external.google.DistanceMatrixService;
import com.lazydash.route.persistence.model.Location;
import com.lazydash.route.persistence.model.Route;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

/**
 * Created by VUveges on 10/24/2016.
 */
@SpringBootApplication
public class Main {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Main.class, args);
    }

}
