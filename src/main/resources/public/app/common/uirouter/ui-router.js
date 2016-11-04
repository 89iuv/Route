route.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/transports', {
            templateUrl: 'app/common/component/component-partial.html',
            controller: 'TransportsController'

        }).when('/drivers', {
            templateUrl: 'app/common/component/component-partial.html',
            controller: 'DriversController'

        }).when('/locations', {
            templateUrl: 'app/common/component/component-partial.html',
            controller: 'LocationsController'

        }).otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);