package com.lazydash.route;

import com.google.maps.*;
import com.google.maps.model.*;
import org.junit.Test;

/**
 * Created by VUveges on 10/22/2016.
 */
public class MainTest {

    @Test
    public void testMain() throws Exception {
        String[] origins = new String[]{"44.373456, 26.130280", "44.201104, 27.322141"};
        String[] destinations = new String[]{"44.373456, 26.130280", "44.201104, 27.322141"};

        GeoApiContext geoApiContext = new GeoApiContext();
        geoApiContext.setApiKey("AIzaSyC2MyGk_YlPv7xrEMQhhI6YuhGVFBPIUW4");

        DistanceMatrixApiRequest distanceMatrixApiRequest = DistanceMatrixApi.newRequest(geoApiContext);
        distanceMatrixApiRequest.origins(origins);
        distanceMatrixApiRequest.destinations(destinations);
        DistanceMatrix distanceMatrix = distanceMatrixApiRequest.await();



        int i = 0;
        for (DistanceMatrixRow distanceMatrixRow : distanceMatrix.rows) {
            Distance distance = distanceMatrixRow.elements[0].distance;

            String route = "from: " +
                    distanceMatrix.originAddresses[i] +
                    " to: " +
                    distanceMatrix.destinationAddresses[i] +
                    " - " +
                    distance;

            System.out.println(route);

            i++;
        }


    }
}
