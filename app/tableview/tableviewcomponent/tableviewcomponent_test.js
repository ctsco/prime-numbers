describe("tableviewcomponent_test.js", function () {

    var component, $componentController, $rootScope, $compile;

    var multiplicationFilterSpy;

    beforeEach(function() {
        module('templates');
        module('primetables.tableview.component', function($provide) {
            multiplicationFilterSpy = jasmine.createSpy('multiplicationFilter');
            multiplicationFilterSpy.and.callFake(function(param1, param2) {
                return param1 + "_" + param2;
            });

            var mockFilter = function (filterName) {
                if (filterName === "multiplication") {
                    return multiplicationFilterSpy;
                }
            };

            $provide.value('$filter', mockFilter);
        });
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

        describe("contain a table of results", function() {
            var PRIMES = [2, 3, 5];

            beforeEach(function() {
                elementControllerInstance.primes = PRIMES;
                $rootScope.$apply();
            });

            describe("with a table header", function() {
                var HEADER_SELECTOR = ".UT-prime-header";

                it('for each prime and a blank', function() {
                    expect(element.find(HEADER_SELECTOR).length).toBe(4);
                });

                it('for a blank entry', function() {
                    expect(element.find(HEADER_SELECTOR).get(0).innerText).toBe("");
                });

                it('for each prime', function() {
                    expect(element.find(HEADER_SELECTOR).get(1).innerText).toBe("2");
                    expect(element.find(HEADER_SELECTOR).get(2).innerText).toBe("3");
                    expect(element.find(HEADER_SELECTOR).get(3).innerText).toBe("5");
                });
            });

            describe("with a row for each prime", function() {
                var ROW_SELECTOR = ".UT-prime-row";
                var ROW_CELL_SELECTOR = "td";

                it('should be one for each prime', function() {
                    expect(element.find(ROW_SELECTOR).length).toBe(3);
                });

                describe('and the first column displays the prime number', function() {
                    it('for the first row', function() {
                        expect(getRow(0).find(ROW_CELL_SELECTOR).get(0).innerText).toBe("2");
                    });

                    it('for the second row', function() {
                        expect(getRow(1).find(ROW_CELL_SELECTOR).get(0).innerText).toBe("3");
                    });

                    it('for the third row', function() {
                        expect(getRow(2).find(ROW_CELL_SELECTOR).get(0).innerText).toBe("5");
                    });
                });

                describe("each cell should apply the multiplication filter", function() {
                    // innerText is stubbed by the multiplicationFilterSpy defined at the top
                    // of this file.

                    describe("e.g. row 1 should multiply", function() {
                        it('2*2', function() {
                            expect(multiplicationFilterSpy).toHaveBeenCalledWith(2, 2);
                            expect(getRow(0).find(ROW_CELL_SELECTOR).get(1).innerText).toBe("2_2");
                        });

                        it('2*3', function() {
                            expect(multiplicationFilterSpy).toHaveBeenCalledWith(2, 3);
                            expect(getRow(0).find(ROW_CELL_SELECTOR).get(2).innerText).toBe("2_3");
                        });

                        it('2*5', function() {
                            expect(multiplicationFilterSpy).toHaveBeenCalledWith(2, 5);
                            expect(getRow(0).find(ROW_CELL_SELECTOR).get(3).innerText).toBe("2_5");
                        });
                    });

                    describe("e.g. row 2 should multiply", function() {
                        it('3*2', function() {
                            expect(multiplicationFilterSpy).toHaveBeenCalledWith(3, 2);
                            expect(getRow(1).find(ROW_CELL_SELECTOR).get(1).innerText).toBe("3_2");
                        });

                        it('3*3', function() {
                            expect(multiplicationFilterSpy).toHaveBeenCalledWith(3, 3);
                            expect(getRow(1).find(ROW_CELL_SELECTOR).get(2).innerText).toBe("3_3");
                        });

                        it('3*5', function() {
                            expect(multiplicationFilterSpy).toHaveBeenCalledWith(3, 5);
                            expect(getRow(1).find(ROW_CELL_SELECTOR).get(3).innerText).toBe("3_5");
                        });
                    });

                    describe("e.g. row 3 should multiply", function() {
                        it('5*2', function() {
                            expect(multiplicationFilterSpy).toHaveBeenCalledWith(5, 2);
                            expect(getRow(2).find(ROW_CELL_SELECTOR).get(1).innerText).toBe("5_2");
                        });

                        it('5*3', function() {
                            expect(multiplicationFilterSpy).toHaveBeenCalledWith(5, 3);
                            expect(getRow(2).find(ROW_CELL_SELECTOR).get(2).innerText).toBe("5_3");
                        });

                        it('5*5', function() {
                            expect(multiplicationFilterSpy).toHaveBeenCalledWith(5, 5);
                            expect(getRow(2).find(ROW_CELL_SELECTOR).get(3).innerText).toBe("5_5");
                        });
                    });

                });

                function getRow(rowIndex) {
                    var row = element.find(ROW_SELECTOR).get(rowIndex);
                    return angular.element(row);
                }
            });
        });

    });

    describe("populateTable()", function() {

        var mockPrimeGenerator = {};
        var MOCK_PRIME_COUNT = 123;
        var MOCK_PRIME_NUMBERS = [100, 200, 300];

        beforeEach(function() {
            mockPrimeGenerator.generatePrimeNumbers
                = jasmine.createSpy('generatePrimeNumbers').and.returnValue(MOCK_PRIME_NUMBERS);

            initialiseComponent({PrimeGenerator: mockPrimeGenerator});

            component.enteredPrimeCount = MOCK_PRIME_COUNT;
            component.populateTable();
        });

        describe("should call PrimeGenerator.generatePrimeNumbers", function() {

            it('passing the enteredPrimeCount', function() {
                expect(mockPrimeGenerator.generatePrimeNumbers).toHaveBeenCalledWith(MOCK_PRIME_COUNT);
            });

            it('and assign the response to controller.primes', function() {
                expect(component.primes).toBe(MOCK_PRIME_NUMBERS);
            });

            it('and assign the last prime number to controller.lastPrime', function() {
                expect(component.lastPrime).toBe(300);
            });

        });

    });

});