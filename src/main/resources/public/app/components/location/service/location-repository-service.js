route.service('LocationRepositoryService',
    ['RouteApiConstants', 'ComponentRepository',
        function (RouteApiConstants, ComponentRepository) {
            var url = RouteApiConstants.LOCATION_URL;
            var state = {
                selected: {},
                data: [],
                totalPages: 0,
                currentPage: 0,
                numberOfElements: 0,
                totalElements: 0,
                search: {
                    byName: [],
                    byDeliveryPoint: [],
                    byGps: []
                }
            };

            var repoSearch = {
                byName: {
                    query: '',
                    data: [],
                    number: 0,
                    last: false
                },
                byDeliveryPoint: {
                    query: '',
                    data: [],
                    number: 0,
                    last: false
                },
                byGps: {
                    query: '',
                    data: [],
                    number: 0,
                    last: false
                }
            };

            this.state = state;
            this.repoSearch = repoSearch;

            this.findAll = function (pageNumber) {
                return findAllInPage(pageNumber);
            };

            this.findOne = function(id){
                return ComponentRepository.findOne(url, {id: id}).then(function(data){
                    state.selected = data;
                });
            };

            this.save = function (location) {
                ComponentRepository.save(url, location).then(function (data) {
                    state.data.unshift(data);
                });
            };

            this.update = function (location) {
                ComponentRepository.update(url, location).then(function (data) {
                    for (var i = 0; i < state.data.length; i++) {
                        if (state.data[i].id === location.id) {
                            state.data[i] = data;
                        }
                    }
                });
            };

            this.delete = function (location) {
                ComponentRepository.delete(url, location).then(function () {
                    findAllInPage(state.currentPage);
                    _.remove(repoSearch.byName.data, function(obj){return location.id === obj.id});
                    _.remove(repoSearch.byDeliveryPoint.data, function(obj){return location.id === obj.id});
                    _.remove(repoSearch.byGps.data, function(obj){return location.id === obj.id});

                });
            };

            this.searchByName = function(query){
                ComponentRepository.search(url + '/search/name/' + query + '/?size=5&sort=id,desc&page=0').then(function(data){
                    repoSearch.byName.query = query;
                    repoSearch.byName.data = data.content;
                    repoSearch.byName.number = data.number;
                    repoSearch.byName.last = data.last;
                })
            };

            this.searchByNameMore = function(){
                ComponentRepository.search(url + '/search/name/' + repoSearch.byName.query + '/?size=5&sort=id,desc&page=' + (repoSearch.byName.number + 1)).then(function(data){
                    repoSearch.byName.number = data.number;
                    repoSearch.byName.last = data.last;
                    data.content.forEach(function(location){
                        repoSearch.byName.data.push(location);
                    });
                })
            };

            this.searchByDeliveryPoint = function(query){
                ComponentRepository.search(url + '/search/deliveryPoint/' + query + '/?size=5&sort=id,desc&page=0').then(function(data){
                    repoSearch.byDeliveryPoint.query = query;
                    repoSearch.byDeliveryPoint.data = data.content;
                    repoSearch.byDeliveryPoint.number = data.number;
                    repoSearch.byDeliveryPoint.last = data.last;
                })
            };

            this.searchByDeliveryPointMore = function(){
                ComponentRepository.search(url + '/search/deliveryPoint/' + repoSearch.byDeliveryPoint.query + '/?size=5&sort=id,desc&page=' + (repoSearch.byDeliveryPoint.number + 1)).then(function(data){
                    repoSearch.byDeliveryPoint.number = data.number;
                    repoSearch.byDeliveryPoint.last = data.last;
                    data.content.forEach(function(location){
                        repoSearch.byDeliveryPoint.data.push(location);
                    });
                })
            };

            this.searchByGps = function(query){
                ComponentRepository.search(url + '/search/gps/' + query + '/?size=5&sort=id,desc&page=0').then(function(data){
                    repoSearch.byGps.query = query;
                    repoSearch.byGps.data = data.content;
                    repoSearch.byGps.number = data.number;
                    repoSearch.byGps.last = data.last;
                })
            };

            this.searchByGpsMore = function(){
                ComponentRepository.search(url + '/search/gps/' + repoSearch.byGps.query + '/?size=5&sort=id,desc&page=' + (repoSearch.byGps.number + 1)).then(function(data){
                    repoSearch.byGps.number = data.number;
                    repoSearch.byGps.last = data.last;
                    data.content.forEach(function(location){
                        repoSearch.byGps.data.push(location);
                    });
                })
            };

            function findAllInPage(pageNumber){
                var number = pageNumber - 1;
                return ComponentRepository.findAll(url + '?size=20&sort=id,desc&page='+number).then(function (data) {
                    state.data.splice(0, state.data.length);
                    data.content.forEach(function (location) {
                        state.data.push(location);
                    });
                    state.totalPages = data.totalPages;
                    state.currentPage = data.number + 1;
                    state.numberOfElements = data.numberOfElements;
                    state.totalElements = data.totalElements;
                });
            }

        }]);

//cautare pe id