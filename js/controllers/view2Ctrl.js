angular.module('whitepages').controller('view2Ctrl', function($scope, $state, $rootScope, reversePhone) {
    $scope.data = reversePhone.data;
    if (!$scope.data) {
        $state.go('reverse');
    }
    console.log(reversePhone.data);
    var phone_number = reversePhone.data.phone_number;
    var new_phone_number = "(" + phone_number[0] + phone_number[1] + phone_number[2] + ")" + " " + phone_number[3] + phone_number[4] + phone_number[5] + "-" + phone_number[6] + phone_number[7] + phone_number[8] + phone_number[9];

    $scope.final_number = new_phone_number;
    console.log($scope.final_number);
    var initMap = (function() {
        var zoomAmount = 10;
        if ($scope.data.address.lat_long.accuracy === "Street" || $scope.data.address.lat_long.accuracy === "Rooftop") {
          $scope.myAccuracy = "Street"
            zoomAmount = 18;
        } else if($scope.data.address.lat_long.accuracy === "PostalCode"){
          $scope.myAccuracy = "Postal Code"
            zoomAmount = 11;
        } else {
          zoomAmount = 7;
          $scope.myAccuracy = "Far"
        }
        var myCoords = {
            lat: $scope.data.address.lat_long.latitude,
            lng: $scope.data.address.lat_long.longitude
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            scrollwheel: false,
            zoom: zoomAmount,
            center: myCoords
        });
        var marker = new google.maps.Marker({
            position: myCoords,
            map: map
        });
    })();


});
