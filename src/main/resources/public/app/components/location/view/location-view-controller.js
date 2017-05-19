route.controller('LocationViewController',
    ['$scope', '$location', 'RouteTextConstants', 'LocationRepositoryService', 'RoutePathConstants',
        function ($scope, $location, RouteTextConstants, LocationRepositoryService, RoutePathConstants) {
            $scope.TEXT = RouteTextConstants;
            $scope.data = LocationRepositoryService.state;

            $scope.add = function () {
                $location.url(RoutePathConstants.LOCATION_NEW_URL);
            };

            $scope.edit = function (location) {
                $location.url(RoutePathConstants.LOCATION_URL + '/' + location.id);
            };

            $scope.delete = function (location) {
                LocationRepositoryService.delete(location);
            }

        }]);