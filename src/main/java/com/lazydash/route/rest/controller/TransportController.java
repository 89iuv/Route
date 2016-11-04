package com.lazydash.route.rest.controller;

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

    @Autowired
    public void setDeliveryRepository(TransportRepository transportRepository) {
        this.transportRepository = transportRepository;
    }

    @RequestMapping(value = "/transports", method = RequestMethod.GET)
    public List<Transport> getDelivery(){
        return transportRepository.findAll();
    }

    @RequestMapping(value = "/transport", method = RequestMethod.POST)
    public Transport postDelivery(@RequestBody Transport transport){
        return transportRepository.save(transport);
    }

    @RequestMapping(value = "/transport/{id}", method = RequestMethod.DELETE)
    public void deleteDelivery(@PathVariable long id){
        transportRepository.delete(id);
    }


}
