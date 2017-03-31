describe('numberutils_test.js', function () {

    beforeEach(module('primetables.utils.number'));

    var NumberUtils;

    beforeEach(inject(function (_NumberUtils_) {
        NumberUtils = _NumberUtils_;
    }));

    describe("isValidPositiveNumber()", function() {

        describe("should return true for", function() {

            it('a selection of valid positive numbers', function() {

                var positiveNumbers = [1, 5, 100, 1000, 100000];

                for(var x=0; x<positiveNumbers.length; x++) {
                    expect(NumberUtils.isValidPositiveNumber(positiveNumbers[x])).toBe(true);
                }
            });

        });

        describe("should return false for", function() {

            it('zero', function() {
                expect(NumberUtils.isValidPositiveNumber(0)).toBe(false);
            });

            it('a negative number', function() {
                expect(NumberUtils.isValidPositiveNumber(-1)).toBe(false);
            });

            it('a string', function() {
                expect(NumberUtils.isValidPositiveNumber("hello")).toBe(false);
            });

            it('a boolean', function() {
                expect(NumberUtils.isValidPositiveNumber(true)).toBe(false);
            });

            it('an object', function() {
                expect(NumberUtils.isValidPositiveNumber({test:'object'})).toBe(false);
            });

            it('an array', function() {
                expect(NumberUtils.isValidPositiveNumber([1, 2, 3])).toBe(false);
            });

        });

    });

});
