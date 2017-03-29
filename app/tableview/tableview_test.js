'use strict';

describe('tableview module', function() {

  beforeEach(module('primetables.tableview'));

  describe('TableView controller', function(){

    it('should be defined', inject(function($controller) {
      var tableViewCtrl = $controller('TableViewCtrl');
      expect(tableViewCtrl).toBeDefined();
    }));

  });
});