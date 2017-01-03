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
            zoomAmount = 18;
        } else {
            zoomAmount = 7;
        }
        var uluru = {
            lat: $scope.data.address.lat_long.latitude,
            lng: $scope.data.address.lat_long.longitude
        };
        console.log(uluru);
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoomAmount,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    })();


});
