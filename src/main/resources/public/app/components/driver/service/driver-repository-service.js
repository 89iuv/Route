route.service('DriverRepositoryService', ['RouteApiConstants', 'ComponentRepository', function (RouteApiConstants, ComponentRepository) {
    var url = RouteApiConstants.DRIVER_URL;
    var pageSize = 20;
    var state = {
        selected: {},
        data: [],
        totalPages: 0,
        number: 0
    };

    this.state = state;

    this.findAll = function (number) {
        return findAllInPage(number);
    };

    this.findOne = function (id) {
        return ComponentRepository.findOne(url, {id: id}).then(function (data) {
            state.selected = data;
        });
    };

    this.save = function (location) {
        ComponentRepository.save(url, location).then(function (data) {
            state.push(data);
        });
    };

    this.update = function (location) {
        ComponentRepository.update(url, location).then(function (data) {
            for (var i = 0; i < state.length; i++) {
                if (state[i].id === location.id) {
                    state[i] = data;
                }
            }
        });
    };

    this.delete = function (location) {
        ComponentRepository.delete(url, location).then(function () {
            findAllInPage(state.number);
        });
    };

    function findAllInPage(number) {
        return ComponentRepository.findAll(url + '?size=' + pageSize + '&sort=id,desc&page=' + number).then(function (data) {
            state.totalPages = data.totalPages;
            state.number = data.number;
            state.data = data.content;
        });
    }

}]);