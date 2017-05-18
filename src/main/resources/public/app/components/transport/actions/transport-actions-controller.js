route.controller('TransportActionsController',
    ['$scope', '$http', '$timeout', '$location', 'RouteTextConstants', 'RoutePathConstants', 'DriverRepositoryService', 'LocationRepositoryService', 'TransportRepositoryService',
        function ($scope, $http, $timeout, $location, RouteTextConstants, RoutePathConstants, DriverRepositoryService, LocationRepositoryService, TransportRepositoryService) {
            $scope.TEXT = RouteTextConstants;

            //driver
            var searchDriverData = [];
            DriverRepositoryService.state.forEach(function (driver) {
                var enhancedDriver = angular.copy(driver);
                enhancedDriver.text = enhancedDriver.id + ' ' + enhancedDriver.name;
                searchDriverData.push(enhancedDriver);
            });

            function templateDriver(driver) {
                if (!driver.id) {
                    return driver.text;
                }
                var $driver = $([
                        '<div><strong>' + driver.name + '</strong></div>',
                        '<div>Id: ' + driver.id + ', Car: ' + driver.car + ', Company: ' + driver.company + '</div>',
                    ].join('')
                );
                return $driver;
            }

            var $searchDriverSelect = $("#search-driver-id");
            $searchDriverSelect.select2({
                theme: "bootstrap",
                placeholder: "Search for driver id or driver name.",
                allowClear: true,
                data: searchDriverData,
                templateResult: templateDriver
            });

            $searchDriverSelect.on("select2:select", function (e) {
                //angularjs hack
                $timeout(function () {
                    $scope.driver = _.find(DriverRepositoryService.state, function (driver) {
                        return driver.id.toString() === e.params.data.id
                    });
                }, 0);
                $searchDriverSelect.val('').trigger('change');
            });

            //date
            $scope.date = moment();
            var $datepicker = $('#datepicker-id');
            $datepicker.datetimepicker({
                format: 'DD/MM/YYYY',
                defaultDate: $scope.date
            });

            $datepicker.on('dp.change', function (e) {
                $timeout(function () {
                    $scope.date = e.date;
                }, 0);
            });

            //locations
            $scope.columns = [
                {value: 'id', text: RouteTextConstants.ID},
                {value: 'name', text: RouteTextConstants.NAME},
                {value: 'deliveryPoint', text: RouteTextConstants.DELIVERY_POINT},
                {value: 'gps', text: RouteTextConstants.GPS}
            ];
            $scope.locations = [];

            var searchLocationData = [];
            LocationRepositoryService.state.forEach(function (location) {
                var enhancedLocation = angular.copy(location);
                enhancedLocation.text = enhancedLocation.id + ' ' + enhancedLocation.name;
                searchLocationData.push(enhancedLocation);
            });

            function templateLocation(location) {
                if (!location.id) {
                    return location.text;
                }
                var $location = $([
                    '<div><strong>' + location.name + '</strong></div>',
                    '<div>Id: ' + location.id + ', Delivery point: ' + location.deliveryPoint + ', GPS: ' + location.gps + '</div>'
                    ].join('')
                );
                return $location;
            }

            var $searchLocationSelect = $("#search-location-id");
            $searchLocationSelect.select2({
                theme: "bootstrap",
                placeholder: "Search for location id or location name.",
                allowClear: true,
                data: searchLocationData,
                templateResult: templateLocation

            });

            $searchLocationSelect.on("select2:select", function (e) {
                //angularjs hack
                $timeout(function () {
                    var findLocationInLocations = _.find($scope.locations, function (location) {
                        return location.id.toString() === e.params.data.id
                    });
                    var isLocationAdded = (findLocationInLocations !== undefined);
                    if (!isLocationAdded) {
                        var location = _.find(LocationRepositoryService.state, function (location) {
                            return location.id.toString() === e.params.data.id
                        });
                        $scope.locations.push(location);
                    }
                }, 0);
                $searchLocationSelect.val('').trigger('change');
            });

            $scope.removeLocation = function (location) {
                var index = $scope.locations.indexOf(location);
                if (index > -1) {
                    $scope.locations.splice(index, 1);
                }
            };

            //actions
            $scope.save = function () {
                var transport = {
                    driver: $scope.driver,
                    date: $scope.date.format("YYYY-MM-DD"),
                    locations: $scope.locations
                };

                TransportRepositoryService.save(transport);
                console.log(transport);
                $location.url(RoutePathConstants.TRANSPORT_URL);
            };

            $scope.close = function () {
                $location.url(RoutePathConstants.TRANSPORT_URL);
            }

        }]);