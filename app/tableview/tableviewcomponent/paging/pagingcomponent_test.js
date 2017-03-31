describe("pagingcomponent_test.js", function () {

    var component, $componentController, $rootScope, $compile;

    beforeEach(function() {
        module('templates');
        module('primetables.tableview.component.paging');
    });

    beforeEach(inject(function (_$rootScope_, _$compile_,  _$componentController_) {
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

    describe("The view should", function() {

        var element, elementControllerInstance;
        var parentScope;

        beforeEach(function() {
            parentScope = $rootScope.$new();

            parentScope.enablePaging = true;

            element = angular.element('<paging enable-paging="enablePaging"></paging>');
            initialiseComponent({$element: element});

            $compile(element)(parentScope);
            parentScope.$digest();

            elementControllerInstance = element.controller('paging');
        });

        describe("contain an checkbox", function() {
            var INPUT_SELECTOR = ".UT-enable-paging";

            it('should be present', function() {
                expect(element.find(INPUT_SELECTOR).length).toBe(1);
            });

            it('which should be bound to $ctrl.enablePaging', function() {
                expect(parentScope.enablePaging).toBe(true);
            });

            it('which should update parentScope using two way bindingwhen changed', function() {
                element.find(INPUT_SELECTOR).click();
                expect(parentScope.enablePaging).toBe(false);
            });
        });

    });

});