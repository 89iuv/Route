route.controller('TransportModalController', ['$scope', 'RouteModalService', 'RouteModalConstant', '$http', '$timeout', 'RouteService', 'RouteConstant', function ($scope, RouteModalService, ModalConstant, $http, $timeout, RouteService, RouteConstant) {
    $scope.state = RouteService.state;
    $scope.properties = ModalService.properties;

    console.log('start');

    $scope.CONSTANT = {
        ADD: ModalConstant.TYPE.ADD,
        EDIT: ModalConstant.TYPE.EDIT
    };

    var drivers = [];
    function updateDrivers() {
        drivers = angular.copy($scope.state[RouteConstant.DRIVER.name]);
        drivers.forEach(function (driver) {
            driver.value = driver.name + ' ' + driver.car + ' ' + driver.company;
        });
    }

    $scope.$watch('state.' + RouteConstant.DRIVER.name, function (newValue, oldValue) {
        if (newValue != oldValue) {
            updateDrivers();
        }

    }, true);

    updateDrivers();
    UIkit.autocomplete($('#transportName'), {'source': drivers, 'minLength': 1, 'delay': 0});



    $scope.properties.data.date = moment().format("DD/MM/YYYY");

    $scope.properties.data.locations = [
        {name: '', deliveryPoint: '', gps: ''}
    ];


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

    $scope.save = function () {
        RouteModalConstant.closeAndResolve();
    };

    $scope.update = function () {
        RouteModalConstant.closeAndResolve();
    };

    $scope.close = function () {
        RouteModalConstant.closeAndReject();
    };

}]);