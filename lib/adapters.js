define([
  'lib/adapters/memory',
  'lib/adapters/local-storage',
  'lib/adapters/location-hash',
  'lib/adapters/window-name'
], function(inMemory, localStorage, locationHash, windowName) {

  return function() {

    var adapters = {
      'memory': inMemory,
      'local-storage': localStorage,
      'location-hash': locationHash,
      'window-name': windowName
    };

    this.availableAdapters = function() {
      return Object.keys(adapters);
    };

    this.adapter = function(name) {
      return adapters[name];
    };

  };

});