"use strict"

/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.2,
 * DOM-objekt och jQuery.
 *
 * Using JavsScript with ES6 features.
 *
 * A function object with simple logic for responsiveness,
 * basically a container with an event handler function and change state.
 *
 * Notice that this is just for demonstrating the resize event, most responsiveness logic is
 * preferable done with CSS (by using the @media tag for example)
 *
 * Mutation of DOM:
 * - Fetches (querying of) elements
 * - Retrieve information from elements
 * - Changing properties in elements
 *
 * Document and window events:
 * - Usage of "load" event
 * - Usage of "unload" event
 * - Usage of "resize" event
 *
 * Mouse events:
 * - Usage of the "mousemove" event
 *
 * Notice!
 * A stylesheet is being used for easy to read and clean code,
 * it is possible to inject styles directly on elements using jQuery or ƒetching
 * them directy using the document and then setting the styles explicitly.
 *
 * It is also a possible to create a style element and then append any
 * classes or styles in its content and then injecting it into the DOM.
 *
 * With that mention, some of the logic in this specific implementation sets
 * styles explicitly using jQuery.
 *
 * @author Peter Borgstedt <peter_borgstedt@hotmail.com>
 */
function Responsiveness() {
  const blogAnchor = $('.blog'); // Query onces and keep reference
  let setElseReset = window.innerWidth <= 640; // px

  this.handler = () => {
    const setResponsiveness = window.innerWidth <= 640;
    if (setResponsiveness && setElseReset) {
      blogAnchor.css('min-width', '100%');
      setElseReset = false;
    } else if (!setResponsiveness && !setElseReset) { 
      blogAnchor.css('min-width', '');
      setElseReset = true;
    }
  }

  this.handler(); // Set initial size
}

// $(selector).load (depricated >= 1.8, now usage is with .on)
$(window).on('load', () => {
  $(window).on('resize', new Responsiveness().handler);
});

// $(selector).unload (depricated >= 1.8, now usage is with .on)
$(window).on('unload', () => {
  $(window).off('resize', new Responsiveness().handler);
});
