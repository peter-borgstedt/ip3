"use strict"

/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.2,
 * DOM-object and jQuery.
 *
 * Using JavaScript with ES6 features.
 *
 * A hover displaying picked color featuring following features:
 *
 * Mutation in DOM
 * - Fetches (querying of) elements
 * - Changing properties in elements
 *
 * Mouse events:
 * - Usage of the "hover" (= mouseover + mouseout) with jQuery
 *
 * Notice!
 * A stylesheet is being used for easy to read and clean code,
 * it is possible to inject styles directly on elements using jQuery or fetching
 * them directly using the document and then setting the styles explicitly.
 *
 * It is also a possible to create a style element and then append any
 * classes or styles in its content and then injecting it into the DOM.
 *
 * With that mention, some of the logic in this specific implementation sets
 * styles explicitly using jQuery.
 *
 * @author Peter Borgstedt <peter_borgstedt@hotmail.com>
 */
$(document).ready(() => {
  const colorArea = $('#color-hover-anchor');
  const colorPicker = $('#color-picker');

  colorArea.hover(() => {
    colorArea.css('background-color', colorPicker.val())
  }, () => {
    colorArea.css('background-color', '')
  });
});
