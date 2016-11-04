route.constant('RouteConstant', function () {
    var TRANSPORT = {name: 'transport', plural: 'transports'};
    var DRIVER = {name: 'driver', plural: 'drivers'};
    var LOCATION = {name: 'location', plural: 'locations' };

    return {
        REST_API_URL: '/api',
        DEFAULT_PLURAL_FORM: 's',

        TRANSPORT: TRANSPORT,
        DRIVER: DRIVER,
        LOCATION: LOCATION,
        COMPONENTS: [TRANSPORT, DRIVER, LOCATION],

        TEXT: {
            ACTIONS: 'Actions',
            EDIT: 'Edit',
            DELETE: 'Delete'
        },

        COLUMN: {
            ID: {value: 'id', text: 'Id'},
            NAME: {value: 'name', text: 'Name'},
            DELIVERY_POINT: {value: 'deliveryPoint', text: 'Delivery Point'},
            GPS: {value: 'gps', text: 'Gps' }
        }
    }

}());