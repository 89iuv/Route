route.service('RouteModalService', ['$q', function($q){
    var defer = {};
    var isInit = true;

    var properties = {
        type: '',
        htmlPartialLocation: '',
        data: {}
    };

    this.properties = properties;

    this.show = function(){
        UIkit.modal("#rt-modal").show();
        registerResetOnModalClose();
        defer = $q.defer();
        return defer.promise;
    };

    this.closeAndReject = function(){
        UIkit.modal("#rt-modal").hide();
        defer.reject();
        reset();
    };

    this.closeAndResolve = function(){
        UIkit.modal("#rt-modal").hide();
        defer.resolve(properties.data);
        reset();
    };

    function reset() {
        properties.type = '';
        properties.htmlPartialLocation = '';
        properties.data = {};
    }

    //hacky method to execute reset() on modal X close
    function registerResetOnModalClose(){
        if (isInit){
            $('#rt-modal').on({
                'hide.uk.modal': function(){
                    defer.reject();
                    reset();
                }
            });
            isInit = false;
        }
    }

}]);