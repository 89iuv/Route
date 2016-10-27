package com.lazydash.route.external.google;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.GeocodingApiRequest;
import com.google.maps.model.GeocodingResult;
import com.lazydash.route.core.config.Configuration;
import com.lazydash.route.persistence.model.Location;

/**
 * Created by VUveges on 10/27/2016.
 */
public class GeoCodingService {
    private GeoApiContext geoApiContext = Configuration.getGeoApiContext();


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
