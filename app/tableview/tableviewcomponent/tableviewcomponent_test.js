describe("tableviewcomponent_test.js", function () {

    var component, $componentController, $rootScope, $compile;

    beforeEach(function() {
        module('templates');
        module('primetables.tableview.component');
    });

    beforeEach(inject(function (_$rootScope_, _$compile_,  _$componentController_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $componentController = _$componentController_;
    }));

    function initialiseComponent(locals, bindings) {
        component = $componentController('tableView', locals, bindings);
    }

    describe("Initialisation", function () {
        it('an instance of the tableViewComponent should be injectable', function () {
            initialiseComponent();
            expect(component).not.toBe(undefined);
        });
    });

    describe("The view should", function() {

        var element, elementControllerInstance;

        beforeEach(function() {
            var parentScope = $rootScope.$new();

            element = angular.element('<table-view></table-view>');
            initialiseComponent({$element: element});

            $compile(element)(parentScope);
            parentScope.$digest();

            elementControllerInstance = element.controller('tableView');
        });

        describe("contain an input field", function() {
            var INPUT_SELECTOR = ".UT-prime-count-input";

            it('should be present', function() {
                expect(element.find(INPUT_SELECTOR).length).toBe(1);
            });

            it('which should be bound to $ctrl.enteredPrimeCount', function() {
                element.find(INPUT_SELECTOR).val(100).trigger('input');
                expect(elementControllerInstance.enteredPrimeCount).toBe('100');
            });
        });

        describe("contain a button to populate the table", function() {
            var BUTTON_SELECTOR = ".UT-populate-table";

            it('should be present', function() {
                expect(element.find(BUTTON_SELECTOR).length).toBe(1);
            });

            it('which should call the populateTable function when clicked', function() {
                spyOn(elementControllerInstance, "populateTable");

                element.find(BUTTON_SELECTOR).click();
                expect(elementControllerInstance.populateTable).toHaveBeenCalled();
            });
        });

    });

    describe("$onInit", function() {

        beforeEach(function() {
            component.$onInit();
        });

        it('should create an initial pages object', function() {
            expect(component.pages).toEqual([0]);
        });

        it('should set the initial vertical page to 0', function() {
            expect(component.verticalPage).toBe(0);
        });

        it('should set the initial horizontal page to 0', function() {
            expect(component.verticalPage).toBe(0);
        })

        it('should set the pageSize to 10', function() {
            expect(component.pageSize).toBe(10);
        });

        it('should enablePaging by default', function() {
            expect(component.enablePaging).toBe(true);
        });
    });

    describe("populateTable()", function() {

        var mockPrimeGenerator = {};
        var MOCK_PRIME_COUNT = 123;
        var mockPrimeNumbers = [];

        beforeEach(function() {
            mockPrimeNumbers = [];

            for(var index = 0; index<123; index++) {
                mockPrimeNumbers.push(index);
            };

            mockPrimeGenerator.generatePrimeNumbers
                = jasmine.createSpy('generatePrimeNumbers').and.returnValue(mockPrimeNumbers);

            initialiseComponent({PrimeGenerator: mockPrimeGenerator});

            component.enteredPrimeCount = MOCK_PRIME_COUNT;
            component.populateTable();
        });

        describe("should call PrimeGenerator.generatePrimeNumbers", function() {

            it('passing the enteredPrimeCount', function() {
                expect(mockPrimeGenerator.generatePrimeNumbers).toHaveBeenCalledWith(MOCK_PRIME_COUNT);
            });

            it('and assign the response to controller.primes', function() {
                expect(component.primes).toBe(mockPrimeNumbers);
            });

            it('and assign the last prime number to controller.lastPrime', function() {
                expect(component.lastPrime).toBe(122);
            });

            it('and calculate the pageCount', function() {
                expect(component.pageCount).toBe(13);
            });

            it('and populate a page array containing a number for each page', function() {
                expect(component.pages.length).toBe(13);

                for(var x=0; x<component.pages.length; x++) {
                    expect(component.pages[x]).toBe(x);
                }
            })

        });

    });

});