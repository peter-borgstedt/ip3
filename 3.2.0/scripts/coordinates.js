"use strict"

/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.2,
 * DOM-object och jQuery.
 *
 * Using JavaScript with ES6 features.
 *
 * A hover displaying picked color which demonstrate following parts:
 *
 * Mutation of DOM:
 * - Fetches (querying of) elements
 * - Changing properties in elements
 * - Retrieve information from elements
 * - Add and update of content in elements
 *
 * Event object:
 * - Usage of event property "pageX"
 * - Usage of event property "pageY"
 * - Usage of .on (jquery) to attach/add an event listener
 * - Usage of .off (jquery) to detach/remove an event listener
 *
 * Mouse events:
 * - Usage of the "mousemove" event
 *
 * Notice!
 * A stylesheet is being used for easy to read and clean code,
 * it is possible to inject styles directly on elements using jQuery or fetching
 * them directly using the document and then setting the styles explicitly.
 *
 * It is also a possible to create a style element and then append any
 * classes or styles in its content and then injecting it into the DOM.
 *
 * @author Peter Borgstedt <peter_borgstedt@hotmail.com>
 */
$(document).ready(() => {
  const coordinates = $('#coordinates');
  const activeToggleButton = $('#active-toggle-button');
  const mute = $("#mute");
  let hasEventListenerAttached = true;

  const coordinateEventHandler = (event) => {
    // Event prevention:
    // - event.preventDefault() will prevent the default event from occuring
    // - event.stopPropagation() will prevent the event from bubbling up
    // - return false will do both
    if (!mute.prop('checked')) {
      coordinates.text('X: ' + event.pageX + ', Y: ' + event.pageY);
    }
    return false;
  };

  $(document).on('mousemove', coordinateEventHandler);
  activeToggleButton.on('click', () => {
    if (hasEventListenerAttached) {
      // Removes any existing event listener
      $(document).off('mousemove', coordinateEventHandler);
      hasEventListenerAttached = false;

      activeToggleButton.val('Lägg till eventlyssnare');
    } else {
      // Adds an event listener
      $(document).on('mousemove', coordinateEventHandler);
      hasEventListenerAttached = true;

      activeToggleButton.val('Ta bort eventlyssnare');
    }
  })
})
