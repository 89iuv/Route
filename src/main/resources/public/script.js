var route = angular
    .module('Route', ['ngRoute', 'ngSanitize'])
    .run(['LocationRepositoryService', 'DriverRepositoryService', 'TransportRepositoryService', function(LocationRepositoryService, DriverRepositoryService, TransportRepositoryService){
        console.log("Start Route");

    }]);