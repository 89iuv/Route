route.controller('DriverViewController',
    ['$scope', '$location', '$routeParams', 'RoutePagingService', 'RouteTextConstants', 'RoutePathConstants', 'DriverRepositoryService',
        function ($scope, $location, $routeParams, RoutePagingService, RouteTextConstants, RoutePathConstants, DriverRepositoryService) {
            var currentPage = Number($routeParams.page);

            $scope.TEXT = RouteTextConstants;
            $scope.state = DriverRepositoryService.state;
            $scope.pagesList = [];

            DriverRepositoryService.findAll(currentPage - 1).then(function(){
                $scope.pagesList = RoutePagingService.getPageArray(currentPage, $scope.state.totalPages);

            });

            $scope.changePage = function(pageNumber){
                $location.url(RoutePathConstants.DRIVER_PAGE_URL + "/" + pageNumber);
            };

            $scope.add = function () {
                $location.url(RoutePathConstants.DRIVER_URL + "/new");
            };

            $scope.edit = function (driver) {
                $location.url(RoutePathConstants.DRIVER_URL + '/' + driver.id);
            };

            $scope.delete = function (driver) {
                DriverRepositoryService.delete(driver);
            };

        }]);