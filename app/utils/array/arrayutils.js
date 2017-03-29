'use strict';

angular.module('primetables.utils.array', [
])
    .service("ArrayUtils", function () {
        this.setRecurringValue = function (array, startIndex, endIndex, increment, value) {

            validateParameters();

            function validateParameters() {
                var CANNOT_BE_UNDEFINED = " cannot be undefined";

                if(array === undefined) {
                    throw "array" + CANNOT_BE_UNDEFINED;
                } else if(startIndex === undefined) {
                    throw "startIndex" + CANNOT_BE_UNDEFINED;
                } else if(endIndex === undefined) {
                    throw "endIndex" + CANNOT_BE_UNDEFINED;
                } else if(increment === undefined) {
                    throw "increment" + CANNOT_BE_UNDEFINED;
                }
            }
        };
    });