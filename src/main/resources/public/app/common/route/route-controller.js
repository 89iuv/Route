route.controller('RouteController', ['$scope', '$log', 'RouteService', 'RouteConstant', 'ComponentService', function($scope, $log, RouteService, RouteConstant, ComponentService){
    $scope.state = RouteService.state;

    RouteConstant.COMPONENTS.forEach(function(component){
        $scope.$watch('state.' + component.name, function(newValue, oldValue){

            if (newValue !== oldValue) {
                $log.info(component.name + " size: " + newValue.length);
                newValue.forEach(function(object){
                    $log.info("\t" + JSON.stringify(object));
                })

            }

        }, true);

        ComponentService.findAll(component);

    });




}]);