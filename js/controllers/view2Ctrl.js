angular.module('whitepages').controller('view2Ctrl', function($scope, reversePhone) {

    var getPhoneData = function() {
        $scope.phoneData = reversePhone.getPhoneData();
        $scope.location = $scope.phoneData.current_addresses[0].lat_long;
        $scope.longitude = $scope.phoneData.current_addresses[0].lat_long.longitude;
        $scope.latitude = $scope.phoneData.current_addresses[0].lat_long.latitude;
        $scope.accuracy = $scope.phoneData.current_addresses[0].lat_long.accuracy;

    };


    function initMap() {
          if(!$scope.latitude){
            uluru.lat = 0;
          } else {
            uluru.lat = $scope.latitude;
          }
          if(!$scope.longitude){
            uluru.lng = 0;
          } else {
            uluru.lng = $scope.longitude;
          }
      
        var uluru = {
            lat: $scope.latitude,
            lng: $scope.longitude
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }

    setTimeout(function () {
        console.log("getting phone data");
        getPhoneData();
    }, 1000);
    setTimeout(function () {
        console.log("getting initmap");
        console.log($scope.location);
        initMap();
    }, 1500);
});
