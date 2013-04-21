describeComponent('lib/flight-storage', function () {
  
  beforeEach(function() {
    setupComponent();
  });

  ['localstorage'].forEach(function(adapter) {
  	describe('Adapter "' + adapter + '"', function() {

  		it("should behave in this way", function() {
  			expect(true).toBe(true)
  		});

  	});
  });

});