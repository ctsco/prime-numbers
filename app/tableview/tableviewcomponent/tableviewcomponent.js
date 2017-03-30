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
    })

    .constant("TableViewConstants", {
        PAGE_SIZE: 10
    });

function TableViewComponentController(PrimeGenerator, TableViewConstants) {

    var ctrl = this;

    ctrl.populateTable = function () {
        ctrl.timeTaken = undefined;

        var start = new Date();

        ctrl.primes = PrimeGenerator.generatePrimeNumbers(ctrl.enteredPrimeCount);

        ctrl.timeTaken = new Date().getTime() - start.getTime();

        setPageCount();
        setLastPrime();
    };

    function setPageCount() {
        ctrl.pageCount = ctrl.primes.length / TableViewConstants.PAGE_SIZE;
        ctrl.pageCount = Math.ceil(ctrl.pageCount);
    }

    function setLastPrime() {
        ctrl.lastPrime = ctrl.primes[ctrl.primes.length - 1];
    }

}