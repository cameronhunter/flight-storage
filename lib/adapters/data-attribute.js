define([], function() {

  return function() {

    this.get = function(key) {
      return this.$node.data(key);
    };

    this.set = function(key, value) {
      this.$node.data(key, value);
    };

    this.exists = function(key) {
      return !!this.get(key);
    };

    this.remove = function(key) {
      this.$node.removeData(key);
    };

    this.clear = function() {
      this.$node.data({});
    };

  };

});