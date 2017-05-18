route.controller('TransportReportController',
    ['$scope', '$location', '$routeParams', 'RouteTextConstants', 'RoutePathConstants', 'TransportRepositoryService',
        function($scope, $location, $routeParams, RouteTextConstants, RoutePathConstants, TransportRepositoryService){
            $scope.TEXT = RouteTextConstants;
            $scope.data = _.find(TransportRepositoryService.state, function (transport) {
                return transport.id.toString() === $routeParams.id
            });


        }]);