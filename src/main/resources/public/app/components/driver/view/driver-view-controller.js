route.controller('DriverViewController',
    ['$scope', '$location', 'RouteTextConstants', 'RoutePathConstants', 'DriverRepositoryService',
        function ($scope, $location, RouteTextConstants, RoutePathConstants, DriverRepositoryService) {
            $scope.TEXT = RouteTextConstants;
            $scope.data = DriverRepositoryService.state;

            $scope.add = function () {
                $location.url(RoutePathConstants.DRIVER_NEW_URL);
            };

            $scope.edit = function (driver) {
                $location.url(RoutePathConstants.DRIVER_URL + '/' + driver.id);
            };

            $scope.delete = function (driver) {
                DriverRepositoryService.delete(driver);
            }
        }]);