package com.lazydash.route.rest.controller;

import com.lazydash.route.core.algoritm.BruteForce;
import com.lazydash.route.core.model.Neighbors;
import com.lazydash.route.core.util.LocationsUtil;
import com.lazydash.route.external.google.model.Route;
import com.lazydash.route.external.google.service.DirectionService;
import com.lazydash.route.external.google.service.DistanceMatrixService;
import com.lazydash.route.persistence.model.Location;
import com.lazydash.route.persistence.model.Transport;
import com.lazydash.route.persistence.repository.TransportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by VUveges on 11/1/2016.
 */
@RestController
@RequestMapping("/api")
public class TransportController {
    private TransportRepository transportRepository;
    private DistanceMatrixService distanceMatrixService;
    private BruteForce bruteForce;
    private DirectionService directionService;

    @Autowired
    public void setDeliveryRepository(TransportRepository transportRepository) {
        this.transportRepository = transportRepository;
    }

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

    @RequestMapping(value = "/transport", method = RequestMethod.GET)
    public List<Transport> getDelivery(){
        return transportRepository.findAll();
    }

    @RequestMapping(value = "/transport", method = RequestMethod.POST)
    public Transport postDelivery(@RequestBody Transport transport){
        List<Neighbors> locationListWithNeighbors = distanceMatrixService.getLocationListWithNeighbors(transport.getLocations());
        List<Neighbors> quickestRouteNeighbors = bruteForce.run(locationListWithNeighbors);
        List<Location> quickestRouteLocations = LocationsUtil.transformNeighborsListToLocationList(quickestRouteNeighbors);
        Route route = directionService.getRoute(quickestRouteLocations);

        transport.setDistance(route.getDistance());
        transport.setLocations(route.getLocations());
        transport.setInstructions(route.getInstructions());

        return transportRepository.save(transport);
    }

    @RequestMapping(value = "/transport/{id}", method = RequestMethod.DELETE)
    public void deleteDelivery(@PathVariable long id){
        transportRepository.delete(id);
    }


}
