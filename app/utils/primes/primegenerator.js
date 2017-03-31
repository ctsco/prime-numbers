'use strict';

angular.module('primetables.utils.primes.generator', [
    'primetables.utils.primes',
    'primetables.utils.array'
])
    .service("PrimeGenerator", function (PrimeUtils, ArrayUtils) {
        this.generatePrimeNumbers = function (count) {

            if(count < 1) {
                return [];
            }

            var approximateHighestPrime = PrimeUtils.approximateNthPrimeNumber(count);

            var numbers = [];
            var primes = [];

            var primeCount = 0;
            var numberUnderTest = 2;

            while(primeCount<count) {

                if(numbers[numberUnderTest] === undefined) {

                    if(PrimeUtils.isValuePrime(numberUnderTest)) {
                        primeCount++;
                        primes.push(numberUnderTest);

                        ArrayUtils.setRecurringValue(numbers, numberUnderTest * 2, approximateHighestPrime, numberUnderTest, true);
                    } else {
                        numbers[numberUnderTest] = true;
                    }
                }

                numberUnderTest++;
            }

            return primes;
        };
    });