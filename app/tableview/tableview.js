'use strict';

angular.module('primetables.tableview',
    [
        'ngRoute'
    ]
)

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/table', {
    templateUrl: 'tableview/tableview.html',
    controller: 'TableViewCtrl'
  });
}])

.controller('TableViewCtrl', function() {

});