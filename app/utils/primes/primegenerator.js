'use strict';

angular.module('primetables.utils.primes.generator', [
    'primetables.utils.primes'
])
    .service("PrimeGenerator", function (PrimeUtils) {
        this.generatePrimeNumbers = function (count) {

            if(count < 2) {
                return [];
            }

            var approximateHighestPrime = PrimeUtils.approximateNthPrimeNumber(count);
        };
    });