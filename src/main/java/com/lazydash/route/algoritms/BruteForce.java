package com.lazydash.route.algoritms;

import com.lazydash.route.model.Location;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by VUveges on 10/24/2016.
 */
public class BruteForce {

    public List<Location> run(List<Location> locationList){
        Location firstLocation = locationList.get(0);
        List<Location> bodyLocationList = new LinkedList<Location>(locationList.subList(1, locationList.size()-1));
        Location lastLocation = locationList.get(locationList.size()-1);

        List<List<Location>> lists = generatePerm(bodyLocationList);

        long bestDistance = Long.MAX_VALUE;
        List<Location> bestRoute = null;

        for (List<Location> routeList : lists){
            routeList.add(0, firstLocation);
            routeList.add(routeList.size(), lastLocation);
        }

        for (List<Location> route : lists){
            long distance = 0;

            for (int i = 1; i<route.size(); i++){
                Location currentLocation = route.get(i);
                Location previousLocation = route.get(i - 1);
                distance = distance + currentLocation.getDistanceToLocation().get(previousLocation.getName());
            }

            if (distance < bestDistance) {
                bestDistance = distance;
                bestRoute = route;
            }
        }

        return bestRoute;
    }

    private List<List<Location>> generatePerm(List<Location> original) {
        if (original.size() == 0) {
            List<List<Location>> result = new ArrayList<List<Location>>();
            result.add(new ArrayList<Location>());
            return result;
        }
        Location firstElement = original.remove(0);
        List<List<Location>> returnValue = new ArrayList<List<Location>>();
        List<List<Location>> permutations = generatePerm(original);
        for (List<Location> smallerPermutated : permutations) {
            for (int index=0; index <= smallerPermutated.size(); index++) {
                List<Location> temp = new ArrayList<Location>(smallerPermutated);
                temp.add(index, firstElement);
                returnValue.add(temp);
            }
        }
        return returnValue;
    }
}
