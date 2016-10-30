route.controller('DriversController', ['$scope', 'ComponentService', 'ModalService', function($scope, ComponentService, ModalService){
    $scope.title = 'Drivers';
    $scope.columns = [];
    $scope.data = [];

    $scope.url = {
        findAll: '/api/drivers',
        save: '/api/driver',
        delete: '/api/driver'
    };

    $scope.htmlAddPartialLocation = 'app/components/drivers/drivers-modal-partial.html';


    (function init(){
        ComponentService.findAll($scope);
    })();

    $scope.add = function(){
        ModalService.properties.title = "Create Driver";
        ModalService.properties.type = ModalService.TYPE.ADD;
        ModalService.properties.htmlPartialLocation = $scope.htmlAddPartialLocation;
        ModalService.properties.data = {};
        ModalService.show().then(function(data){
            ComponentService.save($scope, data);
        });
    };

    $scope.delete = function(driver){
        ComponentService.delete($scope, driver);
    };

    $scope.edit = function(driver){
        ModalService.properties.title = "Edit Driver";
        ModalService.properties.type = ModalService.TYPE.EDIT;
        ModalService.properties.htmlPartialLocation = $scope.htmlAddPartialLocation;
        ModalService.properties.data = angular.copy(driver);
        ModalService.show().then(function(data){
            ComponentService.update($scope, data);
        });
    }

}]);