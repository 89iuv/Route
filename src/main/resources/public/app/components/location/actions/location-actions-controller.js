route.controller('LocationActionsController',
    ['$scope', '$location', '$timeout', '$routeParams', 'RouteTextConstants', 'RoutePathConstants', 'RouteConfigConstants', 'LocationRepositoryService',
        function ($scope, $location, $timeout, $routeParams, RouteTextConstants, RoutePathConstants, RouteConfigConstants, LocationRepositoryService) {
            $scope.TEXT = RouteTextConstants;
            $scope.location = _.find(LocationRepositoryService.state, function (location) {
                return location.id.toString() === $routeParams.id
            });

            if ($scope.location === undefined) {
                $scope.isNewLocation = true;
                $scope.location = {};
            } else {
                $scope.isNewLocation = false;
            }

            var home = RouteConfigConstants.HOME_GPS;
            var map = new google.maps.Map(document.getElementById('rt-location-map'), {
                zoom: 10,
                center: home,
                disableDefaultUI: true,
                zoomControl: true
            });

            var marker = new google.maps.Marker({
                map: map
            });

            map.addListener('click', function (e) {
                marker.setPosition(e.latLng);

                $timeout(function () {
                    $scope.location.gps = e.latLng.lat().toFixed(6) + ", " + e.latLng.lng().toFixed(6);
                }, 0);
            });

            var autocomplete = new google.maps.places.Autocomplete(
                document.getElementById('rt-location-map-autocomplete')
            );

            autocomplete.addListener('place_changed', function () {
                var place = autocomplete.getPlace();
                if (place.geometry) {
                    map.panTo(place.geometry.location);
                    map.fitBounds(place.geometry.viewport);
                } else {
                    document.getElementById('rt-location-map-autocomplete').placeholder = 'Enter a location';
                }
            });

            $scope.save = function () {
                LocationRepositoryService.save($scope.location);
                $location.url(RoutePathConstants.LOCATION_URL);
            };

            $scope.update = function () {
                LocationRepositoryService.update($scope.location);
                $location.url(RoutePathConstants.LOCATION_URL);
            };

            $scope.close = function () {
                $location.url(RoutePathConstants.LOCATION_URL);
            };

        }]);