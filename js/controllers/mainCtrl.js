angular.module('whitepages').controller('mainCtrl', function($scope){
  $scope.openNav = function() {
    document.getElementById("mySidenav").style.width = "250px";
};

  $scope.closeNav = function() {
    document.getElementById("mySidenav").style.width = "0";
};
});
