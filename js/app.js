angular.module('whitepages', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
$stateProvider
.state('reverse',{
    controller: 'view1Ctrl',
    url: '/',
    templateUrl: './view1/reverse.html'
})
.state('phone-data',{
    controller: 'view2Ctrl',
    url: '/phonedata',
    templateUrl: './view2/phone-data.html'
});

$urlRouterProvider
    .otherwise('/');
});
