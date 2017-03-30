'use strict';

angular.module('primetables.utils.primes', [
])
    .service("PrimeUtils", function () {
        this.isValuePrime = function (value) {
            for(var loopIndex = value - 1; loopIndex >=2; loopIndex--) {
                if(value%loopIndex === 0) {
                    return false;
                }
            }

            return true;
        };

        this.approximateNthPrimeNumber = function(n) {

        }
    });