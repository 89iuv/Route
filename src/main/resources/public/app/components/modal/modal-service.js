route.service('ModalService', ['$q', function($q){
    var defer = {};
    var isInit = true;

    var properties = {
        type: '',
        htmlPartialLocation: '',
        data: {}
    };

    this.properties = properties;

    this.show = function(){
        UIkit.modal("#my-id").show();
        registerResetOnModalClose();
        defer = $q.defer();
        return defer.promise;
    };

    this.closeAndReject = function(){
        UIkit.modal("#my-id").hide();
        defer.reject();
        reset();
    };

    this.closeAndResolve = function(){
        UIkit.modal("#my-id").hide();
        defer.resolve(properties.data);
        reset();
    };

    function reset() {
        properties.type = '';
        properties.htmlPartialLocation = 'app/components/locations/modal/location-modal-partial.html';
        properties.data = {};

    }

    //hacky method to execute reset() on modal X close
    function registerResetOnModalClose(){
        if (isInit){
            $('#my-id').on({
                'hide.uk.modal': function(){
                    defer.reject();
                    reset();
                }
            });
            isInit = false;
        }
    }

}]);