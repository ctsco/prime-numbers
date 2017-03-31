var TableViewPage = function () {

    var ELEMENTS = {
        PRIME_COUNT_INPUT: element(By.css('.E2E-prime-count-input')),
        GENERATE_PRIMES_BUTTON: element(By.css('.E2E-generate-primes-button')),
        HEADER_CELLS: element.all(By.css('.E2E-prime-header')),
        ROWS: element.all(By.css('.E2E-prime-row'))
    };

    var LOCATORS = {
        ROW_CELL: By.css('.E2E-prime-cell')
    };

    this.action = {
        clearInput: function() {
            return ELEMENTS.PRIME_COUNT_INPUT.clear();
        },

        enterInput: function(input) {
            return ELEMENTS.PRIME_COUNT_INPUT.sendKeys(input);
        },

        clickGenerateButton: function() {
            return ELEMENTS.GENERATE_PRIMES_BUTTON.click();
        }
    };

    this.get = {
        headerCount: function() {
            return ELEMENTS.HEADER_CELLS.count();
        },

        rowCount: function() {
            return ELEMENTS.ROWS.count();
        },

        headerCellText: function(cellIndex) {
            return ELEMENTS.HEADER_CELLS.get(cellIndex).getText();
        },

        rowCellText: function(rowIndex, cellIndex) {
            var row = ELEMENTS.ROWS.get(rowIndex);
            return row.all(LOCATORS.ROW_CELL).get(cellIndex).getText();
        }
    }

};

module.exports = new TableViewPage();
