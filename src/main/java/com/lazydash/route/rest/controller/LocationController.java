package com.lazydash.route.rest.controller;

import com.lazydash.route.persistence.model.Location;
import com.lazydash.route.persistence.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by VUveges on 10/29/2016.
 */
@RestController
@RequestMapping("/api")
public class LocationController {
    private LocationRepository locationRepository;

    @Autowired
    public void setLocationRepository(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }
    @RequestMapping(value = "/location", method = RequestMethod.GET)
    public List<Location> get(){
        return locationRepository.findAll();
    }

    @RequestMapping(value = "/location", method = RequestMethod.POST)
    public Location postLocation(@RequestBody Location location){
        return locationRepository.save(location);
    }

    @RequestMapping(value = "/location/{id}", method = RequestMethod.DELETE)
    public void deleteLocation(@PathVariable long id){
        locationRepository.delete(id);
    }

}
