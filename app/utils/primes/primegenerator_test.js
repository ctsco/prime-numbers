describe('primegenerator_test.js', function () {

    var PrimeGenerator;
    var mockPrimeUtils = {};

    beforeEach(function () {
        module('primetables.utils.primes.generator');

        module(function ($provide) {
            $provide.value("PrimeUtils", mockPrimeUtils);
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

    });
});
