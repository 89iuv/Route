package com.lazydash.route.external.google.config;

import com.google.maps.GeoApiContext;

/**
 * Created by VUveges on 10/25/2016.
 */
public class GoogleConfig {
    private static GeoApiContext geoApiContext;

    static {
        geoApiContext = new GeoApiContext();
        geoApiContext.setApiKey("AIzaSyC2MyGk_YlPv7xrEMQhhI6YuhGVFBPIUW4");
    }

    public static GeoApiContext getGeoApiContext(){
        return geoApiContext;
    }



}
