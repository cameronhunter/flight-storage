define([
  'flight/lib/component',
  'flight/lib/compose',
  'flight/lib/utils',
  'lib/adapters'
], function(defineComponent, compose, utils, withAdapters) {

  var StorageManager = defineComponent(storageManager, withAdapters);

  function storageManager() {

    this.defaultAttrs({
      adapter: 'local-storage',
      saveEvent: 'storage-save',
      getEvent: 'storage-get',
      clearEvent: 'storage-clear'
    });

    this.exists = function(key) {
      return !!this.get(key);
    };

    this.rescue = function(fn) {
      var action = fn.bind(this);
      return function(event, data) {
        try {
          action(event, data);
        } catch(e) {
          var payload = utils.merge({}, data, {error: e});
          this.trigger(event.type + '-failure', payload);
        }
      };
    };

    this.after('initialize', function() {

      // Mixin the requested storage adapter
      compose.mixin(this, [this.adapter(this.attr.adapter)]);

      this.on(this.attr.getEvent, this.rescue(function(e, data) {
        var value = this.get(data.key);
        this.trigger(this.attr.getEvent + '-success', {key:data.key, value:value});
      }));

      this.on(this.attr.saveEvent, this.rescue(function(e, data) {
        var key = data.key, value = data.value;
        delete data[key];
        delete data[value];
        this.set(key, value, data);
        this.trigger(this.attr.saveEvent + '-success', data);
      }));

      this.on(this.attr.clearEvent, this.rescue(function() {
        this.clear();
        this.trigger(this.attr.clearEvent + '-success');
      }));
    });

  }

  return StorageManager;
});