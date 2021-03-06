describe('primeutils_test.js', function () {

    beforeEach(module('primetables.utils.primes'));

    var PrimeUtils;

    beforeEach(inject(function (_PrimeUtils_) {
        PrimeUtils = _PrimeUtils_;
    }));

    describe("isValuePrime()", function() {

        describe("should return true when the value is a prime", function() {

            it('for numbers below 100', function() {
                var primesBelow100 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

                primesBelow100.forEach(function(prime) {
                    expect(PrimeUtils.isValuePrime(prime)).toBe(true);
                })
            });

            it('for numbers below 1000', function() {
                var primesBelow1000 = [937, 941, 947, 953, 967, 971, 977, 983, 991, 997];

                primesBelow1000.forEach(function(prime) {
                    expect(PrimeUtils.isValuePrime(prime)).toBe(true);
                })
            });

            it('for numbers below 10000', function() {
                var primesBelow10000 = [9887, 9901, 9907, 9923, 9929, 9931, 9941, 9949, 9967, 9973];

                primesBelow10000.forEach(function(prime) {
                    expect(PrimeUtils.isValuePrime(prime)).toBe(true);
                })
            });
        });

        describe("should return false when the value is a composite", function() {

            it('for numbers below 100', function() {
                var compositesBelow100 = [4, 6, 8, 9, 10, 12, 14, 15, 18, 20];

                compositesBelow100.forEach(function(composite) {
                    expect(PrimeUtils.isValuePrime(composite)).toBe(false);
                })
            });

            it('for numbers below 1000', function() {
                var compositesBelow1000 = [938, 939, 940, 942, 943, 944, 945, 946, 948, 949];

                compositesBelow1000.forEach(function(composite) {
                    expect(PrimeUtils.isValuePrime(composite)).toBe(false);
                })
            });

            it('for numbers below 10000', function() {
                var compositesBelow10000 = [9886, 9888, 9889, 9890, 9900, 9902, 9903, 9904, 9905, 9906];

                compositesBelow10000.forEach(function(composite) {
                    expect(PrimeUtils.isValuePrime(composite)).toBe(false);
                })
            });
        });

    });

    describe("approximateNthPrimeNumber()", function() {

        describe("should return a number greater or equal to", function() {

            it('2, when n is 1', function() {
                assertNthPrimeNumber(1, 2);
            });

            it('3, when n is 2', function() {
                assertNthPrimeNumber(2, 3);
            });

            it('5, when n is 3', function() {
                assertNthPrimeNumber(3, 5);
            });

            it('7, when n is 4', function() {
                assertNthPrimeNumber(4, 7);
            });

            it('29, when n is 10', function() {
                assertNthPrimeNumber(10, 29);
            });

            it('71, when n is 20', function() {
                assertNthPrimeNumber(20, 71);
            });

            it('541, when n is 100', function() {
                assertNthPrimeNumber(100, 541);
            });

            it('7919, when n is 1000', function() {
                assertNthPrimeNumber(1000, 7919);
            });

            it('104729, when n is 10000', function() {
                assertNthPrimeNumber(10000, 104729);
            });

            it('1299709, when n is 100000', function() {
                assertNthPrimeNumber(100000, 1299709);
            });

            it('15485863, when n is 1000000', function() {
                assertNthPrimeNumber(1000000, 15485863);
            });

            it('32452843, when n is 2000000', function() {
                assertNthPrimeNumber(2000000, 32452843);
            });

            it('179424673, when n is 10000000', function() {
                assertNthPrimeNumber(10000000, 179424673);
            });

            function assertNthPrimeNumber(nthNumber, actualPrime) {
                var result = PrimeUtils.approximateNthPrimeNumber(nthNumber);

                expect(result).toBeTruthy();
                expect(result).not.toBeLessThan(actualPrime);
            }
        });

    });
});
