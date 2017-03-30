'use strict';

angular.module('primetables.filters.multiplication',
    []
)

.filter('multiplication', function() {

    return function multiplication(param1, param2) {
        return param1 * param2;
    };

});