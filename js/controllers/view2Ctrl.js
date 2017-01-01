angular.module('whitepages').controller('view2Ctrl', function($scope, reversePhone) {


  $scope.$on("$locationChangeStart", function(event, next, current) {
      if(next==current && next=='/newproject')
          $state.go('home');
  });

    var getPhoneData = function() {
        $scope.phoneData = reversePhone.getPhoneData();
        $scope.coordsLat = $scope.phoneData.latitude;
        $scope.coordsLong = $scope.phoneData.longitude;
    };
    getPhoneData();

    function initMap() {
        var uluru = {
            lat: $scope.coordsLat,
            lng: $scope.coordsLong
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
    initMap();

});
