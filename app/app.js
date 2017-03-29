'use strict';

angular.module('primetables', [
  'ngRoute',
  'primetables.tableview'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/table'});
}]);
