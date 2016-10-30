package com.lazydash.route.rest.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * Created by VUveges on 10/29/2016.
 */
@RestController
@RequestMapping("/api/info")
public class InfoController {

    @RequestMapping("/status")
    public String status(){
        return "OK " + new Date().toString();
    }

}
