route.service('ComponentService', ['$http', function ($http) {

    this.findAll = function (componenet) {
        return $http.get(componenet.url.findAll).then(function (response) {
            console.log(response.data);
            componenet.data = response.data;

        }, function (error) {
            console.log(error);
        });
    };

    this.save = function(component, data){
        return $http.post(component.url.save, data).then(function (response) {
            component.data.push(response.data);

        }, function (error) {
            console.log(error);
        });
    };

    this.delete = function(component, object){
        return $http.delete(component.url.delete + "/" + object.id).then(function () {
            var index = component.data.indexOf(object);
            if (index > -1) {
                component.data.splice(index, 1);
            }

        }, function (error) {
            console.log(error);
        });
    };

    this.update = function (component, object) {
        return $http.post(component.url.save, object).then(function (response) {
            for (var i = 0; i < component.data.length; i++){
                if (component.data[i].id === object.id){
                    component.data[i] = response.data;
                }
            }

        }, function (error) {
            console.log(error);
        });
    };

}]);