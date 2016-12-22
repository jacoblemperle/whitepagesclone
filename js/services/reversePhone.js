angular.module('whitepages').service('reversePhone', function($http, $q){

  var holder;
  this.getPhoneNum = function(num){
    var phoneData = {};
    var deferred = $q.defer();
    
      $http({
      method: 'GET',
      url: phoneGetter
    }).then(function(response){
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
    this.getPhoneData = function(){
      var personData = {
        address: holder.current_addresses[0],
        belongsTo: holder.belongs_to[0],
        latitude: holder.current_addresses[0].lat_long.latitude,
        longitude: holder.current_addresses[0].lat_long.longitude
      };
        return personData;
    };
});
