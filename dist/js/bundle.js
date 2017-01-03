'use strict';

angular.module('whitepages', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('reverse', {
        controller: 'view1Ctrl',
        url: '/',
        templateUrl: './view1/reverse.html'
    }).state('phone-data', {
        controller: 'view2Ctrl',
        url: '/phonedata',
        templateUrl: './view2/phone-data.html'
    });
    $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('whitepages').controller('mainCtrl', function ($scope) {
  $scope.openNav = function () {
    document.getElementById("mySidenav").style.width = "250px";
  };

  $scope.closeNav = function () {
    document.getElementById("mySidenav").style.width = "0";
  };
});
'use strict';

angular.module('whitepages').controller('view1Ctrl', function ($scope, $state, reversePhone) {
  $scope.getPhoneNum = function (num) {
    var newNum = num.replace(/[^0-9]/g, '');
    if (newNum.length !== 10) {
      swal({
        title: "Error!",
        text: "Enter phone number in correctly",
        type: "error",
        confirmButtonText: "Try Again"
      });
    } else {
      reversePhone.getPhoneNum(newNum).then(function (response) {
        console.log(response);

        $scope.phoneData = response;
        reversePhone.data = response;
        $state.go("phone-data");
      });
    }
  };

  $scope.toggleInput = true;
});
'use strict';

angular.module('whitepages').controller('view2Ctrl', function ($scope, $state, $rootScope, reversePhone) {
    $scope.data = reversePhone.data;
    if (!$scope.data) {
        $state.go('reverse');
    }
    console.log(reversePhone.data);
    var phone_number = reversePhone.data.phone_number;
    var new_phone_number = "(" + phone_number[0] + phone_number[1] + phone_number[2] + ")" + " " + phone_number[3] + phone_number[4] + phone_number[5] + "-" + phone_number[6] + phone_number[7] + phone_number[8] + phone_number[9];

    $scope.final_number = new_phone_number;
    console.log($scope.final_number);
    var initMap = function () {
        var zoomAmount = 10;
        if ($scope.data.address.lat_long.accuracy === "Street" || $scope.data.address.lat_long.accuracy === "Rooftop") {
            $scope.myAccuracy = "Street";
            zoomAmount = 18;
        } else if ($scope.data.address.lat_long.accuracy === "PostalCode") {
            $scope.myAccuracy = "Postal Code";
            zoomAmount = 11;
        } else {
            zoomAmount = 7;
            $scope.myAccuracy = "Far";
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
    }();
});
'use strict';

angular.module('whitepages').directive('inputMobile', function () {
  return {
    restrict: 'EA',
    templateUrl: 'inputMobile.html',
    link: function link(scope, element, attrs) {}
  };
});
'use strict';

angular.module('whitepages').service('reversePhone', function ($http, $q) {
  this.data;
  this.getPhoneNum = function (num) {
    console.log(num);
    var deferred = $q.defer();
    var phoneGetter = 'https://proapi.whitepages.com/3.0/phone.json?api_key=f34dd91462b04221997bc7420a8d7f4e&phone=' + num;
    $http({
      method: 'GET',
      url: phoneGetter
    }).then(function (response) {
      console.log(response);
      var newObj = {
        name: response.data.belongs_to[0].name,
        address: response.data.current_addresses[0],
        phone_number: response.data.phone_number,
        country_code: response.data.country_calling_code,
        line_type: response.data.line_type,
        carrier: response.data.carrier

      };

      // console.log(this.holder);
      deferred.resolve(newObj);
    });
    return deferred.promise;
  };
});
//# sourceMappingURL=bundle.js.map
