package com.lazydash.route.core.algoritm;

import com.lazydash.route.core.model.Neighbors;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by VUveges on 10/24/2016.
 */
@Component
public class BruteForce {

    public List<Neighbors> run(List<Neighbors> neighborsList){
        List<List<Neighbors>> allPossibleRoutes = createAllPossibleRoutes(neighborsList);
        return findShortestRoute(allPossibleRoutes);
    }


    private List<List<Neighbors>> createAllPossibleRoutes(List<Neighbors> neighborsList){
        Neighbors origin = neighborsList.get(0);
        Neighbors destination = neighborsList.get(neighborsList.size()-1);

        List<Neighbors> bodyLocationList = new LinkedList<Neighbors>(neighborsList.subList(1, neighborsList.size()-1));

        List<List<Neighbors>> allPossibleRoutes = generatePerm(bodyLocationList);

        for (List<Neighbors> routeList : allPossibleRoutes){
            routeList.add(0, origin);
            routeList.add(routeList.size(), destination);
        }

        return allPossibleRoutes;
    }


    private List<List<Neighbors>> generatePerm(List<Neighbors> original) {
        if (original.size() == 0) {
            List<List<Neighbors>> result = new ArrayList<List<Neighbors>>();
            result.add(new ArrayList<Neighbors>());
            return result;
        }
        Neighbors firstElement = original.remove(0);
        List<List<Neighbors>> returnValue = new ArrayList<List<Neighbors>>();
        List<List<Neighbors>> permutations = generatePerm(original);
        for (List<Neighbors> smallerPermutated : permutations) {
            for (int index=0; index <= smallerPermutated.size(); index++) {
                List<Neighbors> temp = new ArrayList<Neighbors>(smallerPermutated);
                temp.add(index, firstElement);
                returnValue.add(temp);
            }
        }
        return returnValue;
    }

    private List<Neighbors> findShortestRoute(List<List<Neighbors>> allPossibleRoutes){
        long bestDistance = Long.MAX_VALUE;
        List<Neighbors> shortestRoute = null;

        for (List<Neighbors> route : allPossibleRoutes){
            long distance = 0;

            for (int i = 1; i<route.size(); i++){
                Neighbors currentLocation = route.get(i);
                Neighbors previousLocation = route.get(i - 1);
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
