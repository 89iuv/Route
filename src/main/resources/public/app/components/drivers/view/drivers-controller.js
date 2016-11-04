route.controller('DriversController', ['$scope', 'ComponentService', 'ModalService', 'ModalConstant', 'RouteConstant', 'RouteFactory', 'RouteService', function($scope, ComponentService, ModalService, ModalConstant, RouteConstant, RouteFactory, RouteService){
    $scope.title = RouteFactory.capitalize(RouteConstant.DRIVER.name);
    $scope.state = RouteService.state;
    $scope.data = $scope.state[RouteConstant.DRIVER.name];
    $scope.actions = RouteConstant.TEXT.ACTIONS;
    $scope.editText = RouteConstant.TEXT.EDIT;
    $scope.deleteText = RouteConstant.TEXT.DELETE;

    $scope.columns = [
        RouteConstant.COLUMN.ID,
        RouteConstant.COLUMN.NAME,
        RouteConstant.COLUMN.DELIVERY_POINT,
        RouteConstant.COLUMN.GPS
    ];

    $scope.HTML_ADD_PARTIAL_DRIVER = 'app/components/drivers/modal/driver-modal-partial.html';

    $scope.add = function () {
        ModalService.properties.type = ModalConstant.TYPE.ADD;
        ModalService.properties.htmlPartialLocation = $scope.HTML_ADD_PARTIAL_DRIVER;
        ModalService.show().then(function (data) {
            ComponentService.save(RouteConstant.DRIVER, data);
        });
    };

    $scope.delete = function (location) {
        ComponentService.delete(RouteConstant.DRIVER, location);
    };

    $scope.edit = function (location) {
        ModalService.properties.type = ModalConstant.TYPE.EDIT;
        ModalService.properties.htmlPartialLocation = $scope.HTML_ADD_PARTIAL_DRIVER;
        ModalService.properties.data = angular.copy(location);
        ModalService.show().then(function (data) {
            ComponentService.update(RouteConstant.DRIVER, data);
        });
    }

}]);