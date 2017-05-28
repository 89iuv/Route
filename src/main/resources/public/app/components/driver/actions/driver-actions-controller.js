route.controller('DriverActionsController',
    ['$scope', '$location', '$routeParams', 'RouteTextConstants', 'RoutePathConstants', 'DriverRepositoryService',
        function ($scope, $location, $routeParams, RouteTextConstants, RoutePathConstants, DriverRepositoryService) {
            $scope.TEXT = RouteTextConstants;
            $scope.isNewDriver = $routeParams.id === 'new';

            if ($scope.isNewDriver) {
                $scope.driver = {};
            } else {
                DriverRepositoryService.findOne($routeParams.id).then(function () {
                    $scope.driver = DriverRepositoryService.state.selected;
                })
            }

            $scope.delete = function () {
                DriverRepositoryService.delete($scope.driver);
                window.history.back();
            };

            $scope.save = function () {
                DriverRepositoryService.save($scope.driver);
            };

            $scope.saveAndClose = function () {
                DriverRepositoryService.save($scope.driver);
                window.history.back();
            };

            $scope.update = function () {
                DriverRepositoryService.update($scope.driver);
                window.history.back();
            };

            $scope.close = function () {
                window.history.back();
            };

        }]);