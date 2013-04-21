define([
  'flight/lib/component',
  'flight/lib/compose',
  'lib/adapters/localstorage'
], function(defineComponent, compose, withLocalStorage) {

  var StorageManager = defineComponent(storageManager);

  function storageManager() {

    this.defaultAttrs({
      adapter: 'localstorage'
    });

    this.adapters = {
      'localstorage': withLocalStorage
    };

    this.after('initialize', function() {

      compose.mixin(this, [this.adapters[this.attr.adapter]]);

      this.on('dataStorageGet', this.get);
      this.on('dataStorageSet', this.set);
      this.on('dataStorageClear', this.clear);
    });

  }

  return StorageManager;
});