route.controller('LocationModalController', ['$scope', 'RouteModalService', 'RouteTextConstant', function($scope, RouteModalService, RouteTextConstant){
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
        DELIVERY_POINT: _.capitalize(RouteTextConstant.DELIVERY_POINT),
        GPS: _.capitalize(RouteTextConstant.GPS),

        TITLE: RouteTextConstant.LOCATION
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