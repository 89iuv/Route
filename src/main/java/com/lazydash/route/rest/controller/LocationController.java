package com.lazydash.route.rest.controller;

import com.lazydash.route.persistence.model.Location;
import com.lazydash.route.persistence.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

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
    public Page<Location> get(Pageable pageable){
        return locationRepository.findAll(pageable);
    }

    @RequestMapping(value = "/location/{id}", method = RequestMethod.GET)
    public Location getLocation(@PathVariable long id){
        return locationRepository.findOne(id);
    }

    @RequestMapping(value = "/location", method = RequestMethod.POST)
    public Location postLocation(@RequestBody Location location){
        return locationRepository.save(location);
    }

    @RequestMapping(value = "/location/{id}", method = RequestMethod.DELETE)
    public void deleteLocation(@PathVariable long id){
        locationRepository.delete(id);
    }

    @RequestMapping(value = "/location/search/name/{query}")
    public Page<Location> searchByName(@PathVariable String query, Pageable pageable){
        return locationRepository.findByNameIgnoreCaseContaining(query, pageable);
    }

    @RequestMapping(value = "/location/search/deliveryPoint/{query}")
    public Page<Location> searchByDeliveryPoint(@PathVariable String query, Pageable pageable){
        return locationRepository.findByDeliveryPointIgnoreCaseContaining(query, pageable);
    }

    @RequestMapping(value = "/location/search/gps/{query}")
    public Page<Location> searchByGps(@PathVariable String query, Pageable pageable){
        return locationRepository.findByGpsIgnoreCaseContaining(query, pageable);
    }
}
