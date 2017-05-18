var route = angular
    .module('Route', ['ngRoute', 'ngSanitize'])
    .run(['LocationRepositoryService', 'DriverRepositoryService', 'TransportRepositoryService', function(LocationRepositoryService, DriverRepositoryService, TransportRepositoryService){
        LocationRepositoryService.findAll();
        DriverRepositoryService.findAll();
        TransportRepositoryService.findAll();

    }]);