'use strict';

angular.module('primetables.tableview.component',
    [
    ]
)

    .component('tableView', {
        templateUrl: 'tableview/tableviewcomponent/tableviewcomponent.html',
        controller: TableViewComponentController
    });

function TableViewComponentController() {

    var ctrl = this;

    ctrl.populateTable = function() {

    };

}