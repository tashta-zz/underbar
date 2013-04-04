(function() {
  
  // Call iterator(value, key, obj) for each element of obj
  var each = function(obj, iterator) {
    if (Array.isArray(obj)) {
      for(var i=0; i<obj.length; i++) {
        iterator(obj[i], i, obj);
      }
    }
    else {
      for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
          iterator(obj[key], key, obj);
        }
      }
    }
  };

  // Determine if the array or object contains a given value (using `===`).
  var contains = function(obj, target) {
    var result = false;
    each(obj, function(value, key, obj){
      if(value === target){
        result = true;
      }
    });
    return result;
  };

  // Return the results of applying an iterator to each element.
  var map = function(array, iterator) {
    var new_array = [];
    each(array, function(value) {
       new_array.push(iterator(value));
    });
    return new_array;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  var pluck = function(obj, property) {
    return map(obj, function(value){
      return value[property];
    });
  };

  // Return an array of the last n elements of an array. If n is undefined,
  // return just the last element.
  var last = function(array, n) {
    var result = [];
    if (!array) {
      result = undefined;
    }
    else if (n === undefined) {
      result = array[array.length-1];
    }
    else if (n > array.length) {
      result = array;
    }
    else {
      for(var i=array.length-n; i < array.length; i++) {
        result.push(array[i]);
      }
    }
    return result;
  };

  // Like last, but for the first elements
  var first = function(array, n) {
    var result = [];
    if (!array) {
      result = undefined;
    }
    else if (n === undefined) {
      result = array[0];
    }
    else if (n > array.length) {
      result =  array;
    }
    else {
      for(var i=0; i< n; i++) {
        result.push(array[i]);
      }
    }
    return result;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  // 
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(previous_value, item){
  //     return previous_value + item;
  //   }, 0); // should be 6
  //
  var reduce = function(obj, iterator, initialValue) {
    each(obj, function(value){
      initialValue = iterator(initialValue || 0, value) ;
    });
    return initialValue;
  };

  // Return all elements of an array that pass a truth test.
  var select = function(array, iterator) {
    var new_array = [];
    each(array, function(value){
      if (iterator(value)) {
        new_array.push(value);
      }
    });
    return new_array;
  };

  // Return all elements of an array that don't pass a truth test.
  var reject = function(array, iterator) {
    var new_array = [];
    var pusher = function(value){
      if (!iterator(value)) {
        new_array.push(value);
      }
    };
    each(array, pusher);
    return new_array;
  };

  // Determine whether all of the elements match a truth test.
  var every = function(obj, iterator) {
    truthy = true;
    var pusher = function(value){
      if (!iterator(value)) {
        truthy = false;
      }
    };
    each(obj, pusher);
    return truthy;
  };

  // Determine whether any of the elements pass a truth test.
  var any = function(obj, iterator) {
    truthy = false;
    if (iterator === undefined) {
      for(var i=0; i < obj.length; i++) {
        if (obj[i]) {
          truthy = true;
        }
      }
    }
    else {
      var pusher = function(value, key, obj){
        if (iterator(value)) {
          truthy = true;
        }
      };
      each(obj, pusher);
    }
    return truthy;
  };

  // Produce a duplicate-free version of the array.
  var uniq = function(array) {
    var new_array = [];
    each(array, function(value){
      if ( !contains(new_array, value) ){
        new_array.push(value);
      }
    });
    return new_array;
  };

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  var once = function(func) { 
    var called = false;
    var result = null;
    return function(){
      if (called){
        return result;
      } else {
        called = true;
        result = func.apply(this);
        return result;
      }
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  var memoize = function(func) {
    var result = null;
    return function() {
      if (result != null) {
        return result;
      }
      else {
        result = func.apply(this, arguments);
        return result;
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  var delay = function(func, wait) {
    var newFunc = function(){
      var new_array = [];
      for(var i=2; i <= arguments.length; i++) {
        new_array.push(arguments[i]);
      }
      func(new_array);
    };
    setTimeout(newFunc, wait);
    
  
  };

  // Extend a given object with all the properties of the passed in 
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //
  var extend = function(obj) {
    for (var i=1; i < arguments.length; i++) {
      for (var key in arguments[i]){
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  var defaults = function(obj) {
     for (var i=1; i < arguments.length; i++) {
      for (var key in arguments[i]){
        if (obj.hasOwnProperty(key) === false) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  var flatten = function(nestedArray, result) {
    //[3,0,[1,2,3][4,5,6]]0;
    var flatArray = [];
    var searchArray = function(someArray) {
      for(var i = 0; i < someArray.length; i++) {
        if (Array.isArray(someArray[i])){
          searchArray(someArray[i]);
        } else {
          flatArray.push(someArray[i]);
        }
      }
    };
    searchArray(nestedArray);
    return flatArray;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  var sortBy = function(obj, iterator) {
    return obj.sort(function(left, right){
      if (typeof (iterator) === 'string') {
        return left[iterator] > right[iterator];
      }
      return iterator(left) > iterator(right);
    });
  };

  // Zip together two or more arrays with elements of the same index 
  // going together.
  // 
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  var zip = function() {
    var new_array = [];
    var args = Array.prototype.slice.call(arguments);
    var longestLength = sortBy(args, "length")[args.length-1].length;
    for (var i=0; i<longestLength; i++){
      var row = [];
      for (var j=0; j<arguments.length; j++){
        row.push(arguments[j][i]);
      }
      new_array.push(row);
    }
    return new_array;
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  var intersection = function(array) {
    var results = [];
    for (var el=0; el<arguments[0].length; el++){
      var needAdd = true;
      for(var i=1; i < arguments.length; i++) {
        if (!contains(arguments[i], arguments[0][el])){
          needAdd = false;
        }
      }
      if (needAdd){
        results.push(arguments[0][el]);
      }
    }
    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  var difference = function(array) {
    var results = [];
    for (var el=0; el<arguments[0].length; el++){
      var needAdd = true;
      for(var i=1; i < arguments.length; i++) {
        if (contains(arguments[i], arguments[0][el])){
          needAdd = false;
        }
      }
      if (needAdd){
        results.push(arguments[0][el]);
      }
    }
    return results;
  };

  // Shuffle an array.
  var shuffle = function(obj) {
    var newArray = obj.slice(0);
    return newArray.sort(function(left, right){
      return Math.random() > Math.random();
    });
  };

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  var chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  var throttle = function(func, wait) {

  };
  // var throttle = function(func, wait) {
  //   var called = Date.now();
  //   var hasBeenCalled = false;
  //   var result = null;
  //   return function(){
  //     if (hasBeenCalled && ((Date.now()-called) <= wait)){
  //       return result;
  //     } else {
  //       called = Date.now();
  //       console.log("in ELSE "+called+"   "+((Date.now()-called)));
  //       // cur_time = Date.now();
  //       hasBeenCalled = true;
  //       result = func.apply(this, arguments);
  //       return result;
  //     }
  //   };
  // };

  this._ = {
    each: each,
    contains: contains,
    map: map,
    pluck: pluck,
    last: last,
    first: first,
    reduce: reduce,
    select: select,
    reject: reject,
    every: every,
    any: any,
    uniq: uniq,
    once: once,
    memoize: memoize,
    delay: delay,
    extend: extend,
    defaults: defaults,
    flatten: flatten,
    sortBy: sortBy,
    zip: zip,
    intersection: intersection,
    difference: difference,
    shuffle: shuffle,
    chain: chain,
    throttle: throttle
  };


}).call(this);
