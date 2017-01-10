var route = angular
    .module('Route', ['ngRoute', 'ngSanitize'])
    .run(['LocationRepository', 'DriverRepository', 'TransportRepository', function(LocationRepository, DriverRepository, TransportRepository){
        LocationRepository.findAll();
        DriverRepository.findAll();
        TransportRepository.findAll();

    }]);