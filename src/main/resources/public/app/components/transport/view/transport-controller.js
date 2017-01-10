route.controller('TransportController', ['$scope', 'RouteModalService', 'RouteTextConstant', 'TransportRepository', function($scope, RouteModalService, RouteTextConstant, TransportRepository){
    $scope.title = _.capitalize(RouteTextConstant.TRANSPORT);

    $scope.data = TransportRepository.state;

    $scope.addTitle = _.capitalize(RouteTextConstant.ADD) + " " + RouteTextConstant.TRANSPORT;
    $scope.actions =  _.capitalize(RouteTextConstant.ACTIONS);
    $scope.editText =  _.capitalize(RouteTextConstant.EDIT);
    $scope.deleteText =  _.capitalize(RouteTextConstant.DELETE);
    $scope.searchPlaceHolder = _.capitalize(RouteTextConstant.SEARCH) + "...";

    $scope.columns = [
        {value: 'id', text: _.capitalize(RouteTextConstant.ID)},
        {value: 'driver', text: _.capitalize(RouteTextConstant.DRIVER)},
        {value: 'distance', text: _.capitalize(RouteTextConstant.DISTANCE)},
        {value: 'date', text: _.capitalize(RouteTextConstant.DATE)},
        {value: 'locations', text: _.capitalize(RouteTextConstant.LOCATIONS)}
    ];

    $scope.LOCATION_MODAL_PARTIAL = 'app/components/transport/modal/transport-modal-partial.html';

    $scope.add = function () {
        RouteModalService.properties.type = RouteTextConstant.ADD;
        RouteModalService.properties.htmlPartialLocation = $scope.LOCATION_MODAL_PARTIAL;
        RouteModalService.show().then(function (data) {
            TransportRepository.save(data);
        });
    };

    $scope.edit = function (location) {
        RouteModalService.properties.type = RouteTextConstant.EDIT;
        RouteModalService.properties.htmlPartialLocation = $scope.LOCATION_MODAL_PARTIAL;
        RouteModalService.properties.data = angular.copy(location);
        RouteModalService.show().then(function (data) {
            TransportRepository.update(data);
        });
    };

    $scope.delete = function (location) {
        TransportRepository.delete(location);
    }

}]);