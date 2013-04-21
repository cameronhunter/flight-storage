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
            this.component.trigger('storageSet', {foo:'bar'});
            expect(eventSpy).toHaveBeenTriggeredOn(document);
          });
        });

      });

    });
  });

});