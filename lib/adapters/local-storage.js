define([], function() {

  return function() {

    this.get = function(key) {
      var value = JSON.parse(window.localStorage.getItem(key));
      return value == null ? undefined : value;
    };

    this.set = function(key, value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    };

    this.exists = function(key) {
      return !!this.get(key);
    };

    this.remove = function(key) {
      window.localStorage.removeItem(key);
    };

    this.clear = function() {
      window.localStorage.clear();
    };

  };

});