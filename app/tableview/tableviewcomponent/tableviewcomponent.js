'use strict';

angular.module('primetables.tableview.component',
    [
        'primetables.utils.primes.generator',
        'primetables.filters.multiplication'
    ]
)

    .component('tableView', {
        templateUrl: 'tableview/tableviewcomponent/tableviewcomponent.html',
        controller: TableViewComponentController
    });

function TableViewComponentController(PrimeGenerator) {

    var ctrl = this;

    ctrl.populateTable = function() {
        ctrl.primes = PrimeGenerator.generatePrimeNumbers(ctrl.enteredPrimeCount);
    };

}