define([], function() {

  return function() {

    function save(value) {
      window.location.hash = '#' + JSON.stringify(value);
    }

    var store;
    try {
      store = JSON.parse(window.location.hash.slice(1));
    } catch(e) {
      store = {};
    }

    this.get = function(key) {
      return store[key];
    };

    this.set = function(key, value) {
      store[key] = value;
      save(store);
    };

    this.remove = function(key) {
      delete store[key];
    };

    this.clear = function() {
      store = {};
      save(store);
    };

  };

});