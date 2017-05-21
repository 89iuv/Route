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
    private DriverRepository DriverRepository;

    @Autowired
    public void setDriverRepository(DriverRepository DriverRepository) {
        this.DriverRepository = DriverRepository;
    }

    @RequestMapping(value = "/driver", method = RequestMethod.GET)
    public Page<Driver> getDrivers(Pageable pageable){
        return DriverRepository.findAll(pageable);
    }

    @RequestMapping(value = "/driver", method = RequestMethod.POST)
    public Driver postDriver(@RequestBody Driver driver){
        return DriverRepository.save(driver);
    }

    @RequestMapping(value = "/driver/{id}", method = RequestMethod.DELETE)
    public void deleteDriver(@PathVariable long id){
        DriverRepository.delete(id);
    }

}
