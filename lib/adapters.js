define(['lib/adapters/localstorage'], function(withLocalStorage) {

  return function() {

    var adapters = {
      'localstorage': withLocalStorage
    };

    this.availableAdapters = function() {
      return Object.keys(adapters);
    };

    this.adapter = function(name) {
      return adapters[name];
    };

  };

});