package com.lazydash.route.core.algoritm;

import com.lazydash.route.core.model.LocationNeighbors;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by VUveges on 10/24/2016.
 */
public class BruteForce {

    public List<LocationNeighbors> run(List<LocationNeighbors> locationNeighborsList){
        List<List<LocationNeighbors>> allPossibleRoutes = createAllPossibleRoutes(locationNeighborsList);
        return findShortestRoute(allPossibleRoutes);
    }


    private List<List<LocationNeighbors>> createAllPossibleRoutes(List<LocationNeighbors> locationNeighborsList){
        LocationNeighbors origin = locationNeighborsList.get(0);
        LocationNeighbors destination = locationNeighborsList.get(locationNeighborsList.size()-1);

        List<LocationNeighbors> bodyLocationList = new LinkedList<LocationNeighbors>(locationNeighborsList.subList(1, locationNeighborsList.size()-1));

        List<List<LocationNeighbors>> allPossibleRoutes = generatePerm(bodyLocationList);

        for (List<LocationNeighbors> routeList : allPossibleRoutes){
            routeList.add(0, origin);
            routeList.add(routeList.size(), destination);
        }

        return allPossibleRoutes;
    }


    private List<List<LocationNeighbors>> generatePerm(List<LocationNeighbors> original) {
        if (original.size() == 0) {
            List<List<LocationNeighbors>> result = new ArrayList<List<LocationNeighbors>>();
            result.add(new ArrayList<LocationNeighbors>());
            return result;
        }
        LocationNeighbors firstElement = original.remove(0);
        List<List<LocationNeighbors>> returnValue = new ArrayList<List<LocationNeighbors>>();
        List<List<LocationNeighbors>> permutations = generatePerm(original);
        for (List<LocationNeighbors> smallerPermutated : permutations) {
            for (int index=0; index <= smallerPermutated.size(); index++) {
                List<LocationNeighbors> temp = new ArrayList<LocationNeighbors>(smallerPermutated);
                temp.add(index, firstElement);
                returnValue.add(temp);
            }
        }
        return returnValue;
    }

    private List<LocationNeighbors> findShortestRoute(List<List<LocationNeighbors>> allPossibleRoutes){
        long bestDistance = Long.MAX_VALUE;
        List<LocationNeighbors> shortestRoute = null;

        for (List<LocationNeighbors> route : allPossibleRoutes){
            long distance = 0;

            for (int i = 1; i<route.size(); i++){
                LocationNeighbors currentLocation = route.get(i);
                LocationNeighbors previousLocation = route.get(i - 1);
                distance = distance + currentLocation.getNeighborToDistanceMap().get(previousLocation.getLocation());
            }

            if (distance < bestDistance) {
                bestDistance = distance;
                shortestRoute = route;
            }
        }

        return shortestRoute;
    }
}
