require(['lib/adapters'], function(Adapters) {
  
  var adapters = (new Adapters()).availableAdapters();

  var events = {
    save: 'storage-save',
    get: 'storage-get',
    clear: 'storage-clear'
  };

  describeComponent('lib/manager', function () {

    describe('Event behaviour', function() {
      adapters.forEach(function(adapter) {

        beforeEach(function() {
          setupComponent({
            adapter: adapter,
            saveEvent: events.save,
            getEvent: events.get,
            clearEvent: events.clear
          });
        });

        describe('Adapter "' + adapter + '"', function() {

          it('should announce that data has been stored', function() {
            var eventSpy = spyOnEvent(document, events.save + '-success');
            this.component.trigger(events.save, {key:'foo', value:'bar'});
            expect(eventSpy).toHaveBeenTriggeredOn(document);
          });

          it('should announce that data has been retrieved', function() {
            var eventSpy = spyOnEvent(document, events.get + '-success');
            this.component.trigger(events.get, {key:'foo'});
            expect(eventSpy).toHaveBeenTriggeredOn(document);
          });

          it('should announce that data has been cleared', function() {
            var eventSpy = spyOnEvent(document, events.clear + '-success');
            this.component.trigger(events.clear);
            expect(eventSpy).toHaveBeenTriggeredOn(document);
          });

          it('should announce that data was not written', function() {
            spyOn(this.component, 'set').andThrow("I'm too full");
            var eventSpy = spyOnEvent(document, events.save + '-failure');
            this.component.trigger(events.save, {key:'foo', value:'bar'});
            expect(eventSpy).toHaveBeenTriggeredOn(document);
          });

          it('should announce that data was not retrieved', function() {
            spyOn(this.component, 'get').andThrow("Uh oh, couldn't read the data store");
            var eventSpy = spyOnEvent(document, events.get + '-failure');
            this.component.trigger(events.get, {key:'foo'});
            expect(eventSpy).toHaveBeenTriggeredOn(document);
          });

          it('should announce that data was not cleared', function() {
            spyOn(this.component, 'clear').andThrow("You'll never destroy me!");
            var eventSpy = spyOnEvent(document, events.clear + '-failure');
            this.component.trigger(events.clear);
            expect(eventSpy).toHaveBeenTriggeredOn(document);
          });

        });

      });

    });
  });

});