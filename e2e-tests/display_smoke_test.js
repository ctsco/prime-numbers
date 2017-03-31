'use strict';

describe('display_smoke_test', function() {

    var tableViewPage = require("./pageobjects/table_view_page.js");

    it('Setup - visit page', function() {
        tableViewPage.action.visitPage();
    });

    describe("Once the user has entered a valid prime count", function() {

        it('and clicked the button', function() {
            tableViewPage.action.enterInput(3);
            tableViewPage.action.clickGenerateButton();
        });

        describe("A table should be displayed", function() {

            it('with a blank header', function() {
                expect(tableViewPage.get.headerCellText(0)).toBe("");
            });

            it('with a header for each prime', function() {
                expect(tableViewPage.get.headerCellText(1)).toBe("2")
                expect(tableViewPage.get.headerCellText(2)).toBe("3");
                expect(tableViewPage.get.headerCellText(3)).toBe("5");
            });

            it('headers should be 1 more than primes, to account for the blank', function() {
                expect(tableViewPage.get.headerCount()).toBe(4);
            });

            describe('with a row for each prime', function() {

                it('row for each prime', function() {
                    expect(tableViewPage.get.rowCount()).toBe(3);
                });

                it('where the first column is the prime number', function() {
                    expect(tableViewPage.get.rowCellText(0, 0)).toBe("2")
                    expect(tableViewPage.get.rowCellText(1, 0)).toBe("3");
                    expect(tableViewPage.get.rowCellText(2, 0)).toBe("5");
                });

                describe('and each cell is a multiplication of the column prime value', function() {
                    it("for row 1", function() {
                        expect(tableViewPage.get.rowCellText(0, 1)).toBe("4")
                        expect(tableViewPage.get.rowCellText(0, 2)).toBe("6");
                        expect(tableViewPage.get.rowCellText(0, 3)).toBe("10");
                    });

                    it("for row 2", function() {
                        expect(tableViewPage.get.rowCellText(1, 1)).toBe("6")
                        expect(tableViewPage.get.rowCellText(1, 2)).toBe("9");
                        expect(tableViewPage.get.rowCellText(1, 3)).toBe("15");
                    });

                    it("for row 3", function() {
                        expect(tableViewPage.get.rowCellText(2, 1)).toBe("10")
                        expect(tableViewPage.get.rowCellText(2, 2)).toBe("15");
                        expect(tableViewPage.get.rowCellText(2, 3)).toBe("25");
                    });
                });

            });

        });

    });

    describe("Changing the input number and regenerating", function() {

        it('Setup - Enter new number and regenerate', function() {
            tableViewPage.action.clearInput();
            tableViewPage.action.enterInput(5);
            tableViewPage.action.clickGenerateButton();
        });

        it('should update the table', function() {
            expect(tableViewPage.get.headerCellText(1)).toBe("2")
            expect(tableViewPage.get.headerCellText(2)).toBe("3");
            expect(tableViewPage.get.headerCellText(3)).toBe("5");
            expect(tableViewPage.get.headerCellText(4)).toBe("7");
            expect(tableViewPage.get.headerCellText(5)).toBe("11");
        });

    });

});
