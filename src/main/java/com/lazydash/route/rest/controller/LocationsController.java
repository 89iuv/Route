package com.lazydash.route.rest.controller;

import com.lazydash.route.persistence.model.Location;
import com.lazydash.route.persistence.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by VUveges on 10/29/2016.
 */
@RestController
@RequestMapping("/api")
public class LocationsController {
    private LocationRepository locationRepository;

    @Autowired
    public void setLocationRepository(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @RequestMapping("/locations")
    public List<Location> get(){
        return locationRepository.findAll();
    }

}
