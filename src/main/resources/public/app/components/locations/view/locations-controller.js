route.controller('LocationsController', ['$scope', 'ComponentService', 'ModalService', 'ModalConstant', 'RouteConstant', 'RouteFactory', 'RouteService', function($scope, ComponentService, ModalService, ModalConstant, RouteConstant, RouteFactory, RouteService){
    $scope.title = RouteFactory.capitalize(RouteConstant.LOCATION.name);
    $scope.state = RouteService.state;
    $scope.data = $scope.state[RouteConstant.LOCATION.name];
    $scope.actions = RouteConstant.TEXT.ACTIONS;
    $scope.editText = RouteConstant.TEXT.EDIT;
    $scope.deleteText = RouteConstant.TEXT.DELETE;

    $scope.columns = [
        RouteConstant.COLUMN.ID,
        RouteConstant.COLUMN.NAME,
        RouteConstant.COLUMN.DELIVERY_POINT,
        RouteConstant.COLUMN.GPS
    ];

    $scope.HTML_ADD_PARTIAL_LOCATION = 'app/components/locations/modal/location-modal-partial.html';

    $scope.add = function () {
        ModalService.properties.type = ModalConstant.TYPE.ADD;
        ModalService.properties.htmlPartialLocation = $scope.HTML_ADD_PARTIAL_LOCATION;
        ModalService.show().then(function (data) {
            ComponentService.save(RouteConstant.LOCATION, data);
        });
    };

    $scope.delete = function (location) {
        ComponentService.delete(RouteConstant.LOCATION, location);
    };

    $scope.edit = function (location) {
        ModalService.properties.type = ModalConstant.TYPE.EDIT;
        ModalService.properties.htmlPartialLocation = $scope.HTML_ADD_PARTIAL_LOCATION;
        ModalService.properties.data = angular.copy(location);
        ModalService.show().then(function (data) {
            ComponentService.update(RouteConstant.LOCATION, data);
        });
    }


}]);