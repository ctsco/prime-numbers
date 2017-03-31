'use strict';

describe('paging_smoke_test', function() {

    var tableViewPage = require("./pageobjects/table_view_page.js");

    it('Setup - visit page', function() {
        tableViewPage.action.visitPage();
    });

    describe("Once the user has entered a valid (large) prime count", function() {

        it('and clicked the button', function() {
            tableViewPage.action.enterInput(10000);
            tableViewPage.action.clickGenerateButton();
        });

        describe("A table should be displayed", function() {

            it('with a blank header', function() {
                expect(tableViewPage.get.headerCellText(0)).toBe("");
            });

            it('with a header for each prime, up the max page size of 10', function() {
                expect(tableViewPage.get.headerCellText(1)).toBe("2")
                expect(tableViewPage.get.headerCellText(2)).toBe("3");
                expect(tableViewPage.get.headerCellText(3)).toBe("5");
                expect(tableViewPage.get.headerCellText(4)).toBe("7");
                expect(tableViewPage.get.headerCellText(5)).toBe("11");
                expect(tableViewPage.get.headerCellText(6)).toBe("13");
                expect(tableViewPage.get.headerCellText(7)).toBe("17");
                expect(tableViewPage.get.headerCellText(8)).toBe("19");
                expect(tableViewPage.get.headerCellText(9)).toBe("23");
                expect(tableViewPage.get.headerCellText(10)).toBe("29");

            });

            it('headers should be 1 more than primes, to account for the blank', function() {
                expect(tableViewPage.get.headerCount()).toBe(11);
            });

            describe('with a row for each prime, up to the max page size of 10', function() {

                it('row for each prime', function() {
                    expect(tableViewPage.get.rowCount()).toBe(10);
                });

                it('where the first column is the prime number', function() {
                    expect(tableViewPage.get.rowCellText(0, 0)).toBe("2");
                    expect(tableViewPage.get.rowCellText(1, 0)).toBe("3");
                    expect(tableViewPage.get.rowCellText(2, 0)).toBe("5");
                    expect(tableViewPage.get.rowCellText(3, 0)).toBe("7");
                    expect(tableViewPage.get.rowCellText(4, 0)).toBe("11");
                    expect(tableViewPage.get.rowCellText(5, 0)).toBe("13");
                    expect(tableViewPage.get.rowCellText(6, 0)).toBe("17");
                    expect(tableViewPage.get.rowCellText(7, 0)).toBe("19");
                    expect(tableViewPage.get.rowCellText(8, 0)).toBe("23");
                    expect(tableViewPage.get.rowCellText(9, 0)).toBe("29");

                });

                describe('and each cell is a multiplication of the column prime value', function() {
                    it("for row 10", function() {
                        expect(tableViewPage.get.rowCellText(9, 1)).toBe("58");
                        expect(tableViewPage.get.rowCellText(9, 2)).toBe("87");
                        expect(tableViewPage.get.rowCellText(9, 3)).toBe("145");
                        expect(tableViewPage.get.rowCellText(9, 4)).toBe("203")
                        expect(tableViewPage.get.rowCellText(9, 5)).toBe("319");
                        expect(tableViewPage.get.rowCellText(9, 6)).toBe("377");
                        expect(tableViewPage.get.rowCellText(9, 7)).toBe("493")
                        expect(tableViewPage.get.rowCellText(9, 8)).toBe("551");
                        expect(tableViewPage.get.rowCellText(9, 9)).toBe("667");
                        expect(tableViewPage.get.rowCellText(9, 10)).toBe("841");
                    });
                });

            });

            describe('10000 pages should be generated for', function() {
                it('the vertical paging', function() {
                    expect(tableViewPage.get.verticalOptionCount()).toBe(1000);
                });

                it('the horizontal paging', function() {
                    expect(tableViewPage.get.horizontalOptionCount()).toBe(1000);
                });
            });

            describe("Changing the vertical page should", function() {
                it('update the vertical rows', function() {
                    tableViewPage.action.setVerticalPage(1);

                    expect(tableViewPage.get.rowCellText(0, 0)).toBe("31");
                    expect(tableViewPage.get.rowCellText(1, 0)).toBe("37");
                });
            });

            describe("Changing the horizontal page should", function() {
                it('update the horizontal rows', function() {
                    tableViewPage.action.setHorizontalPage(2);

                    expect(tableViewPage.get.headerCellText(1)).toBe("73");
                    expect(tableViewPage.get.headerCellText(2)).toBe("79");
                });
            });

        });

    });

    describe("Changing the input number and regenerating", function() {

        it('Setup - Enter new number and regenerate', function() {
            tableViewPage.action.clearInput();
            tableViewPage.action.enterInput(25);
            tableViewPage.action.clickGenerateButton();
        });

        it('should update the vertical page count', function() {
            expect(tableViewPage.get.verticalOptionCount()).toBe(3);
        });

        it('should update the horizontal page count', function() {
            expect(tableViewPage.get.horizontalOptionCount()).toBe(3);
        });
    });

});
