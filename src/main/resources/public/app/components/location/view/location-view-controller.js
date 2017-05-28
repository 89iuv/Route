route.controller('LocationViewController',
    ['$scope', '$location', '$routeParams', 'RouteTextConstants', 'LocationRepositoryService', 'RoutePathConstants', 'RoutePagingService',
        function ($scope, $location, $routeParams, RouteTextConstants, LocationRepositoryService, RoutePathConstants, RoutePagingService) {
            var currentPage = Number($routeParams.page);

            $scope.TEXT = RouteTextConstants;
            $scope.state = LocationRepositoryService.state;
            $scope.pagesList = [];
            $scope.search = '';

            LocationRepositoryService.findAll(currentPage - 1).then(function(){
                $scope.pagesList = RoutePagingService.getPageArray(currentPage, $scope.state.totalPages);
            });

            $scope.changePage = function (pageNumber){
                $location.url(RoutePathConstants.LOCATION_PAGE_URL + '/' + pageNumber);
            };

            $scope.add = function () {
                $location.url(RoutePathConstants.LOCATION_URL + '/new');
            };

            $scope.edit = function (location) {
                $location.url(RoutePathConstants.LOCATION_URL + '/' + location.id);
            };

            $scope.delete = function (location) {
                LocationRepositoryService.delete(location);
            };

        }]);