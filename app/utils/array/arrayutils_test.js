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

            it('should throw an error when endIndex is before startIndex', function() {
                var START_INDEX = 2;
                var END_INDEX = 1;

                expect(function() {
                    ArrayUtils.setRecurringValue([], START_INDEX, END_INDEX, 1, 1)
                }).toThrow("endIndex cannot be before startIndex");
            });

        });

        describe("should update the array passed into the function", function() {

            describe("between the specified start and end index", function() {

                var VALUE = "MyValue";
                var array;

                beforeEach(function() {
                    array = [];
                });

                it('when the start and end index are the same', function() {
                    var START_INDEX = 0;
                    var END_INDEX = 0;

                    ArrayUtils.setRecurringValue(array, START_INDEX, END_INDEX, 1, VALUE);

                    expect(array.length).toBe(1);
                    expect(array[START_INDEX]).toBe(VALUE);
                });

                it('when the start and end index are not the same', function() {
                    var START_INDEX = 0;
                    var END_INDEX = 3;

                    ArrayUtils.setRecurringValue(array, START_INDEX, END_INDEX, 1, VALUE);

                    expect(array.length).toBe(4);

                    expect(array[0]).toBe(VALUE);
                    expect(array[1]).toBe(VALUE);
                    expect(array[2]).toBe(VALUE);
                    expect(array[3]).toBe(VALUE);
                });

                it('when the start is greater than 0', function() {
                    var START_INDEX = 1000;
                    var END_INDEX = 1001;

                    ArrayUtils.setRecurringValue(array, START_INDEX, END_INDEX, 1, VALUE);

                    expect(array.length).toBe(2);

                    expect(array[1000]).toBe(VALUE);
                    expect(array[1001]).toBe(VALUE);
                });
            });

            describe("taking into consideration the increment", function() {

            });

            describe("with the value passed in", function() {

            });

        });


    });

});
