'use strict';

angular.module('primetables.tableview.component.paging',
    []
)

    .component('paging', {
        templateUrl: 'tableview/tableviewcomponent/paging/pagingcomponent.html',
        controller: PagingComponentController,
        bindings: {
            enablePaging: "=",
            pages: "<",
            selectedVerticalPage: "=",
            selectedHorizontalPage: "="
        }
    })

function PagingComponentController() {
    var ctrl = this;
}