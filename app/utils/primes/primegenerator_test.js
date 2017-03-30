describe('primegenerator_test.js', function () {

    beforeEach(module('primetables.utils.primes.generator'));

    var PrimeGenerator;

    beforeEach(inject(function (_PrimeGenerator_) {
        PrimeGenerator = _PrimeGenerator_;
    }));

    describe("generatePrimeNumbers()", function() {

        describe("should return an empty array when", function() {

            it('count is 0', function() {
                expect(PrimeGenerator.generatePrimeNumbers(0)).toBe([]);
            });

            it('count is less than 0', function() {
                expect(PrimeGenerator.generatePrimeNumbers(-1)).toBe([]);
            });

        });

    });
});
