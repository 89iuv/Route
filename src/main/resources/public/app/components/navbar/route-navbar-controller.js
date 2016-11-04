route.controller('RouteNavbarController', ['$scope', '$location', 'RouteTextConstant', 'RouteConfigConstant', function($scope, $location, RouteTextConstant, RouteConfigConstant){
    $scope.navList = [
        {name: _.capitalize(RouteTextConstant.TRANSPORT), url: RouteConfigConstant.TRANSPORT_URL, css: ''},
        {name: _.capitalize(RouteTextConstant.DRIVER), url: RouteConfigConstant.DRIVER_URL, css: ''},
        {name: _.capitalize(RouteTextConstant.LOCATION), url: RouteConfigConstant.LOCATION_URL, css: ''}
    ];

    var url = $location.url();
    $scope.navList.forEach(function(nav){
        if (url.toLowerCase().indexOf(nav.name.toLowerCase()) > 0){
           nav.css = 'uk-active'
       }
    });

    $scope.navClick = function(clickedNav){
        $scope.navList.forEach(function(nav){
            if (nav.name.toLowerCase() === clickedNav.name.toLowerCase()){
                nav.css = 'uk-active';
                $location.url(clickedNav.url);
            } else {
                nav.css = '';
            }
        })
    }

}]);