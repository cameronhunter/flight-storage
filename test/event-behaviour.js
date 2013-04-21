require(['lib/adapters'], function(Adapters) {
  
  var adapters = (new Adapters()).availableAdapters();

  describeComponent('lib/flight-storage', function () {

    describe('Event behaviour', function() {
      adapters.forEach(function(adapter) {

        beforeEach(function() {
          setupComponent({
            adapter: adapter
          });
        });

        describe('Adapter "' + adapter + '"', function() {

          it('should announce that data has been stored', function() {
            var eventSpy = spyOnEvent(document, 'storageDataStored');
            this.component.trigger('storageSet', {key:'foo', value:'bar'});
            expect(eventSpy).toHaveBeenTriggeredOn(document);
          });

          it('should announce that data has been retrieved', function() {
            var eventSpy = spyOnEvent(document, 'storageDataRetrieved');
            this.component.trigger('storageGet', {key:'foo'});
            expect(eventSpy).toHaveBeenTriggeredOn(document);
          });

          it('should announce that data has been cleared', function() {
            var eventSpy = spyOnEvent(document, 'storageDataCleared');
            this.component.trigger('storageClear');
            expect(eventSpy).toHaveBeenTriggeredOn(document);
          });

          it('should announce that data was not written', function() {
            spyOn(this.component, 'set').andThrow("I'm too full");
            var eventSpy = spyOnEvent(document, 'storageDataNotStored');
            this.component.trigger('storageSet', {key:'foo', value:'bar'});
            expect(eventSpy).toHaveBeenTriggeredOn(document);
          });          

        });

      });

    });
  });

});