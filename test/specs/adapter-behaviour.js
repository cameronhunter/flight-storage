require(['lib/adapters'], function(Adapters) {
  
  var adapters = (new Adapters()).availableAdapters();

  describeComponent('lib/flight-storage', function () {

    describe('Storage behaviour', function() {
      adapters.forEach(function(adapter) {

        beforeEach(function() {
          setupComponent({
            adapter: adapter
          });
        });

        describe('Adapter "' + adapter + '"', function() {

          beforeEach(function() {
            this.component.clear();
          });

          it('should support storing simple data', function() {
            this.component.set('foo', 'bar');
            expect(this.component.get('foo')).toEqual('bar');
          });

          it('should support storing complex data', function() {
            this.component.set('foo', {bar: ['baz'], boo:1331});
            expect(this.component.get('foo')).toEqual({bar: ['baz'], boo:1331});
          });

          it('should support clearing all stored data', function() {
            this.component.set('foo', 'bar');
            expect(this.component.get('foo')).toEqual('bar');
            this.component.clear();
            expect(this.component.get('foo')).toBeUndefined();
          });
        });
      });

    });
  });
});