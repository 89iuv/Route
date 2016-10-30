route.service('ModalService', ['$q', function($q){
    this.TYPE = {
        ADD: "ADD",
        EDIT: "EDIT"
    };

    var defer = {};
    var isInit = true;

    var properties = {
        title: '',
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
    };

    this.closeAndResolve = function(){
        UIkit.modal("#my-id").hide();
        defer.resolve(properties.data);
    };

    function reset() {
        properties.title = '';
        properties.type = '';
        properties.htmlPartialLocation = '';
        properties.data = {};

    }

    //hacky method to execute reset() on modal X close
    function registerResetOnModalClose(){
        if (isInit){
            $('#my-id').on({
                'hide.uk.modal': function(){
                    reset();
                    defer.reject();
                }
            });
            isInit = false;
        }

    }

}]);