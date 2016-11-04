route.controller('DriverController', ['$scope', 'RouteModalService', 'RouteTextConstant', 'DriverRepository', function($scope, RouteModalService, RouteTextConstant, DriverRepository){
    $scope.title = _.capitalize(RouteTextConstant.DRIVER);

    $scope.data = DriverRepository.state;

    $scope.addTitle = _.capitalize(RouteTextConstant.ADD) + " " + RouteTextConstant.DRIVER;
    $scope.actions =  _.capitalize(RouteTextConstant.ACTIONS);
    $scope.editText =  _.capitalize(RouteTextConstant.EDIT);
    $scope.deleteText =  _.capitalize(RouteTextConstant.DELETE);
    $scope.search = _.capitalize(RouteTextConstant.SEARCH) + "...";

    $scope.columns = [
        {value: 'id', text: _.capitalize(RouteTextConstant.ID)},
        {value: 'name', text: _.capitalize(RouteTextConstant.NAME)},
        {value: 'car', text: _.capitalize(RouteTextConstant.CAR)},
        {value: 'company', text: _.capitalize(RouteTextConstant.COMPANY)}

    ];

    $scope.DRIVER_MODAL_PARTIAL = 'app/components/driver/modal/driver-modal-partial.html';

    $scope.add = function () {
        RouteModalService.properties.type = RouteTextConstant.ADD;
        RouteModalService.properties.htmlPartialLocation = $scope.DRIVER_MODAL_PARTIAL;
        RouteModalService.show().then(function (data) {
            DriverRepository.save(data);
        });
    };

    $scope.edit = function (location) {
        RouteModalService.properties.type = RouteTextConstant.EDIT;
        RouteModalService.properties.htmlPartialLocation = $scope.DRIVER_MODAL_PARTIAL;
        RouteModalService.properties.data = angular.copy(location);
        RouteModalService.show().then(function (data) {
            DriverRepository.update(data);
        });
    };

    $scope.delete = function (location) {
        DriverRepository.delete(location);
    }

}]);