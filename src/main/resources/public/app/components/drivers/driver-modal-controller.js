route.controller('DriverModalController', ['$scope', 'ModalService', function($scope, ModalService){
    $scope.properties = ModalService.properties;


    $scope.$watch("properties.type", function(newValue, oldValue){
        if (newValue !== oldValue){
            if ($scope.properties.type === ModalService.TYPE.ADD){
                $scope.type = {
                    isAdd: true,
                    isEdit: false
                };
            } else if ($scope.properties.type === ModalService.TYPE.EDIT){
                $scope.type = {
                    isAdd: false,
                    isEdit: true
                };
            }
        }
    });

}]);