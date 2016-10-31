route.controller('LocationsController', ['$scope', 'ComponentService', 'ModalService', 'ModalConstant', function($scope, ComponentService, ModalService, ModalConstant){
    $scope.title = 'Locations';
    $scope.columns = [
        {name: 'id', view: 'Id'},
        {name: 'name', view: 'Name'},
        {name: 'address', view: 'Address'},
        {name: 'gpsCoordinates', view: 'Gps Coordinates'}
    ];
    $scope.data = [];

    $scope.url = {
        findAll: '/api/locations',
        save: '/api/location',
        delete: '/api/location'
    };

    $scope.htmlAddPartialLocation = 'app/components/locations/modal/location-modal-partial.html';


    (function init() {
        ComponentService.findAll($scope);
    })();

    $scope.add = function () {
        ModalService.properties.type = ModalConstant.TYPE.ADD;
        ModalService.properties.htmlPartialLocation = $scope.htmlAddPartialLocation;
        ModalService.show().then(function (data) {
            ComponentService.save($scope, data);
        });
    };

    $scope.delete = function (location) {
        ComponentService.delete($scope, location);
    };

    $scope.edit = function (location) {
        ModalService.properties.type = ModalConstant.TYPE.EDIT;
        ModalService.properties.htmlPartialLocation = $scope.htmlAddPartialLocation;
        ModalService.properties.data = angular.copy(location);
        ModalService.show().then(function (data) {
            ComponentService.update($scope, data);
        });
    }


}]);