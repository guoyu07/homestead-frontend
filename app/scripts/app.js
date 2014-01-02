'use strict';

angular.module('roomDamages', []);

angular.module('hmsAngularApp', [
  'ngResource', 'roomDamages', 'ngRoute'
])
  .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;

    $routeProvider
      .when('/', {
        //templateUrl: 'views/damage-charge.html',
        //controller: 'RoomDamageAssessmentCtrl'
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
