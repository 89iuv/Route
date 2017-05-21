route.controller('LocationActionsController',
    ['$scope', '$location', '$timeout', '$routeParams', 'RouteTextConstants', 'RoutePathConstants', 'RouteConfigConstants', 'LocationRepositoryService',
        function ($scope, $location, $timeout, $routeParams, RouteTextConstants, RoutePathConstants, RouteConfigConstants, LocationRepositoryService) {
            var googleMaps = {
                map: {},
                marker: {},
                autocomplete: {}
            };

            initMap(googleMaps);

            $scope.TEXT = RouteTextConstants;
            $scope.state = LocationRepositoryService.state;
            $scope.isNewLocation = $routeParams.id === 'new';

            if ($scope.isNewLocation){
                $scope.location = {};
                setMapToHome(googleMaps);

            } else {
                LocationRepositoryService.findOne($routeParams.id).then(function(){
                    $scope.location = LocationRepositoryService.state.selected;
                    setMapToGps(googleMaps, $scope.location.gps);
                })
            }

            $scope.delete = function () {
                LocationRepositoryService.delete($scope.location);
                window.history.back();
            };

            $scope.save = function () {
                LocationRepositoryService.save($scope.location);
                $scope.location = {};
                setMapToHome(googleMaps);

            };

            $scope.saveAndClose = function () {
                LocationRepositoryService.save($scope.location);
                window.history.back();
            };

            $scope.update = function () {
                LocationRepositoryService.update($scope.location);
                window.history.back();
            };

            $scope.close = function () {
                window.history.back();
            };

            function initMap(googleMaps){
                googleMaps.map = new google.maps.Map(document.getElementById('rt-location-map'), {
                    disableDefaultUI: true,
                    zoomControl: true
                });

                googleMaps.marker = new google.maps.Marker({
                    map: googleMaps.map
                });

                googleMaps.map.addListener('click', function (e) {
                    googleMaps.marker.setPosition(e.latLng);
                    $timeout(function () {
                        $scope.location.gps = e.latLng.lat().toFixed(6) + ", " + e.latLng.lng().toFixed(6);
                    }, 0);
                });

                googleMaps.autocomplete = new google.maps.places.Autocomplete(
                    document.getElementById('rt-location-map-autocomplete')
                );
                console.log(googleMaps.autocomplete);

                googleMaps.autocomplete.addListener('place_changed', function () {
                    var place = googleMaps.autocomplete.getPlace();
                    if (place.geometry) {
                        googleMaps.map.panTo(place.geometry.location);
                        googleMaps.map.fitBounds(place.geometry.viewport);
                    } else {
                        document.getElementById('rt-location-map-autocomplete').placeholder = $scope.TEXT.SEARCH;
                    }
                });
            }

            function setMapToHome(googleMaps){
                var latLangArray = RouteConfigConstants.HOME_GPS.split(', ');
                var latLang = {lat: Number(latLangArray[0]), lng:  Number(latLangArray[1])};
                googleMaps.map.setCenter(latLang);
                googleMaps.map.setZoom(10);
                googleMaps.marker.setPosition(null);
                $('#rt-location-map-autocomplete').val('');
            }

            function setMapToGps(googleMaps, gps){
                var latLangArray = gps.split(', ');
                var latLang = {lat: Number(latLangArray[0]), lng:  Number(latLangArray[1])};
                googleMaps.map.setCenter(latLang);
                googleMaps.map.setZoom(16);
                googleMaps.marker.setPosition(latLang);
            }

        }]);