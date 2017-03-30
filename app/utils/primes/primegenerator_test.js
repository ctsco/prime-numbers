describe('primegenerator_test.js', function () {

    var PrimeGenerator;
    var mockPrimeUtils = {};
    var mockArrayUtils = {};

    beforeEach(function () {
        module('primetables.utils.primes.generator');

        module(function ($provide) {
            $provide.value("PrimeUtils", mockPrimeUtils);
            $provide.value("ArrayUtils", mockArrayUtils);
        });
    });

    beforeEach(inject(function (_PrimeGenerator_) {
        PrimeGenerator = _PrimeGenerator_;
    }));

    describe("generatePrimeNumbers()", function() {

        describe("should return an empty array when", function() {

            it('count is 0', function() {
                expect(PrimeGenerator.generatePrimeNumbers(0)).toEqual([]);
            });

            it('count is less than 0', function() {
                expect(PrimeGenerator.generatePrimeNumbers(-1)).toEqual([]);
            });

        });

        it("should retrieve the approximate highest value from PrimeUtils", function() {
            mockPrimeUtils.approximateNthPrimeNumber
                = jasmine.createSpy("approximateNthPrimeNumber").and.returnValue(1);

            var COUNT = 10;
            PrimeGenerator.generatePrimeNumbers(COUNT);

            expect(mockPrimeUtils.approximateNthPrimeNumber).toHaveBeenCalledWith(10);
        });

        describe("should keep iterating until prime count has been reached", function() {

            var APPROXIMATE_HIGHEST = 100;

            beforeEach(function() {
                mockPrimeUtils.approximateNthPrimeNumber
                    = jasmine.createSpy("approximateNthPrimeNumber").and.returnValue(APPROXIMATE_HIGHEST);

                mockArrayUtils.setRecurringValue
                    = jasmine.createSpy("setRecurringValue");

            });

            describe("adding each number which is a prime", function() {

                var COUNT = 3;
                var result;

                beforeEach(function() {
                    mockPrimeUtils.isNumberPrime
                        = jasmine.createSpy("isNumberPrime").and.returnValue(true);

                    result = PrimeGenerator.generatePrimeNumbers(COUNT);
                });

                it('by confirming whether number is a prime', function() {
                    expect(mockPrimeUtils.isNumberPrime.calls.count()).toBe(COUNT);

                    expect(mockPrimeUtils.isNumberPrime).toHaveBeenCalledWith(2);
                    expect(mockPrimeUtils.isNumberPrime).toHaveBeenCalledWith(3);
                    expect(mockPrimeUtils.isNumberPrime).toHaveBeenCalledWith(4);
                });

                it('to the result, starting with 2', function() {
                    expect(result.length).toBe(COUNT);

                    // ArrayUtils.setRecurringValue mocked, sieve won't be sieving.  Therefore this
                    // should just increment.
                    expect(result[0]).toBe(2);
                    expect(result[1]).toBe(3);
                    expect(result[2]).toBe(4);
                });

                describe('marking multiples of each number as a composite', function() {
                    it('for the first prime', function() {
                        expect(mockArrayUtils.setRecurringValue).toHaveBeenCalledWith(
                            [], 4, APPROXIMATE_HIGHEST, 2, true
                        );
                    });

                    it('for the second prime', function() {
                        expect(mockArrayUtils.setRecurringValue).toHaveBeenCalledWith(
                            [], 6, APPROXIMATE_HIGHEST, 3, true
                        );
                    });

                    it('for the third prime', function() {
                        expect(mockArrayUtils.setRecurringValue).toHaveBeenCalledWith(
                            [], 8, APPROXIMATE_HIGHEST, 4, true
                        );
                    });
                });
            });

            describe("not returning any composite numbers", function() {
                var COUNT = 3;
                var result;

                beforeEach(function() {
                    mockPrimeUtils.isNumberPrime
                        = jasmine.createSpy("isNumberPrime").and.returnValues(false, false, true, true, true);

                    result = PrimeGenerator.generatePrimeNumbers(COUNT);
                });

                it('in the result', function() {
                    expect(result.length).toBe(COUNT);

                    // ArrayUtils.setRecurringValue mocked, sieve won't be sieving.  Therefore this
                    // should just increment.
                    expect(result[0]).toBe(4);
                    expect(result[1]).toBe(5);
                    expect(result[2]).toBe(6);
                });
            });

        });

    });
});
