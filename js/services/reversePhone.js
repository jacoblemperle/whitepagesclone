angular.module('whitepages').service('reversePhone', function($http, $q) {
    var holder;
    this.getPhoneNum = function(num) {
        var phoneData = {};
        var deferred = $q.defer();
        var phoneGetter = 'https://proapi.whitepages.com/3.0/phone.json?api_key={{apikey}}&phone=' + num;
        $http({
            method: 'GET',
            url: phoneGetter
        }).then(function(response) {
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
    this.getPhoneData = function() {
      console.log(holder);
        var personData = holder;
        return personData;
    };
});
