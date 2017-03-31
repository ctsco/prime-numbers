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

        describe("a validation message should", function() {
            var VALIDATION_SELECTOR = ".UT-validation-message";

            it('displayed when displayValidationMessage is true', function() {
                elementControllerInstance.displayValidationMessage = true;
                $rootScope.$apply();
                expect(element.find(VALIDATION_SELECTOR).length).toBe(1);
            });

            it('not displayed when displayValidationMessage is false', function() {
                elementControllerInstance.displayValidationMessage = false;
                $rootScope.$apply();
                expect(element.find(VALIDATION_SELECTOR).length).toBe(0);
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

        it('should set the initial selectedVerticalPage to 0', function() {
            expect(component.selectedVerticalPage).toBe(0);
        });

        it('should set the initial selectedHorizontalPage to 0', function() {
            expect(component.selectedHorizontalPage).toBe(0);
        });

        it('should set the pageSize to 10', function() {
            expect(component.pageSize).toBe(10);
        });

        it('should enablePaging by default', function() {
            expect(component.enablePaging).toBe(true);
        });

        it('should set displayValidationMessage to false by default', function() {
            expect(component.displayValidationMessage).toBe(false);
        });
    });

    describe("populateTable()", function() {

        var mockPrimeGenerator = {};
        var mockNumberUtils = {};
        var MOCK_PRIME_COUNT = 123;
        var mockPrimeNumbers = [];

        beforeEach(function() {
            mockPrimeNumbers = [];

            for(var index = 0; index<123; index++) {
                mockPrimeNumbers.push(index);
            };

            mockPrimeGenerator.generatePrimeNumbers
                = jasmine.createSpy('generatePrimeNumbers').and.returnValue(mockPrimeNumbers);

            initialiseComponent({PrimeGenerator: mockPrimeGenerator, NumberUtils: mockNumberUtils});

            mockNumberUtils.isValidPositiveNumber = jasmine.createSpy('isValidPositiveNumber')

            component.selectedVerticalPage = 100;
            component.selectedHorizontalPage = 100;

            component.enteredPrimeCount = MOCK_PRIME_COUNT;
        });

        it('should ensure NumberUtils.isValidPositiveNumber is called, passing the user input', function() {
            component.populateTable();
            expect(mockNumberUtils.isValidPositiveNumber).toHaveBeenCalledWith(MOCK_PRIME_COUNT);
        });

        describe("When the user input is a valid number", function() {

            beforeEach(function() {
                mockNumberUtils.isValidPositiveNumber.and.returnValue(true);
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

            it('should set the selectedVerticalPage to 0', function() {
                expect(component.selectedVerticalPage).toBe(0);
            });

            it('should set the selectedHorizontalPage to 0', function() {
                expect(component.selectedHorizontalPage).toBe(0);
            });

            it('should set displayValidationMessage to false', function() {
                expect(component.displayValidationMessage).toBe(false);
            });
        });

        describe("When the user input is not a valid number", function() {
            beforeEach(function() {
                mockNumberUtils.isValidPositiveNumber.and.returnValue(false);
                component.populateTable();
            });

            it('it should not call mockPrimeGenerator.generatePrimeNumbers', function() {
                expect(mockPrimeGenerator.generatePrimeNumbers).not.toHaveBeenCalled();
            });

            it('should set displayValidationMessage to true', function() {
                expect(component.displayValidationMessage).toBe(true);
            });
        });

    });

    describe("getVerticalPageStart()", function() {

        beforeEach(function() {
            initialiseComponent();
            component.$onInit();
        });

        describe("When enablePaging is true", function() {

            beforeEach(function() {
                component.enablePaging = true;
            });

            describe('the result should be selectedVerticalPage * pageSize', function() {

                it('e.g. when selectedVerticalPage is 0, result should be 0', function() {
                    component.selectedVerticalPage = 0;
                    expect(component.getVerticalPageStart()).toBe(0);
                });

                it('e.g. when selectedVerticalPage is 5, result should be 50', function() {
                    component.selectedVerticalPage = 5;
                    expect(component.getVerticalPageStart()).toBe(50);
                });

                it('e.g. when selectedVerticalPage is 100, result should be 1000', function() {
                    component.selectedVerticalPage = 100;
                    expect(component.getVerticalPageStart()).toBe(1000);
                });

            });

        });

        describe("When enablePaging is false", function() {

            beforeEach(function() {
                component.enablePaging = false;
            });

            it('the result should be 0', function() {
                component.selectedVerticalPage = 100;
                expect(component.getVerticalPageStart()).toBe(0);
            });

        });

    });

    describe("getHorizontalPageStart()", function() {

        beforeEach(function() {
            initialiseComponent();
            component.$onInit();
        });

        describe("When enablePaging is true", function() {

            beforeEach(function() {
                component.enablePaging = true;
            });

            describe('the result should be selectedHorizontalPage * pageSize', function() {

                it('e.g. when selectedHorizontalPage is 0, result should be 0', function() {
                    component.selectedHorizontalPage = 0;
                    expect(component.getHorizontalPageStart()).toBe(0);
                });

                it('e.g. when selectedHorizontalPage is 5, result should be 50', function() {
                    component.selectedHorizontalPage = 5;
                    expect(component.getHorizontalPageStart()).toBe(50);
                });

                it('e.g. when selectedHorizontalPage is 100, result should be 1000', function() {
                    component.selectedHorizontalPage = 100;
                    expect(component.getHorizontalPageStart()).toBe(1000);
                });

            });

        });

        describe("When enablePaging is false", function() {

            beforeEach(function() {
                component.enablePaging = false;
            });

            it('the result should be 0', function() {
                component.selectedHorizontalPage = 100;
                expect(component.getHorizontalPageStart()).toBe(0);
            });

        });

    });

    describe("getPageSize()", function() {

        beforeEach(function() {
            initialiseComponent();
            component.$onInit();
        });

        it('when enablePaging is true, 10 should be returned', function() {
            component.enablePaging = true;
            expect(component.getPageSize()).toBe(10);
        });

        describe('when enablePaging is false', function() {

            beforeEach(function() {
                component.enablePaging = false;
            });

            it('and primes are defined, the prime count should be returned', function() {
                component.primes = [0, 1, 2, 3];
                expect(component.getPageSize()).toBe(4);
            });

            it('and primes are undefined, 0 should be returned', function() {
                component.primes = undefined;
                expect(component.getPageSize()).toBe(0);
            });

        });

    });
});