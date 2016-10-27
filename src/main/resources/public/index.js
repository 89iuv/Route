var route = angular.module('Route', ['ngSanitize']);

route.controller('RouteController', function RouteController($scope, $http){
    $scope.title = 'It Works';
    $scope.searchText = '';
    $scope.result = 'Result.';

    $scope.getRoute = function(){
        console.log($scope.searchText);
        $http.get('/route/' + $scope.searchText).then(
            function(response){
                console.log(response.data);
                $scope.result = 'Optimal route: ' + response.data.locations + "</br>";
                $scope.result = $scope.result + 'Distance: ' + response.data.distance + ' km' + "</br></br>";
                $scope.result = $scope.result + response.data.instructions;

            }, function(response){
                console.log(response.data);

        })
    }


})