route.controller('TransportViewController',
    ['$scope', '$location', 'RouteTextConstants', 'RoutePathConstants', 'TransportRepositoryService',
        function ($scope, $location, RouteTextConstants, RoutePathConstants, TransportRepositoryService) {
            $scope.TEXT = RouteTextConstants;
            $scope.data = TransportRepositoryService.state;

            $scope.columns = [
                {value: 'id', text: 'Tid'},
                {value: 'driver', text: 'Did'},
                {value: 'driver', text: 'Driver'},
                {value: 'locations', text: RouteTextConstants.LOCATIONS},
                {value: 'distance', text: RouteTextConstants.DISTANCE},
                {value: 'date', text: RouteTextConstants.DATE}
            ];

            $scope.add = function () {
                $location.url(RoutePathConstants.TRANSPORT_NEW_URL);
            };

            $scope.report = function (transport) {
                $location.url(RoutePathConstants.TRANSPORT_REPORT_URL + '/' + transport.id);
            };

            $scope.delete = function (transport) {
                TransportRepositoryService.delete(transport);
            }

        }]);