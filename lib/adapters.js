define(['lib/adapters/localstorage'], function(localStorageAdapter) {

  return function() {

    var adapters = {
      'localstorage': localStorageAdapter
    };

    this.availableAdapters = function() {
      return Object.keys(adapters);
    };

    this.adapter = function(name) {
      return adapters[name];
    };

  };

});