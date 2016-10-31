route.controller('DriversController', ['$scope', 'ComponentService', 'ModalService', 'ModalConstant', function ($scope, ComponentService, ModalService, ModalConstant) {
    $scope.title = 'Drivers';
    $scope.columns = ['Id', 'Name', 'Card'];
    $scope.data = [];

    $scope.url = {
        findAll: '/api/drivers',
        save: '/api/driver',
        delete: '/api/driver'
    };

    $scope.htmlAddPartialLocation = 'app/components/drivers/modal/drivers-modal-partial.html';


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

    $scope.delete = function (driver) {
        ComponentService.delete($scope, driver);
    };

    $scope.edit = function (driver) {
        ModalService.properties.type = ModalConstant.TYPE.EDIT;
        ModalService.properties.htmlPartialLocation = $scope.htmlAddPartialLocation;
        ModalService.properties.data = angular.copy(driver);
        ModalService.show().then(function (data) {
            ComponentService.update($scope, data);
        });
    }

}]);