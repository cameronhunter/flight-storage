define([], function() {

  return function() {

    this.get = function(key) {
      var value = JSON.parse(window.localStorage.getItem(key));
      return value == null ? undefined : value;
    };

    this.set = function(key, value) {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    };

    this.clear = function() {
      window.localStorage.clear();
      return true;
    };

  };

});