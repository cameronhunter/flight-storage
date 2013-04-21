define([], function() {

  return function() {

    var store = {};

    this.get = function(key) {
      return store[key];
    };

    this.set = function(key, value) {
      store[key] = value;
    };

    this.remove = function(key) {
      delete store[key];
    };

    this.clear = function() {
      store = {};
    };

  };

});