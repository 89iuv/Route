route.controller('DriverModalController', ['$scope', 'RouteModalService', 'RouteTextConstant', 'LocationRepository', function($scope, RouteModalService, RouteTextConstant, LocationRepository){
    $scope.state = RouteModalService.properties;

    $scope.TEXT = {
        ADD: _.capitalize(RouteTextConstant.ADD),
        EDIT: _.capitalize(RouteTextConstant.EDIT),
        UPDATE: _.capitalize(RouteTextConstant.UPDATE),
        CLOSE: _.capitalize(RouteTextConstant.CLOSE),
        SAVE: _.capitalize(RouteTextConstant.SAVE),
        CREATE: _.capitalize(RouteTextConstant.CREATE),

        ID: _.capitalize(RouteTextConstant.ID),
        NAME: _.capitalize(RouteTextConstant.NAME),
        CAR: _.capitalize(RouteTextConstant.CAR),
        COMPANY: _.capitalize(RouteTextConstant.COMPANY),

        TITLE: RouteTextConstant.DRIVER
    };

    $scope.CONSTANT = {
        ADD: RouteTextConstant.ADD,
        EDIT: RouteTextConstant.EDIT
    };

    $scope.save = function(){
        RouteModalService.closeAndResolve();
    };

    $scope.update = function(){
        RouteModalService.closeAndResolve();
    };

    $scope.close = function(){
        RouteModalService.closeAndReject();
    };


}]);