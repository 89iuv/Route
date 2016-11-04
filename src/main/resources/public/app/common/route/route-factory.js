route.factory('RouteFactory', [function(){
    return {
        capitalize: function(name) {
            name = name.charAt(0).toUpperCase() + name.slice(1);
            return name;
        }
    };
}]);