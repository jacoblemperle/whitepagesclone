angular.module('whitepages').controller('view2Ctrl', function($scope, reversePhone){
  $scope.getPhoneData = function(){
      $scope.phoneData = reversePhone.getPhoneData();
      console.log($scope.phoneData);
  };

  function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
});
