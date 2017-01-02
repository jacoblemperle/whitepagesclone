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

angular.module('whitepages').controller('view1Ctrl', function ($scope, reversePhone) {
  $scope.getPhoneNum = function (num) {
    reversePhone.getPhoneNum(num).then(function (response) {
      $scope.phoneData = response;
    });
  };

  $scope.toggleInput = true;
});
'use strict';

angular.module('whitepages').controller('view2Ctrl', function ($scope, reversePhone) {

    var getPhoneData = function getPhoneData() {
        $scope.phoneData = reversePhone.getPhoneData();
        $scope.location = $scope.phoneData.current_addresses[0].lat_long;
        $scope.longitude = $scope.phoneData.current_addresses[0].lat_long.longitude;
        $scope.latitude = $scope.phoneData.current_addresses[0].lat_long.latitude;
        $scope.accuracy = $scope.phoneData.current_addresses[0].lat_long.accuracy;
    };

    function initMap() {
        if (!$scope.latitude) {
            uluru.lat = 0;
        } else {
            uluru.lat = $scope.latitude;
        }
        if (!$scope.longitude) {
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
    var holder;
    this.getPhoneNum = function (num) {
        var phoneData = {};
        var deferred = $q.defer();
        var phoneGetter = 'https://proapi.whitepages.com/3.0/phone.json?api_key=7f020962e4cc43bf9b186deeafb67605&phone=' + num;
        $http({
            method: 'GET',
            url: phoneGetter
        }).then(function (response) {
            holder = response;
            phoneData.phoneNumber = response.data.phone_number;
            phoneData.latLong = response.data.current_addresses[0].lat_long;
            phoneData.address = response.data.current_addresses[0];
            phoneData.carrier = response.data.carrier;
            phoneData.belongsTo = response.data.belongs_to[0];
            console.log(holder);
            console.log(phoneData);
            deferred.resolve(phoneData);
        });
        return deferred.promise;
    };
    this.getPhoneData = function () {
        console.log(holder);
        var personData = holder;
        return personData;
    };
});
//# sourceMappingURL=bundle.js.map
