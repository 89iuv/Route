route.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/transport', {
            templateUrl: 'app/common/component/component-partial.html',
            controller: 'TransportController'

        }).when('/driver', {
            templateUrl: 'app/components/driver/view/driver-partial.html',
            controller: 'DriverController'

        }).when('/location', {
            templateUrl: 'app/components/location/view/location-partial.html',
            controller: 'LocationController'

        }).otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);