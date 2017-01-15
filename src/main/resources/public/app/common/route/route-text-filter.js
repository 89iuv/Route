route.filter('capitalize', function(){
   return function (input) {
       return _.capitalize(input);
   }
});

route.filter('date', function(){
    return function (input) {
        return moment(input).format("DD-MM-YYYY");
    }
});