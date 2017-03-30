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

    ctrl.rendering = false;

    ctrl.populateTable = function() {
        ctrl.timeTaken = undefined;

        var start = new Date();

        ctrl.primes = PrimeGenerator.generatePrimeNumbers(ctrl.enteredPrimeCount);

        ctrl.timeTaken = new Date().getTime() - start.getTime();
        ctrl.lastPrime = ctrl.primes[ctrl.primes.length-1];
    };

}