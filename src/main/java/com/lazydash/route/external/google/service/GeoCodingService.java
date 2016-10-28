package com.lazydash.route.external.google.service;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.GeocodingApiRequest;
import com.google.maps.model.GeocodingResult;
import com.lazydash.route.external.google.config.GoogleConfig;
import com.lazydash.route.persistence.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by VUveges on 10/27/2016.
 */
@Service
public class GeoCodingService {

    @Autowired
    private GeoApiContext geoApiContext;


    public Location buildLocation(String text){
        Location location = new Location();
        location.setName(text);

        GeocodingApiRequest geocodingApiRequest = GeocodingApi.newRequest(geoApiContext);
        geocodingApiRequest.address(text);

        GeocodingResult[] geocodingResults = new GeocodingResult[0];
        try {

            geocodingResults = geocodingApiRequest.await();
        } catch (Exception e) {
            e.printStackTrace();
        }

        for (GeocodingResult geocodingResult : geocodingResults) {
            location.setAddress(geocodingResult.formattedAddress);
            location.setGpsCoordinates(geocodingResult.geometry.location.lat + ", " + geocodingResult.geometry.location.lng);
            break;
        }

        return location;
    }


}
