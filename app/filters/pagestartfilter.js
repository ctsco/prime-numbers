'use strict';

angular.module('primetables.filters.pagestart',
    []
)

    .filter('pagestart', function() {

        return function pagestart(array, startIndex) {
            if(array) {
                return array.slice(startIndex);
            }

            return undefined;
        };

    });