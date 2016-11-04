package com.lazydash.route.rest.controller;

import com.lazydash.route.persistence.model.Driver;
import com.lazydash.route.persistence.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by VUveges on 10/29/2016.
 */
@RestController
@RequestMapping("/api")
public class DriverController {
    private DriverRepository driverRepository;

    @Autowired
    public void setDriverRepository(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    @RequestMapping(value = "/driver", method = RequestMethod.GET)
    public List<Driver> getDrivers(){
        return driverRepository.findAll();
    }

    @RequestMapping(value = "/driver", method = RequestMethod.POST)
    public Driver postDriver(@RequestBody Driver driver){
        return driverRepository.save(driver);
    }

    @RequestMapping(value = "/driver/{id}", method = RequestMethod.DELETE)
    public void deleteDriver(@PathVariable long id){
        driverRepository.delete(id);
    }

}
