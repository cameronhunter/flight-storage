require(['lib/adapters'], function(Adapters) {
  
  var adapters = (new Adapters()).availableAdapters();

  describeComponent('lib/manager', function () {

    describe('Adapter API', function() {
      adapters.forEach(function(adapter) {

        beforeEach(function() {
          setupComponent({
            adapter: adapter
          });
        });

        describe('Adapter "' + adapter + '"', function() {
          it('should support `get(key)`', function() {
            expect(this.component.get).toBeDefined();
          });

          it('should support `set(key, value)`', function() {
            expect(this.component.set).toBeDefined();
          });

          it('should support `remove(key)`', function() {
            expect(this.component.remove).toBeDefined();
          });

          it('should support `clear()`', function() {
            expect(this.component.clear).toBeDefined();
          });

          it('should support `exists(key)`', function() {
            expect(this.component.exists).toBeDefined();
          });
        });
      });

    });
  });
});