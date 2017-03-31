'use strict';

angular.module('primetables.utils.primes', [
])
    .service("PrimeUtils", function () {
        this.isValuePrime = function (value) {
            for (var loopIndex=2; loopIndex <= Math.sqrt(value); loopIndex++) {
                if (value % loopIndex == 0) {
                    return false;
                }
            }

            return true;
        };

        this.approximateNthPrimeNumber = function(n) {
            return n * 20;
        }
    });