angular.module('whitepages').controller('view1Ctrl', function($scope, $state, reversePhone){
  $scope.getPhoneNum = function(num){
    var newNum = num.replace(/[^0-9]/g, '');
    if(newNum.length !== 10){
      alert(newNum + " is not a correct input");
    } else {
    reversePhone.getPhoneNum(newNum).then(function(response){
      console.log(response);
      $scope.phoneData = response;
      reversePhone.data = response;
      $state.go("phone-data");
    });
  }
  };

  $scope.toggleInput = true;
});
