var TableViewPage = function () {

    var ELEMENTS = {
        PRIME_COUNT_INPUT: element(By.css('.E2E-prime-count-input')),
        GENERATE_PRIMES_BUTTON: element(By.css('.E2E-populate-table')),
        HEADER_CELLS: element.all(By.css('.E2E-prime-header')),
        ROWS: element.all(By.css('.E2E-prime-row')),
        VERTICAL_PAGE_SELECT: element(By.css('.E2E-vertical-page-select')),
        VERTICAL_PAGE_SELECT_OPTIONS: element.all(By.css('.E2E-vertical-page-select option')),
        HORIZONTAL_PAGE_SELECT: element(By.css('.E2E-horizontal-page-select')),
        HORIZONTAL_PAGE_SELECT_OPTIONS: element.all(By.css('.E2E-horizontal-page-select option'))
    };

    var LOCATORS = {
        ROW_CELL: By.css('.E2E-prime-cell')
    };

    this.action = {
        visitPage: function() {
            return browser.get(browser.baseUrl + "#!/table");
        },

        clearInput: function() {
            return ELEMENTS.PRIME_COUNT_INPUT.clear();
        },

        enterInput: function(input) {
            return ELEMENTS.PRIME_COUNT_INPUT.sendKeys(input);
        },

        clickGenerateButton: function() {
            return ELEMENTS.GENERATE_PRIMES_BUTTON.click();
        },

        setVerticalPage: function(pageNumber) {
            return ELEMENTS.VERTICAL_PAGE_SELECT_OPTIONS.get(pageNumber).click();
        },

        setHorizontalPage: function(pageNumber) {
            return ELEMENTS.HORIZONTAL_PAGE_SELECT_OPTIONS.get(pageNumber).click();
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
        },

        verticalOptionCount: function() {
            return ELEMENTS.VERTICAL_PAGE_SELECT_OPTIONS.count();
        },

        horizontalOptionCount: function() {
            return ELEMENTS.HORIZONTAL_PAGE_SELECT_OPTIONS.count();
        }
    }

};

module.exports = new TableViewPage();
