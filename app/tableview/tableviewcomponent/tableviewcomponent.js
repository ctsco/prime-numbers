'use strict';

angular.module('primetables.tableview.component',
    [
        'primetables.utils.primes.generator',
        'primetables.utils.number',
        'primetables.tableview.component.paging',
        'primetables.filters.multiplication',
        'primetables.filters.pagestart'
    ]
)

    .component('tableView', {
        templateUrl: 'tableview/tableviewcomponent/tableviewcomponent.html',
        controller: TableViewComponentController
    })

    .constant("TableViewConstants", {
        PAGE_SIZE: 10
    });

function TableViewComponentController(PrimeGenerator, TableViewConstants, NumberUtils) {

    var ctrl = this;

    ctrl.$onInit = function() {
        ctrl.pages = [0];
        ctrl.selectedVerticalPage = 0;
        ctrl.selectedHorizontalPage = 0;
        ctrl.pageSize = TableViewConstants.PAGE_SIZE;
        ctrl.enablePaging = true;
    };

    ctrl.populateTable = function () {
        ctrl.timeTaken = undefined;

        var start = new Date();

        ctrl.primes = PrimeGenerator.generatePrimeNumbers(ctrl.enteredPrimeCount);

        ctrl.timeTaken = new Date().getTime() - start.getTime();

        ctrl.selectedVerticalPage = 0;
        ctrl.selectedHorizontalPage = 0;

        setPageCount();
        setLastPrime();
    };

    ctrl.getVerticalPageStart = function() {
        if(ctrl.enablePaging) {
            return ctrl.selectedVerticalPage * ctrl.pageSize;
        }

        return 0;
    };

    ctrl.getHorizontalPageStart = function() {
        if(ctrl.enablePaging) {
            return ctrl.selectedHorizontalPage * ctrl.pageSize;
        }

        return 0;
    };

    ctrl.getPageSize = function() {
        if(ctrl.enablePaging) {
            return ctrl.pageSize;
        }

        if(ctrl.primes) {
            return ctrl.primes.length;
        }

        return 0;
    };

    function setPageCount() {
        ctrl.pageCount = ctrl.primes.length / TableViewConstants.PAGE_SIZE;
        ctrl.pageCount = Math.ceil(ctrl.pageCount);

        ctrl.pages = [];

        for(var index=0; index<ctrl.pageCount; index++) {
            ctrl.pages.push(index);
        }
    }

    function setLastPrime() {
        ctrl.lastPrime = ctrl.primes[ctrl.primes.length - 1];
    }

}