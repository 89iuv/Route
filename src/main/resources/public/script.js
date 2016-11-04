var route = angular
    .module('Route', ['ngRoute', 'ngSanitize'])
    .run(['LocationRepository', 'DriverRepository', function(LocationRepository, DriverRepository){
        LocationRepository.findAll();
        DriverRepository.findAll();

    }]);