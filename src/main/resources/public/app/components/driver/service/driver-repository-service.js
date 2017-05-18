route.service('DriverRepositoryService',
    ['RouteApiConstants', 'ComponentRepository',
        function(RouteApiConstants, ComponentRepository){
    var url = RouteApiConstants.DRIVER_URL;
    var state = [];

    this.state = state;

    this.findAll = function(){
        ComponentRepository.findAll(url).then(function(data){
            state.splice(0, state.length);
            data.forEach(function(location){
                state.push(location)
            });
        });
    };

    this.save = function(location){
        ComponentRepository.save(url, location).then(function(data){
            state.push(data);
        });
    };

    this.update = function(location){
        ComponentRepository.update(url, location).then(function(data){
            for (var i = 0; i < state.length; i++){
                if (state[i].id === location.id){
                    state[i] = data;
                }
            }
        });
    };

    this.delete = function(location){
        ComponentRepository.delete(url, location).then(function(){
            var index = state.indexOf(location);
            if (index > -1) {
                state.splice(index, 1);
            }
        });
    };


}]);