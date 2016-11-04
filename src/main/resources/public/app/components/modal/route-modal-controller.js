route.controller('RouteModalController', ['$scope', 'RouteModalService', function($scope, RouteModalService){
    $scope.properties = RouteModalService.properties;
}]);