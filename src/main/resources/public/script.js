var route = angular
    .module('Route', ['ngRoute', 'ngSanitize'])
    .config([function(){
        console.log("Config Route");
    }])
    .run([function(){
        console.log("Start Route");
    }]);