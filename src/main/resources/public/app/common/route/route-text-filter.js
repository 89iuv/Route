route.filter('capitalize', function(){
   return function (input) {
       return _.capitalize(input);
   }
});