route.controller('ModalController', ['$scope', 'ModalService', function($scope, ModalService){
    $scope.properties = ModalService.properties;
}]);