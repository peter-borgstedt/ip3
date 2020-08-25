/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.4.3,
 * Navigation.
 *
 * Features:
 * Logic fetching all hyper links <a> (HTMLAnchorElement) and sets the
 * target for them to "_blank".
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 * https://www.w3schools.com/howto/howto_css_dropdown.asp
 * https://www.w3schools.com/css/css_dropdowns.asp
 * https://www.w3schools.com/tags/att_a_target.asp
 *
 * @author <a href="mailto:pebo6883@student.su.se">Peter Borgstedt</a>
 */

$(document).ready(() => {
  // Get all links in the document and set attribute target to '_blank',
  // also the document.querySelectorAll
  $.find('a').forEach((link) => link.setAttribute('target', '_blank'))
});
