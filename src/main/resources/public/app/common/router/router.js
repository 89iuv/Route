route.config(['$routeProvider', 'RoutePathConstants', function ($routeProvider, RoutePathConstants) {
    $routeProvider
        .when(RoutePathConstants.TRANSPORT_URL, {
            templateUrl: 'app/components/transport/view/transport-view-partial.html',
            controller: 'TransportViewController'

        }).when(RoutePathConstants.TRANSPORT_URL + '/:id', {
        templateUrl: 'app/components/transport/actions/transport-actions-partial.html',
        controller: 'TransportActionsController'

        }).when(RoutePathConstants.TRANSPORT_REPORT_URL + '/:id', {
            templateUrl: 'app/components/transport/report/transport-report-partial.html',
            controller: 'TransportReportController'

        }).when(RoutePathConstants.DRIVER_URL, {
            templateUrl: 'app/components/driver/view/driver-view-partial.html',
            controller: 'DriverViewController'

        }).when(RoutePathConstants.DRIVER_URL + '/:id', {
            templateUrl: 'app/components/driver/actions/driver-actions-partial.html',
            controller: 'DriverActionsController'

        }).when(RoutePathConstants.LOCATION_URL, {
            templateUrl: 'app/components/location/view/location-view-partial.html',
            controller: 'LocationViewController'

        }).when(RoutePathConstants.LOCATION_URL + '/:id', {
            templateUrl: 'app/components/location/actions/location-actions-partial.html',
            controller: 'LocationActionsController'

        }).otherwise({
            redirectTo: '/'
        });
}]);