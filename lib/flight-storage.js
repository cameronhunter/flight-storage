define([
  'flight/lib/component',
  'flight/lib/compose',
  'flight/lib/utils',
  'lib/adapters'
], function(defineComponent, compose, utils, withAdapters) {

  var StorageManager = defineComponent(storageManager, withAdapters);

  function storageManager() {

    this.defaultAttrs({
      adapter: 'local-storage'
    });

    this.exists = function(key) {
      return !!this.get(key);
    };

    this.after('initialize', function() {

      // Mixin the requested storage adapter
      compose.mixin(this, [this.adapter(this.attr.adapter)]);

      this.on('storageGet', function(e, data) {
        var value = this.get(data.key);
        this.trigger('storageDataRetrieved', {key:data.key, value:value});
      });

      this.on('storageSet', function(e, data) {
        try {
          this.set(data.key, data.value);
          this.trigger('storageDataStored', data);
        } catch(e) {
          var payload = utils.merge({}, data, {error: e});
          this.trigger('storageDataNotStored', payload);
        }
      });

      this.on('storageClear', function() {
        this.clear();
        this.trigger('storageDataCleared');
      });
    });

  }

  return StorageManager;
});