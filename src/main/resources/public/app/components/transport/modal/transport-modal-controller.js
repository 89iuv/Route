route.controller('TransportModalController', ['$scope', '$http', '$timeout',  'RouteModalService', 'RouteTextConstant', 'DriverRepository', 'LocationRepository', function ($scope, $http, $timeout, RouteModalService, RouteTextConstant, DriverRepository, LocationRepository) {
    $scope.state = RouteModalService.properties;
    $scope.CONSTANT = RouteTextConstant;

    $scope.transport = {
        driver: {
            id: null
        },
        date: moment().format("DD/MM/YYYY"),
        locations: [
            {
                id: null
            }
        ]
    };

    $scope.state.data = {
        driver: {
            id: null,
            name: null,
            car: null,
            company: null
        },
        date: null,
        locations: [
            {
                id: null,
                name: null,
                deliveryPoint: null,
                gps: null
            }
        ]
    };

    $scope.save = function(){
        RouteModalService.closeAndResolve();
    };

    $scope.update = function(){
        console.log("fake transport update");
        // RouteModalService.closeAndResolve();
    };

    $scope.close = function(){
        RouteModalService.closeAndReject();
    };

    $scope.driverResource = DriverRepository.state;
    var drivers = [];
    function updateDrivers() {
        drivers = angular.copy(DriverRepository.state);
        drivers.forEach(function (driver) {
            driver.value = driver.name + ' ' + driver.car + ' ' + driver.company;
        });
    }
    updateDrivers();

    $scope.$watch('driverResource', function (newValue, oldValue) {
        if (newValue != oldValue) {
            updateDrivers();
        }
    }, true);

    var driverAutocomplete = UIkit.autocomplete($('#transport-driver'), {'source': drivers, 'minLength': 1, 'delay': 0});
    driverAutocomplete.on('selectitem.uk.autocomplete', function(event, data){
        //angularjs hacky method
        $timeout(function(){
            $scope.transport.driver.id = "";
            setDriver(data.value);
        },0);
    });

    function setDriver(id){
        DriverRepository.state.forEach(function(driver){
            if (driver.id === id){
                $scope.state.data.driver = angular.copy(driver);
                $scope.$apply();
            }
        });
    }

    $scope.$watch('transport.date', function (newValue, oldValue) {
        if (newValue != oldValue) {
            updateDate()
        }
    }, true);

    $('#transport-date').on("hide.uk.datepicker", function(){
       updateDate()
    });

    function updateDate(){
        $scope.state.data.date = moment($scope.transport.date, "DD/MM/YYYY").format("YYYY-MM-DD");
        console.log("date change");
        console.log($scope.transport.date);
        console.log($scope.state.data);
    }

    $scope.locationResource = LocationRepository.state;
    var locations = [];
    function updateLocations() {
        locations = angular.copy(LocationRepository.state);
        locations.forEach(function (location) {
            location.value = location.name + ' ' + location.deliveryPoint + ' ' + location.gps;
        });
    }
    updateLocations();

    $scope.$watch('locationResource', function (newValue, oldValue) {
        if (newValue != oldValue) {
            updateLocations();
        }
    }, true);

    //hacky angularjs run after ng-repeat is run
    $timeout(function(){
        var locationAutocomplete = UIkit.autocomplete($('#transport-location-0'), {'source': locations, 'minLength': 1, 'delay': 0});
        locationAutocomplete.on('selectitem.uk.autocomplete', function(event, data){
            //angularjs hacky method
            $timeout(function(){
                var locationNumber = getlocationPosFromEvent(event);
                $scope.transport.locations[locationNumber].id = "";
                setLocation(locationNumber, data.value);
            },0);
        });
    },0);

    function getlocationPosFromEvent(event){
        var posId = event.currentTarget.id;
        var split = posId.split("-");
        return Number(split[2]);
    }

    function setLocation(locationNumber, id){
        LocationRepository.state.forEach(function(location){
            if (location.id === id){
                $scope.state.data.locations[locationNumber].id = location.id;
                $scope.state.data.locations[locationNumber].name = location.name;
                $scope.state.data.locations[locationNumber].deliveryPoint = location.deliveryPoint;
                $scope.state.data.locations[locationNumber].gps = location.gps;

                $scope.$apply();
            }
        })

    }

    $scope.add = function(){
        var location =  {
            id: null,
            name: null,
            deliveryPoint: null,
            gps: null
        };

        $scope.state.data.locations.push(location);

        $timeout(function(){
            var locationAutocomplete = UIkit.autocomplete($('#transport-location-' + ($scope.state.data.locations.length - 1)), {'source': locations, 'minLength': 1, 'delay': 0});
            locationAutocomplete.on('selectitem.uk.autocomplete', function(event, data){
                //angularjs hacky method
                $timeout(function(){
                    var locationNumber = getlocationPosFromEvent(event);
                    $scope.transport.locations[locationNumber].id = "";
                    setLocation(locationNumber, data.value);
                },0);
            });
        },0);

    };

    $scope.remove = function(){
        if ($scope.state.data.locations.length > 1){
            $scope.state.data.locations.pop();
        }
    };

}]);