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
            holder = response.data;
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
        var personData = {
            address: holder.current_addresses[0],
            belongsTo: holder.belongs_to[0],
            latitude: holder.current_addresses[0].lat_long.latitude,
            longitude: holder.current_addresses[0].lat_long.longitude,
            accuracy: holder.current_addresses[0].lat_long.accuracy
        };
        return personData;
    };
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
});
'use strict';

angular.module('whitepages').controller('view2Ctrl', function ($scope, reversePhone) {

    $scope.$on("$locationChangeStart", function (event, next, current) {
        if (next == current && next == '/newproject') $state.go('home');
    });

    var getPhoneData = function getPhoneData() {
        $scope.phoneData = reversePhone.getPhoneData();
        $scope.coordsLat = $scope.phoneData.latitude;
        $scope.coordsLong = $scope.phoneData.longitude;
        $scope.accuracy = $scope.phoneData.accuracy;
    };
    getPhoneData();

    function initMap() {
        var zoomAmount = 10;
        if ($scope.accuracy === "RoofTop" || $scope.accuracy === "Street") {
            zoomAmount = 20;
        } else if ($scope.accuracy === "PostalCode" || $scope.accuracy === "City") {
            zoomAmount = 11;
        } else if ($scope.accuracy === "State") {
            zoomAmount = 8;
        } else if ($scope.accuracy === "Country") {
            zoomAmount = 6;
        } else {
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
//# sourceMappingURL=bundle.js.map
