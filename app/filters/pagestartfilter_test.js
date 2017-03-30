describe("multiplicationfilter_test.js", function () {

    beforeEach(module('primetables.filters.pagestart'));

    var filter;

    beforeEach(inject(function($injector) {
        filter = $injector.get('$filter')('pagestart');
    }));

    describe("pagestart filter should", function() {

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

});