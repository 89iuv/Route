package com.lazydash.route.external.google.config;

import com.google.maps.GeoApiContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

/**
 * Created by VUveges on 10/25/2016.
 */
@Configuration
public class GoogleConfig {

    @Bean
    public GeoApiContext geoApiContext(){
        GeoApiContext geoApiContext = new GeoApiContext();
        geoApiContext.setApiKey("AIzaSyC2MyGk_YlPv7xrEMQhhI6YuhGVFBPIUW4");

        return geoApiContext;
    }

}
