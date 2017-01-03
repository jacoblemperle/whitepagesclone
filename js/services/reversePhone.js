angular.module('whitepages').service('reversePhone', function($http, $q) {
this.data;
    this.getPhoneNum = function(num) {
      console.log(num);
        var deferred = $q.defer();
        var phoneGetter = 'https://proapi.whitepages.com/3.0/phone.json?api_key=f34dd91462b04221997bc7420a8d7f4e&phone=' + num;
        $http({
            method: 'GET',
            url: phoneGetter
        }).then(function(response) {
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
