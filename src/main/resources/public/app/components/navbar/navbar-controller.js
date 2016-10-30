route.controller('NavbarController', ['$scope', '$location', function($scope, $location){
    $scope.navList = [
        {name: 'Deliveries', url:'/deliveries', css: ''},
        {name: 'Drivers', url:'/drivers', css: ''},
        {name: 'Location', url:'/locations', css: ''}
    ];

    var url = $location.url();
    $scope.navList.forEach(function(nav){
        if (url.indexOf(nav.name.toLowerCase()) > 0){
           nav.css = 'uk-active'
       }
    });

    $scope.navClick = function(clickedNav){
        $scope.navList.forEach(function(nav){
            if (nav.name === clickedNav.name){
                nav.css = 'uk-active';
                $location.url(clickedNav.url);
            } else {
                nav.css = '';
            }
        })
    }

}]);