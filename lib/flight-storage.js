define([
  'flight/lib/component',
  'flight/lib/compose',
  'lib/adapters'
], function(defineComponent, compose, withAdapters) {

  var StorageManager = defineComponent(storageManager, withAdapters);

  function storageManager() {

    this.defaultAttrs({
      namespace: '',
      adapter: 'localstorage'
    });

    this.after('initialize', function() {

      // Mixin the requested storage adapter
      compose.mixin(this, [this.adapter(this.attr.adapter)]);

      this.on('storageGet', function(e, data) {
        var value = this.get(data.key);
        this.trigger('storageDataRetrieved', {key:data.key, value:value});
      });

      this.on('storageSet', function(e, data) {
        // Object.keys(data).forEach(function(key) {
          this.set('foo', 'bar');
        // });
        this.trigger('storageDataStored', {foo:'bar'});
      });

      this.on('dataStorageClear', this.clear);
    });

  }

  return StorageManager;
});