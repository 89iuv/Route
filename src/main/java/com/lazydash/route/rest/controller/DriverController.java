package com.lazydash.route.rest.controller;

import com.lazydash.route.persistence.model.Driver;
import com.lazydash.route.persistence.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

/**
 * Created by VUveges on 10/29/2016.
 */
@RestController
@RequestMapping("/api")
public class DriverController {
    private DriverRepository driverRepository;

    @Autowired
    public void setDriverRepository(DriverRepository DriverRepository) {
        this.driverRepository = DriverRepository;
    }

    @RequestMapping(value = "/driver", method = RequestMethod.GET)
    public Page<Driver> getDrivers(Pageable pageable){
        return driverRepository.findAll(pageable);
    }

    @RequestMapping(value = "/driver/{id}", method = RequestMethod.GET)
    public Driver getDriver(@PathVariable long id){
        return driverRepository.findOne(id);
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
