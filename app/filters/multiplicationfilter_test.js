describe("multiplicationfilter_test.js", function () {

    beforeEach(module('primetables.filters.multiplication'));

    var filter;

    beforeEach(inject(function($injector) {
        filter = $injector.get('$filter')('multiplication');
    }));

    describe("multiplication filter should", function() {

        describe("multiply two numbers together", function() {

            it('e.g. 2*2=4', function() {
                expect(filter(2, 2)).toBe(4);
            });

            it('e.g. 10*10=100', function() {
                expect(filter(10, 10)).toBe(100);
            });

            it('e.g. 1*0=0', function() {
                expect(filter(1, 0)).toBe(0);
            });

            it('e.g. 10000*1=10000', function() {
                expect(filter(10000, 1)).toBe(10000);
            });

            it('e.g. 2*2=4', function() {
                expect(filter(-10, 5)).toBe(-50);
            });
        });

    });

});