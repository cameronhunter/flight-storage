require(['lib/adapters'], function(Adapters) {
  
  var adapters = (new Adapters()).availableAdapters();

  describeComponent('lib/flight-storage', function () {

    describe('Adapter API', function() {
      adapters.forEach(function(adapter) {

        beforeEach(function() {
          setupComponent({
            adapter: adapter
          });
        });

        describe('Adapter "' + adapter + '"', function() {
          it('should support get', function() {
            expect(this.component.get).toBeDefined();
          });

          it('should support set', function() {
            expect(this.component.set).toBeDefined();
          });

          it('should support clear', function() {
            expect(this.component.clear).toBeDefined();
          });
        });
      });

    });
  });
});