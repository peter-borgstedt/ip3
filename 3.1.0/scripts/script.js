"use strict"

/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.1,
 * Grunderna i JavaScript.
 *
 * Using JavsScript with ES6 features.
 *
 * Features:
 * - Array
 * - Boolean
 * - Date
 * - Math
 * - Number
 * - String
 * - RegExp
 * - Global
 *
 * ES6 and ES5.
 * All new javascript features resides in ES6 and it is alot more convinient, safe and better to code in.
 * If by some reason a downgrade from ES6 needs to be done to ES5, it is offen possible with minor
 * effort. The trick is just doing things the old way, and not use some of the new features and methods
 * in example Array. All "const" and "let" should be changed to "var", all fat-arrow functions should be using
 * a function() and possible these also need to bind "this" differently, fat-arrow function does not have it
 * and has a different scope than a function which uses a local one.
 * There are alot of tools that transpile between versions that can be used as well.
 */

/**
 * A simple calculator using an anonomous function object that has been instantiated
 * on a global variable named calculator. Can also be set directly on the window (window.calculator).
 */
const calculator = new function () { // A local scope is within the function object...
  /**
   * Sums all inputs (with no support for parentheses).
   * @param {Array.<object>} values A list of objects containing operand and value 
   */
  const sum = (values) => {
    // Do multiplication and division first (from left to right),
    // there will always exist a value before a multiplication or division
    // due to the initial value.
    const summarize = [];
    for (let i = 0; i < values.length; i++) {
      const item = values[i];
      if (item.operand === '*') { 
        summarize[summarize.length - 1].value *= item.value; 
      } else if (item.operand === '/') {
        summarize[summarize.length - 1].value /= item.value; 
      } else {
        summarize.push(item);
      }
    }

    // Do addition and subtractions
    const total = summarize.reduce((acc, item) => {
      return acc += item.operand === '+' ? item.value : -item.value;
    }, 0)

    // https://stackoverflow.com/a/11832950
    return Math.round((total + Number.EPSILON) * 100) / 100; // Round to 2 decimals
  }

  /**
   * Get a string representation of the current time.
   * @returns A time stamp as string with a patern of 'DD-MM-YYYY HH:mm'
   */
  const getTimestamp = () => {
    // Add zero padding to timestamp
    const date = new Date();
    return ('0' + date.getDate()).slice(-2) + '-' + 
           ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
           date.getFullYear() + ' ' +
           ('0' + date.getHours()).slice(-2) + ':' +
           ('0' + date.getMinutes()).slice(-2);
  }

  /**
   * A very simplified mathematic evaluation.
   * @param str {String} A string containing a simple mathematical expression
   * @param print {Boolean=true} If the result should be printed in the console (default is true)
   */
  this.eval = (str, print = true) => {
    if (typeof str !== 'string') {
      console.error('ERROR >> value must be of string');
      return;
    }

    // Either start with number or a number prefixed with +-*/
    // and may contain some spaces between
    const expr = /(^\d)|([+\-\*\/])\s*(\d)/g;

    const values = [];
    while (true) {
      const result = expr.exec(str);
      if (!result) {
        break; // No more result
      }

      const operand = result[2]; // Match group 2 (operand)
      const value = result[1] || result[3]; // Match group 1 + 3 (value)
      if (operand) {
        values.push({ operand, value: +value })
      } else if (result.index === 0) { // First value is always addition
        values.push({ operand: '+', value: +value || 0 })
      }
    }

    const total = sum(values);
    const timestamp = getTimestamp()

    if (print) {
      // [Violation] Avoid using document.write(),
      // https://developers.google.com/web/updates/2016/0
      console.log('[' + timestamp + ']: ' + total);
    }
    return total;
  }
}();
