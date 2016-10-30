route.controller('ModalController', ['$scope', 'ModalService', function($scope, ModalService){

    $scope.properties = ModalService.properties;
    $scope.addAnotherOne = false;

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

    $scope.clickCheckbox = function(){
        $scope.addAnotherOne = !$scope.addAnotherOne;
    };

    $scope.save = function(){
        ModalService.properties.actions.save();

        if (!$scope.addAnotherOne) {
            $scope.closeAndResolve();
        }
    };

    $scope.edit = function(){
        console.log("edit");
        $scope.closeAndResolve();
    };

    $scope.close = function(){
        ModalService.closeAndReject();
    };


}]);