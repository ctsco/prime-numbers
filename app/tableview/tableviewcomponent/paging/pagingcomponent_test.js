describe("pagingcomponent_test.js", function () {

    var component, $componentController, $rootScope, $compile;

    var ENABLE_PAGING = true;
    var SELECTED_VERTICAL_PAGE = 4;
    var SELECTED_HORIZONTAL_PAGE = 2;
    var PAGES = [0, 1, 2, 3, 4];

    beforeEach(function () {
        module('templates');
        module('primetables.tableview.component.paging');
    });

    beforeEach(inject(function (_$rootScope_, _$compile_, _$componentController_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $componentController = _$componentController_;
    }));

    function initialiseComponent(locals, bindings) {
        component = $componentController('paging', locals, bindings);
    }

    describe("Initialisation", function () {
        it('an instance of the pagingComponent should be injectable', function () {
            initialiseComponent();
            expect(component).not.toBe(undefined);
        });
    });

    describe("The view should", function () {

        var element, elementControllerInstance;
        var parentScope;

        beforeEach(function () {
            parentScope = $rootScope.$new();

            parentScope.enablePaging = ENABLE_PAGING;
            parentScope.pages = PAGES;
            parentScope.selectedVerticalPage = SELECTED_VERTICAL_PAGE;
            parentScope.selectedHorizontalPage = SELECTED_HORIZONTAL_PAGE;

            element = angular.element(
                '<paging enable-paging="enablePaging" pages="pages"' +
                'selected-vertical-page="selectedVerticalPage"' +
                'selected-horizontal-page="selectedHorizontalPage"></paging>');
            initialiseComponent({$element: element});

            $compile(element)(parentScope);
            parentScope.$digest();

            elementControllerInstance = element.controller('paging');
        });

        describe("contain an checkbox", function () {
            var INPUT_SELECTOR = ".UT-enable-paging";

            it('should be present', function () {
                expect(element.find(INPUT_SELECTOR).length).toBe(1);
            });

            it('which should be bound to $ctrl.enablePaging', function () {
                expect(parentScope.enablePaging).toBe(true);
            });

            it('which should update parentScope using two way bindingwhen changed', function () {
                element.find(INPUT_SELECTOR).click();
                expect(parentScope.enablePaging).toBe(false);
            });
        });

        describe("contain some paging options", function () {
            var PAGING_OPTIONS = ".UT-paging-options";

            beforeEach(function () {
                parentScope.enablePaging = true;
                parentScope.$apply();
            });

            it('when enablePaging is true', function () {
                expect(element.find(PAGING_OPTIONS).length).toBe(1);
            });

            describe("and a select box for the vertical page", function () {

                var VERTICAL_PAGE_SELECT = ".UT-vertical-page-select";

                it('should be displayed', function () {
                    expect(element.find(VERTICAL_PAGE_SELECT).length).toBe(1);
                });

                it('which the selectedValue should be bound to $ctrl.selectedVerticalPage', function () {
                    expect(parentScope.selectedVerticalPage).toBe(SELECTED_VERTICAL_PAGE);
                });

                it('which should update parentScope using two way bindingwhen changed', function () {
                    element.find(VERTICAL_PAGE_SELECT).val('number:2').trigger('change');
                    expect(parentScope.selectedVerticalPage).toBe(2);
                });

                it('which should have the options bound to $ctrl.pages', function () {
                    var verticalSelect = element.find(VERTICAL_PAGE_SELECT);
                    var options = angular.element(verticalSelect).find('option');

                    expect(options.length).toBe(5);
                });

            });

            describe("and a select box for the horizontal page", function () {

                var HORIZONTAL_PAGE_SELECT = ".UT-horizontal-page-select";

                it('should be displayed', function () {
                    expect(element.find(HORIZONTAL_PAGE_SELECT).length).toBe(1);
                });

                it('which the selectedValue should be bound to $ctrl.selectedHorizontalPage', function () {
                    expect(parentScope.selectedHorizontalPage).toBe(SELECTED_HORIZONTAL_PAGE);
                });

                it('which should update parentScope using two way bindingwhen changed', function () {
                    element.find(HORIZONTAL_PAGE_SELECT).val('number:2').trigger('change');
                    expect(parentScope.selectedHorizontalPage).toBe(2);
                });

                it('which should have the options bound to $ctrl.pages', function () {
                    var verticalSelect = element.find(HORIZONTAL_PAGE_SELECT);
                    var options = angular.element(verticalSelect).find('option');

                    expect(options.length).toBe(5);
                });

            });
        });

        describe("not contain some paging options", function () {
            var PAGING_OPTIONS = ".UT-paging-options";

            beforeEach(function () {
                parentScope.enablePaging = false;
                parentScope.$apply();
            });

            it('when enablePaging is false', function () {
                expect(element.find(PAGING_OPTIONS).length).toBe(0);
            });
        })

    });

});