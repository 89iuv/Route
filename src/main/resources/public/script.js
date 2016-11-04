var route = angular
    .module('Route', ['ngRoute', 'ngSanitize'])
    .run(['LocationRepository', function(LocationRepository){
        LocationRepository.findAll();

    }]);