route.controller('LocationsController', ['$scope', 'ComponentService', function($scope, ComponentService){
    $scope.title = 'Locations';
    $scope.columns = [];
    $scope.data = [];

    $scope.url = {
        findAll: '/api/locations',
        save: '/api/location'
    };

    ComponentService.findAll($scope);

}]);