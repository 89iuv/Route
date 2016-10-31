route.controller('DriverModalController', ['$scope', 'ModalService', function($scope, ModalService){
    $scope.properties = ModalService.properties;

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