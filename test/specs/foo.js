require(['lib/adapters'], function(Adapters) {
  
  var adapters = (new Adapters()).availableAdapters();

  describeComponent('lib/flight-storage', function () {

    adapters.forEach(function(adapter) {

      beforeEach(function() {
        setupComponent({
          adapter: adapter
        });
      });

      describe('Adapter "' + adapter + '"', function() {
        describe('Adapter API', function() {
          it('should support get', function() {
            expect(this.component.get).toBeDefined()
          });

          it('should support set', function() {
            expect(this.component.set).toBeDefined()
          });

          it('should support clear', function() {
            expect(this.component.clear).toBeDefined()
          });
        });

        describe('Storage behaviour', function() {

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

        describe('Event behaviour', function() {
          it('should announce that data has been stored', function() {
            var eventSpy = spyOnEvent(document, 'storageDataStored');
            this.component.trigger('storageSet', {foo:'bar'});
            expect(eventSpy).toHaveBeenTriggeredOn(document);
          });
        });

      });

    });
  });

});