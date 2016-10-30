route.service('ComponentService', ['$http', function ($http) {

    this.findAll = function (componenet) {
        return $http.get(componenet.url.findAll).then(function (response) {
            componenet.data = response.data;
            componenet.columns = getColumns(componenet.data);
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
        return $http.put(component.url.save, object).then(function (response) {
            for (var i = 0; i < component.date.length; i++){
                if (component.date.length[i].id === object.id){
                    component.data[index] = response.data;

                }
            }

        }, function (error) {
            console.log(error);
        });
    };

    function getColumns(data) {
        var columns = [];

        if (data.length > 0) {
            for (var key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                    key = key.charAt(0).toUpperCase() + key.slice(1);
                    columns.push(key);
                }
            }
        }

        return columns;
    }

}]);