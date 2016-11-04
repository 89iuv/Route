route.controller('NavbarController', ['$scope', '$location', 'RouteConstant', 'RouteFactory', function($scope, $location, RouteConstant, RouteFactory){
    $scope.navList = getNavList();

    function getNavList(){
        var navList = [];
        RouteConstant.COMPONENTS.forEach(function(component){
            navList.push({name: RouteFactory.capitalize(component.plural), url: '/' + component.plural, css: ''})
        });

        return navList;
    }

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