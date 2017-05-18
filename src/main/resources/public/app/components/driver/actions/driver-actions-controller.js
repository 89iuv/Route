route.controller('DriverActionsController',
    ['$scope', '$location', '$routeParams', 'RouteTextConstants', 'RoutePathConstants', 'DriverRepositoryService',
        function ($scope, $location, $routeParams, RouteTextConstants, RoutePathConstants, DriverRepositoryService) {
            $scope.TEXT = RouteTextConstants;
            $scope.driver = _.find(DriverRepositoryService.state, function (driver) {
                return driver.id.toString() === $routeParams.id
            });

            if ($scope.driver === undefined) {
                $scope.isNewDriver = true;
                $scope.driver = {};
            } else {
                $scope.isNewDriver = false;
            }

            $scope.save = function () {
                DriverRepositoryService.save($scope.driver);
                $location.url(RoutePathConstants.DRIVER_URL);
            };

            $scope.update = function () {
                DriverRepositoryService.update($scope.driver);
                $location.url(RoutePathConstants.DRIVER_URL);
            };

            $scope.close = function () {
                $location.url(RoutePathConstants.DRIVER_URL);
            };

        }]);