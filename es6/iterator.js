'use strict';

var obj = {};

obj[Symbol.iterator] = function() {

  var index = 0;
  return {
    next: function() {
      index++;
      return {
        value: 'id-'+index,
        done: index === 20 
      } 
    } 
  }
}

//class Collection {
  //*[Symbol.iterator]: function() {
    //let index = 0;
    //return {
      //next: function _next() {
        //index++;
        //return {
          //value: 'id-'+index,
          //done: index === 20 
        //} 
      //} 
    //}
  //}

//}

function test() {
  for(let i of obj) {
    console.log(i);
  }
}



test();
