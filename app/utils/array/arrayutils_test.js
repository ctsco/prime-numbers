describe('arrayutils_test.js', function () {

    beforeEach(module('primetables.utils.array'));

    var ArrayUtils;

    beforeEach(inject(function (_ArrayUtils_) {
        ArrayUtils = _ArrayUtils_;
    }));

    describe("setRecurringValue", function() {

        describe("should throw an error when", function() {

            it('should throw an error when the array is undefined', function() {
                expect(function() {
                    ArrayUtils.setRecurringValue(undefined, 1, 1, 1, 1)
                }).toThrow("array cannot be undefined");
            });

            it('should throw an error when startIndex is undefined', function() {
                expect(function() {
                    ArrayUtils.setRecurringValue([], undefined, 1, 1, 1)
                }).toThrow("startIndex cannot be undefined");
            });

            it('should throw an error when endIndex is undefined', function() {
                expect(function() {
                    ArrayUtils.setRecurringValue([], 1, undefined, 1, 1)
                }).toThrow("endIndex cannot be undefined");
            });

            it('should throw an error when increment is undefined', function() {
                expect(function() {
                    ArrayUtils.setRecurringValue([], 1, 1, undefined, 1)
                }).toThrow("increment cannot be undefined");
            });

        });

    });

});
