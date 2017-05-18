route.controller('RouteNavbarController',
    ['$scope', '$location', 'RouteTextConstants', 'RoutePathConstants',
        function($scope, $location, RouteTextConstants, RoutePathConstants){
    $scope.navList = [
        {
            name: RouteTextConstants.TRANSPORT,
            url: RoutePathConstants.TRANSPORT_URL,
            css: '',
            class: 'glyphicon glyphicon-road'
        },
        {
            name: RouteTextConstants.DRIVER,
            url: RoutePathConstants.DRIVER_URL,
            css: '',
            class: 'glyphicon glyphicon-user'
        },
        {
            name: RouteTextConstants.LOCATION,
            url: RoutePathConstants.LOCATION_URL,
            css: '',
            class: 'glyphicon glyphicon-home'
        },
        {
            name: RouteTextConstants.LOG_OUT,
            url: "",
            css: '',
            class: 'glyphicon glyphicon-off'
        }
    ];

    var url = $location.url();
    $scope.navList.forEach(function(nav){
        if (url.toLowerCase().indexOf(nav.name.toLowerCase()) > 0){
           nav.css = 'active'
       }
    });

    $scope.navClick = function(clickedNav){
        $scope.navList.forEach(function(nav){
            if (nav.name.toLowerCase() === clickedNav.name.toLowerCase()){
                nav.css = 'active';
                $location.url(clickedNav.url);
            } else {
                nav.css = '';
            }
        })
    }

}]);