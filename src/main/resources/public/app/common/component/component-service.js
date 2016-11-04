route.service('ComponentService', ['$http', '$q', 'RouteService', 'RouteConstant', function ($http, $q, RouteService, RouteConstant) {

    var url =  function(component) {
        return {
            findAll: RouteConstant.REST_API_URL + '/' + component.plural,
            save: RouteConstant.REST_API_URL + '/' + component.name,
            delete: RouteConstant.REST_API_URL + '/' + component.name
        }
    };

    this.findAll = function(component){
        var defer = $q.defer();

        $http.get(url(component).findAll).then(function (response) {
            RouteService.state[component.name] = response.data;
            defer.resolve(response.data);

        }, function (error) {
            console.log(error);
            defer.reject();
        });

        return defer.promise;
    };

    this.save = function(component, data){
        var defer = $q.defer();

        $http.post(url(component).save, data).then(function (response) {
            RouteService.state[component.name].push(response.data);
            defer.resolve(response.data);

        }, function (error) {
            console.log(error);
            defer.reject();
        });

        return defer.promise;
    };

    this.update = function(component, object){
        var defer = $q.defer();

        $http.post(url(component).save, object).then(function (response) {
            for (var i = 0; i < RouteService.state[component.name].length; i++){
                if (RouteService.state[component.name][i].id === object.id){
                    RouteService.state[component.name][i] = response.data;
                }
            }

            defer.resolve(response.data);

        }, function (error) {
            console.log(error);
            defer.reject();
        });

        return defer.promise;
    };

    this.delete = function(component, object){
        var defer = $q.defer();

        $http.delete(url(component).delete + "/" + object.id).then(function () {
            var index = RouteService.state[component.name].indexOf(object);
            if (index > -1) {
                RouteService.state[component.name].splice(index, 1);
            }
            defer.resolve()

        }, function (error) {
            console.log(error);
            defer.reject();
        });

        return defer.promise;
    };

}]);