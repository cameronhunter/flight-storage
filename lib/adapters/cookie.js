define([], function() {

  return function() {

    function dateToExpiryString(date) {
      switch (date.constructor) {
        case Number:
          return date === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + date;
        case String:
          return '; expires=' + date;
        case Date:
          return '; expires=' + date.toGMTString();
      }
    }

    this.get = function(key) {
      var value = unescape(document.cookie.replace(new RegExp('(?:(?:^|.*;\\s*)' + escape(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*)|.*'), '$1')) || null;
      var json = JSON.parse(value);
      return json == null ? undefined : json;
    };

    this.set = function(key, value, options) {
      if (/^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {throw "Invalid key name";}
      document.cookie = escape(key) + '=' + escape(JSON.stringify(value)) + 
                        dateToExpiryString(options.expires) + 
                        (options.domain ? '; domain=' + options.domain : '') + 
                        (options.path ? '; path=' + options.path : '') + 
                        (options.secure ? '; secure' : '');
    };

    this.remove = function(key) {
      if (!this.exists(key)) return;
      document.cookie = escape(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + 
                        (this.attr.path ? '; path=' + this.attr.path : '');
    };

    this.clear = function() {
      var keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (var i=0, l=keys.length; i<l; i++) {
        this.remove(unescape(keys[i]));
      }
    };

  };

});