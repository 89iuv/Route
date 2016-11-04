route.controller('TransportsController', ['$scope', 'ComponentService', 'ModalService', 'ModalConstant', 'RouteConstant', 'RouteFactory', 'RouteService', function($scope, ComponentService, ModalService, ModalConstant, RouteConstant, RouteFactory, RouteService){
    $scope.title = RouteFactory.capitalize(RouteConstant.TRANSPORT.name);
    $scope.state = RouteService.state;
    $scope.data = $scope.state[RouteConstant.TRANSPORT.name];
    $scope.actions = RouteConstant.TEXT.ACTIONS;
    $scope.editText = RouteConstant.TEXT.EDIT;
    $scope.deleteText = RouteConstant.TEXT.DELETE;

    $scope.columns = [
        RouteConstant.COLUMN.ID,
        RouteConstant.COLUMN.NAME,
        RouteConstant.COLUMN.DELIVERY_POINT,
        RouteConstant.COLUMN.GPS
    ];

    $scope.HTML_ADD_PARTIAL_TRANSPORT = 'app/components/transport/modal/transport-modal-partial.html';

    $scope.add = function () {
        ModalService.properties.type = ModalConstant.TYPE.ADD;
        ModalService.properties.htmlPartialLocation = $scope.HTML_ADD_PARTIAL_TRANSPORT;
        ModalService.show().then(function (data) {
            ComponentService.save(RouteConstant.TRANSPORT, data);
        });
    };

    $scope.delete = function (location) {
        ComponentService.delete(RouteConstant.TRANSPORT, location);
    };

    $scope.edit = function (location) {
        ModalService.properties.type = ModalConstant.TYPE.EDIT;
        ModalService.properties.htmlPartialLocation = $scope.HTML_ADD_PARTIAL_TRANSPORT;
        ModalService.properties.data = angular.copy(location);
        ModalService.show().then(function (data) {
            ComponentService.update(RouteConstant.TRANSPORT, data);
        });
    }

}]);