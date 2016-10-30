route.controller('ModalController', ['$scope', 'ModalService', function($scope, ModalService){
    $scope.properties = ModalService.properties;

    $scope.clickCheckbox = function(){
        $scope.addAnotherOne = !$scope.addAnotherOne;
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