route.controller('LocationViewController',
    ['$scope', '$location', '$routeParams', 'RouteTextConstants', 'LocationRepositoryService', 'RoutePathConstants',
        function ($scope, $location, $routeParams, RouteTextConstants, LocationRepositoryService, RoutePathConstants) {
            var currentPathPage = Number($routeParams.page);

            $scope.TEXT = RouteTextConstants;
            $scope.state = LocationRepositoryService.state;
            $scope.repoSearch = LocationRepositoryService.repoSearch;
            $scope.pagesList = [];
            $scope.search = '';

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

            LocationRepositoryService.findAll(currentPathPage).then(function(){
                $scope.$watch('state.totalPages', function () {
                    $scope.pagesList = [];

                    var showInAll = function(){
                        for (var i = 1; i <= $scope.state.totalPages; i++){
                            if (currentPathPage === i){
                                $scope.pagesList.push({
                                    index: i,
                                    class: 'active'
                                })
                            } else {
                                $scope.pagesList.push({
                                    index : i,
                                    class: ''
                                })
                            }
                        }
                    };
                    var showInFirst = function(){
                        for (var i = 1; i <= 9; i++){
                            if (currentPathPage === i){
                                $scope.pagesList.push({
                                    index: i,
                                    class: 'active'
                                })
                            } else {
                                $scope.pagesList.push({
                                    index : i,
                                    class: ''
                                })
                            }
                        }

                        $scope.pagesList.push({
                            index : '...',
                            class: 'disabled'
                        });

                        $scope.pagesList.push({
                            index : $scope.state.totalPages,
                            class: ''
                        })

                    };
                    var showInMiddle = function(){
                        $scope.pagesList.push({
                            index : 1,
                            class: ''
                        });

                        $scope.pagesList.push({
                            index : '...',
                            class: 'disabled'
                        });

                        for (var i = currentPathPage-3; i <= currentPathPage+3; i++){
                            if (currentPathPage === i){
                                $scope.pagesList.push({
                                    index: i,
                                    class: 'active'
                                })
                            } else {
                                $scope.pagesList.push({
                                    index : i,
                                    class: ''
                                })
                            }
                        }

                        $scope.pagesList.push({
                            index : '...',
                            class: 'disabled'
                        });

                        $scope.pagesList.push({
                            index : $scope.state.totalPages,
                            class: ''
                        });

                    };
                    var showInLast = function(){
                        $scope.pagesList.push({
                            index : 1,
                            class: ''
                        });

                        $scope.pagesList.push({
                            index : '...',
                            class: 'disabled'
                        });

                        for (var i = $scope.state.totalPages - 8; i <= $scope.state.totalPages; i++){
                            if (currentPathPage === i){
                                $scope.pagesList.push({
                                    index: i,
                                    class: 'active'
                                })
                            } else {
                                $scope.pagesList.push({
                                    index : i,
                                    class: ''
                                })
                            }
                        }

                    };

                    if ($scope.state.totalPages < 11) {
                        showInAll();

                    } else if($scope.state.currentPage <= 5 ) {
                        showInFirst();

                    } else if ($scope.state.currentPage > 5 && $scope.state.currentPage < $scope.state.totalPages - 5 ) {
                        showInMiddle();

                    } else {
                        showInLast();

                    }

                });

                $scope.$watch('state.numberOfElements', function(){
                    if ($scope.state.numberOfElements === 0 && currentPathPage !== 1){
                        $scope.changePage($scope.state.totalPages);

                    }
                });
            });

            $scope.$watch('search', function(newVal, oldVal){
                if (newVal !== oldVal){
                    LocationRepositoryService.searchByName(newVal.toString());
                    LocationRepositoryService.searchByDeliveryPoint(newVal.toString());
                    LocationRepositoryService.searchByGps(newVal.toString());
                }
            });

            $scope.moreByName = function(){
                LocationRepositoryService.searchByNameMore();
            };

            $scope.moreByDeliveryPoint = function(){
                LocationRepositoryService.searchByDeliveryPointMore();
            };

            $scope.moreByGps = function(){
                LocationRepositoryService.searchByGpsMore();
            }

        }]);