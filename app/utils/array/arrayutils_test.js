describe('arrayutils_test.js', function () {

    beforeEach(module('primetables.utils.array'));

    var ArrayUtils;

    beforeEach(inject(function (_ArrayUtils_) {
        ArrayUtils = _ArrayUtils_;
    }));

    describe("setRecurringValue", function() {

        it('should throw an error when the array is undefined', function() {
            expect(function() {
                ArrayUtils.setRecurringValue(undefined, 1, 1, 1, 1)
            }).toThrow("array cannot be undefined");
        });

    });

});
