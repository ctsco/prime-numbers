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

        var element;

        beforeEach(function() {
            var parentScope = $rootScope.$new();

            element = angular.element('<table-view></table-view>');
            initialiseComponent({$element: element});

            $compile(element)(parentScope);
            parentScope.$digest();
        });

        describe("contain a button to populate the table", function() {

            var BUTTON_SELECTOR = ".UT-populate-table";

            it('should be present', function() {
                expect(element.find(BUTTON_SELECTOR).length).toBe(1);
            });

            it('which should call the populateTable function when clicked', function() {
                spyOn(component, "populateTable");

                var populateTableButton = element.find(BUTTON_SELECTOR)[0];
                populateTableButton.triggerHandler("click");

                expect(component.populateTable).toHaveBeenCalled();
            });

        });

    });

});