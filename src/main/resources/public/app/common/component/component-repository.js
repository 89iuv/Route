route.service('ComponentRepository', ['$http', '$q', function ($http, $q) {

    this.findAll = function(url){
        var defer = $q.defer();

        $http.get(url).then(function (response) {
            defer.resolve(response.data);

        }, function (error) {
            catchError(error);
            defer.reject();
        });

        return defer.promise;
    };

    this.findOne = function(url, object){
        var defer = $q.defer();

        $http.get(url + "/" + object.id).then(function (response) {
            defer.resolve(response.data);

        }, function (error) {
            catchError(error);
            defer.reject();
        });

        return defer.promise;
    };

    this.save = function(url, object){
        var defer = $q.defer();

        $http.post(url, object).then(function (response) {
            defer.resolve(response.data);

        }, function (error) {
            catchError(error);
            defer.reject();
        });

        return defer.promise;
    };

    this.update = function(url, object){
        var defer = $q.defer();

        $http.post(url, object).then(function (response) {
            defer.resolve(response.data);

        }, function (error) {
            catchError(error);
            defer.reject();
        });

        return defer.promise;
    };

    this.delete = function(url, object){
        var defer = $q.defer();

        $http.delete(url + "/" + object.id).then(function () {
            defer.resolve()

        }, function (error) {
            catchError(error);
            defer.reject();
        });

        return defer.promise;
    };

    this.search = function(url){
        var defer = $q.defer();

        $http.get(url).then(function (response) {
            defer.resolve(response.data)

        }, function (error) {
            catchError(error);
            defer.reject();
        });

        return defer.promise;
    };

    function catchError(error){
        console.log(error);

    }

}]);