describe("pagestartfilter_test.js", function () {

    beforeEach(module('primetables.filters.pagestart'));

    var filter;

    beforeEach(inject(function($injector) {
        filter = $injector.get('$filter')('pagestart');
    }));

    describe("When array is defined, pagestart filter should", function() {

        var arrayMock;
        var SLICE_INDEX = 100;
        var MOCK_RETURN = "MOCK_RETURN";
        var result;

        beforeEach(function() {
            arrayMock = {
                slice: jasmine.createSpy("slice").and.returnValue(MOCK_RETURN)
            };

            result = filter(arrayMock, SLICE_INDEX);
        });

        it("slice the array, by startIndex", function() {
            expect(arrayMock.slice).toHaveBeenCalledWith(SLICE_INDEX);
        });

        it("return the sliced result", function() {
            expect(result).toBe(MOCK_RETURN);
        });

    });

    describe("When array is not defined, pagestart filter should", function() {

        var result;

        beforeEach(function() {
            result = filter(undefined, 1);
        });

        it("return undefined", function() {
            expect(result).toBe(undefined);
        });

    });

});