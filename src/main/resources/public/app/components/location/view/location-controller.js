route.controller('LocationController', ['$scope', 'RouteModalService', 'RouteTextConstant', 'LocationRepository', function($scope, RouteModalService, RouteTextConstant, LocationRepository){
    $scope.title = _.capitalize(RouteTextConstant.LOCATION);

    $scope.data = LocationRepository.state;
    $scope.unCacat='unCacat';

    $scope.addTitle = _.capitalize(RouteTextConstant.ADD) + " " + RouteTextConstant.LOCATION;
    $scope.actions =  _.capitalize(RouteTextConstant.ACTIONS);
    $scope.editText =  _.capitalize(RouteTextConstant.EDIT);
    $scope.deleteText =  _.capitalize(RouteTextConstant.DELETE);
    $scope.searchPlaceHolder = _.capitalize(RouteTextConstant.SEARCH) + "...";

    $scope.columns = [
        {value: 'id', text: _.capitalize(RouteTextConstant.ID)},
        {value: 'name', text: _.capitalize(RouteTextConstant.NAME)},
        {value: 'deliveryPoint', text: _.capitalize(RouteTextConstant.DELIVERY_POINT)},
        {value: 'gps', text: _.capitalize(RouteTextConstant.GPS) }
    ];

    $scope.LOCATION_MODAL_PARTIAL = 'app/components/location/modal/location-modal-partial.html';

    $scope.add = function () {
        RouteModalService.properties.type = RouteTextConstant.ADD;
        RouteModalService.properties.htmlPartialLocation = $scope.LOCATION_MODAL_PARTIAL;
        RouteModalService.show().then(function (data) {
            LocationRepository.save(data);
        });
    };

    $scope.edit = function (location) {
        RouteModalService.properties.type = RouteTextConstant.EDIT;
        RouteModalService.properties.htmlPartialLocation = $scope.LOCATION_MODAL_PARTIAL;
        RouteModalService.properties.data = angular.copy(location);
        RouteModalService.show().then(function (data) {
            LocationRepository.update(data);
        });
    };

    $scope.delete = function (location) {
        LocationRepository.delete(location);
    }

}]);