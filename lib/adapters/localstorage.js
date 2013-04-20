define([], function() {

  return function() {

    this.get = function(key) {
      JSON.parse(window.localStorage.get(key));
    };

    this.set = function(key, value) {
      window.localStorage.set(key, JSON.stringify(value));
    };

    this.clear = function() {
      window.localStorage.clear();
    };

  };

});