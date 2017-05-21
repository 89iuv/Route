route.service('DriverRepositoryService',
    ['RouteApiConstants', 'ComponentRepository',
        function(RouteApiConstants, ComponentRepository){
    var url = RouteApiConstants.DRIVER_URL;
    var state = {
        data: [],
        totalPages: 0,
        number: 0
    };

    this.state = state;

    this.findAll = function(number){
        return ComponentRepository.findAll(url + '?size=10&page=' + number).then(function(data){
            state.totalPages = data.totalPages;
            state.number = data.number;
            state.data = data.content;
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