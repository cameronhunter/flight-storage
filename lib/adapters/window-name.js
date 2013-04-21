define([], function() {

  return function() {

    var store; 
    try {
      store = JSON.parse(window.top.name);
    } catch(e) {
      store = {};
    }

    this.get = function(key) {
      return store[key];
    };

    this.set = function(key, value) {
      store[key] = value;
      window.top.name = JSON.stringify(store);
    };

    this.exists = function(key) {
      return !!store[key];
    };

    this.remove = function(key) {
      delete store[key];
    };

    this.clear = function() {
      store = {};
      window.top.name = JSON.stringify({});
    };

  };

});