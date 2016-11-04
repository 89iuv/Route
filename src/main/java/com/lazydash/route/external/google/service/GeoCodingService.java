package com.lazydash.route.external.google.service;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.GeocodingApiRequest;
import com.google.maps.model.GeocodingResult;
import com.lazydash.route.persistence.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created by VUveges on 10/27/2016.
 */
@Service
public class GeoCodingService {

    private GeoApiContext geoApiContext;

    @Autowired
    public void setGeoApiContext(GeoApiContext geoApiContext) {
        this.geoApiContext = geoApiContext;
    }

    public String getAddress(String gps){
        String address = "";

        GeocodingApiRequest geocodingApiRequest = GeocodingApi.newRequest(geoApiContext);
        geocodingApiRequest.address(gps);

        GeocodingResult[] geocodingResults = new GeocodingResult[0];
        try {

            geocodingResults = geocodingApiRequest.await();
        } catch (Exception e) {
            e.printStackTrace();
        }

        for (GeocodingResult geocodingResult : geocodingResults) {
            address = geocodingResult.formattedAddress;
            break;
        }

        return address;
    }
}
