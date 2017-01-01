angular.module('whitepages').controller('view2Ctrl', function($scope, reversePhone) {


  $scope.$on("$locationChangeStart", function(event, next, current) {
      if(next==current && next=='/newproject')
          $state.go('home');
  });

    var getPhoneData = function() {
        $scope.phoneData = reversePhone.getPhoneData();
        $scope.coordsLat = $scope.phoneData.latitude;
        $scope.coordsLong = $scope.phoneData.longitude;
        $scope.accuracy = $scope.phoneData.accuracy;
    };
    getPhoneData();

    function initMap() {
      var zoomAmount = 10;
      if($scope.accuracy === "RoofTop" || $scope.accuracy === "Street"){
        zoomAmount = 20;
      } else if($scope.accuracy === "PostalCode" || $scope.accuracy === "City") {
        zoomAmount = 11;
      } else if ($scope.accuracy === "State") {
        zoomAmount = 8;
      } else if ($scope.accuracy === "Country") {
        zoomAmount = 6;
      } else{
        zoomAmount = 10;
      }

        var myLocation = {
            lat: $scope.coordsLat,
            lng: $scope.coordsLong
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoomAmount,
            center: myLocation
        });
        var marker = new google.maps.Marker({
            position: myLocation,
            map: map
        });

    }
    initMap();

});
