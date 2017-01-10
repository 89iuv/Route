route.controller('TransportModalController', ['$scope', '$http', '$timeout',  'RouteModalService', 'RouteTextConstant', 'DriverRepository', 'LocationRepository', function ($scope, $http, $timeout, RouteModalService, RouteTextConstant, DriverRepository, LocationRepository) {
    $scope.state = RouteModalService.properties;
    $scope.TEXT = {
        ADD: _.capitalize(RouteTextConstant.ADD),
        EDIT: _.capitalize(RouteTextConstant.EDIT),
        UPDATE: _.capitalize(RouteTextConstant.UPDATE),
        CLOSE: _.capitalize(RouteTextConstant.CLOSE),
        SAVE: _.capitalize(RouteTextConstant.SAVE),
        CREATE: _.capitalize(RouteTextConstant.CREATE),

        ID: _.capitalize(RouteTextConstant.ID),
        DRIVER: _.capitalize(RouteTextConstant.DRIVER),
        DISTANCE: _.capitalize(RouteTextConstant.DISTANCE),
        DATE: _.capitalize(RouteTextConstant.DATE),
        LOCATIONS: _.capitalize(RouteTextConstant.LOCATIONS),


        TITLE: RouteTextConstant.TRANSPORT
    };

    $scope.CONSTANT = {
        ADD: RouteTextConstant.ADD,
        EDIT: RouteTextConstant.EDIT
    };

    $scope.save = function(){

        angular.element(jQuery('#transport-driver-name')).triggerHandler('input');
        angular.element(jQuery('#transport.date')).triggerHandler('input');


        $scope.transport.locations.forEach(function(){

        });

        for (var i = 0; i<$scope.transport.locations.length; i++){
            angular.element(jQuery('#transport-locations' + i)).triggerHandler('input');
        }


        console.log($scope.transport);
        // RouteModalService.closeAndResolve();
    };

    $scope.update = function(){
        RouteModalService.closeAndResolve();
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

    UIkit.autocomplete($('#transportName'), {'source': drivers, 'minLength': 1, 'delay': 0});


    $scope.state.data.locations = [{}];


    var index = $scope.state.data.locations.length;
    $scope.add = function () {
        $scope.state.data.locations.push({});

        //hacky way needed for angularjs ng-repeat
        $timeout(function(){
            console.log($('#transportLocation' + (index + 1)));
            UIkit.autocomplete($('#transportLocation' + (index + 1)), {'source': locations, 'minLength': 1, 'delay': 0});
            index++;
        },0);

    };

    $scope.remove = function () {
        $scope.state.data.locations.pop();
        index--;
    };

    var locations = [];
    $scope.locationRepository = LocationRepository.state;
    function updateLocations() {
        locations = angular.copy(LocationRepository.state);
        locations.forEach(function (location) {
            location.value = location.name + ' ' + location.deliveryPoint + ' ' + location.gps;

        });
    }

    $scope.$watch('locationRepository', function (newValue, oldValue) {
        if (newValue != oldValue) {
            updateLocations();
        }

    }, true);

    updateLocations();
    //hacky way needed for angularjs ng-repeat
    $timeout(function(){
        UIkit.autocomplete($('#transportLocation1'), {'source': locations, 'minLength': 1, 'delay': 0});
    },0);

    $scope.transport = {
        driver: {name: ''},
        date: moment().format("DD/MM/YYYY"),
        locations: [
            {name: ''}
        ]
    };

    /*
    $scope.state = RouteService.state;
    $scope.properties = ModalService.properties;


    var locations = [];
    function updateLocations() {
        locations = angular.copy($scope.state[RouteConstant.LOCATION.name]);
        locations.forEach(function (location) {
            location.value = location.name + ' ' + location.deliveryPoint + ' ' + location.gps;

        });
    }

    $scope.$watch('state.' + RouteConstant.LOCATION.name, function (newValue, oldValue) {
        if (newValue != oldValue) {
            updateLocations();
        }

    }, true);

    updateLocations();
    //hacky way needed for angularjs ng-repeat
    $timeout(function(){
        UIkit.autocomplete($('#transportLocation1'), {'source': locations, 'minLength': 1, 'delay': 0});
    },0);



    var index = $scope.properties.data.locations.length;
    $scope.add = function () {
        $scope.properties.data.locations.push({
            value: '',
            name: '',
            deliveryPoint: '',
            gps: ''

        });

        //hacky way needed for angularjs ng-repeat
        $timeout(function(){
            console.log($('#transportLocation' + index));
            UIkit.autocomplete($('#transportLocation' + index), {'source': locations, 'minLength': 1, 'delay': 0});
            index++;
        },0);

    };

    $scope.remove = function () {
        $scope.properties.data.locations.pop();
        index--;
    };
*/
}]);