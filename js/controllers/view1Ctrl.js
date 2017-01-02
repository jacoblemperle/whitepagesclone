angular.module('whitepages').controller('view1Ctrl', function($scope, reversePhone){
  $scope.getPhoneNum = function(num){
    reversePhone.getPhoneNum(num).then(function(response){
      $scope.phoneData = response;
    });
  };

  $scope.toggleInput = true;
});
