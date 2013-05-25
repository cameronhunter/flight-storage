# flight-storage [![Build Status](https://secure.travis-ci.org/cameronhunter/flight-storage.png)](http://travis-ci.org/cameronhunter/flight-storage)

A [Flight](https://github.com/twitter/flight) component for storing JSON data in arbitrary data stores. Currently supports:

* Cookie
* Data attributes
* In-memory object
* Local storage
* Location hash
* Window name

## Installation

```bash
bower install flight-storage
```

## Example

```javascript
define(['flight-storage/manager'], function(StorageManager) {

  // Setup the store
  StorageManager.attachTo(document, {
    adapter: 'local-storage',
    saveEvent: 'storage-save',
    getEvent: 'storage-get',
    clearEvent: 'storage-clear'
  });

  // Listen for successful actions
  $(document).on('storage-save-success storage-get-success storage-clear-success', function(e, data) {
    console.log(e, data);
  });

  // Listen for errors
  $(document).on('storage-save-failure storage-get-failure storage-clear-failure', function(e, data) {
    console.error(e, data);
  });

  // Save a key/value pair
  $(document).trigger('storage-save', {key:'foo', value:{bar:'baz', boo:1337}});

  // Retrieve a key/value pair
  $(document).trigger('storage-get', {key:'foo'});

  // Clear the data store
  $(document).trigger('storage-clear');
});
```

or use the storage adapter mixins directly in your components

```javascript
define(['flight/lib/component', 'flight-storage/adapters/local-storage'], function(defineComponent, withLocalStorage) {

  var MyComponent = defineComponent(myComponent, withLocalStorage);

  function myComponent() {

    this.after('initialize', function() {

      this.on('myComponentEvent', function(e, data) {
        // Save into local storage
        this.set(data.key, data.value);
      });

    });

  }

  return MyComponent;
});
```
