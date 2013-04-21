define([
  'lib/adapters/memory',
  'lib/adapters/local-storage',
  'lib/adapters/window-name'
], function(localStorage, inMemory, windowName) {

  return function() {

    var adapters = {
      'memory': inMemory,
      'local-storage': localStorage,
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