/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.4.5,
 * Form management.
 * 
 * Initialize the form and set all parts as disabled until they
 * are activated when selected.
 * 
 * References:
 * https://www.w3schools.com/tags/att_input_type_hidden.asp
 * https://stackoverflow.com/questions/10777970/can-i-mark-a-field-invalid-from-javascript
 * https://www.w3schools.com/js/js_validation.asp
 */

$(document).ready(() => {
  setEnabledAll('#sport-sub-form', true);
  setEnabledAll('#food-sub-form', true);
  setEnabledAll('#music-sub-form', true);
  setEnabledAll('#art-sub-form', true);
});
