route.controller('LocationModalController', ['$scope', 'ModalService', 'ModalConstant', function($scope, ModalService, ModalConstant){
    $scope.properties = ModalService.properties;
    $scope.CONSTANT = {
        ADD: ModalConstant.TYPE.ADD,
        EDIT: ModalConstant.TYPE.EDIT
    };

    $scope.save = function(){
        ModalService.closeAndResolve();
    };

    $scope.update = function(){
        ModalService.closeAndResolve();
    };

    $scope.close = function(){
        ModalService.closeAndReject();
    };

}]);