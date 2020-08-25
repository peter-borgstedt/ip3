/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.4.3,
 * Expandable interfaces.
 *
 * A simple page with a tabbing panel using the HTMLTemplateElement
 * and tooltip using the visibility styling property.
 *
 * References:
 * https://www.w3schools.com/css/css_tooltip.asp
 * https://www.w3schools.com/howto/howto_js_tabs.asp
 *
 * @author <a href="mailto:pebo6883@student.su.se">Peter Borgstedt</a>
 */

/**
 * Replace content in an existing div with the content of a template element.
 * @param {string} id Id of an <template> element
 */
const setTemplate = (tab) => {
  const template = tab.find('template').first(); // Should only exist one

  // https://api.jquery.com/contents (equal to 'template.get(0).content.cloneNode(true)')
  const newContent = template.contents().clone(true);

  // Replace first inner child, only one exist
  $('#content').html(newContent);
}

$(document).ready(() => {
  // All tabs stored as a JQuery collection iterator
  const tabs = $('#tabs').find('div');

  /**
   * Set tab as active by adding '.active' class to the element and
   * removing the class from any previous (tab) elements.
   * @param {HTMLDivElement} tab A <div> element representing tab 
   */
  const setActiveTab = (tab) => {
    tabs.removeClass('active'); // Remove active class from any existing tabs
    tab.addClass('active'); // Add active class to current selected tab
  }

  /**
   * Updates the UI for a current tab.
   * @param {HTMLDivElement} tab A <div> element representing tab 
   */
  const setView = (tab) => {
    setTemplate(tab); // Set template data for page
    setActiveTab(tab); // Set active tab
  }

  // Array.from convert an arbitrary iterable (in this case a
  // jquery collector iterator) to an array instance, then
  // map each element into a jquery element
  for (const tab of Array.from(tabs).map((tab) => $(tab))) {
    tab.on('click', (event) => {
      // Update location history
      setView(tab);
    });
  }

  // Start the application by replacing the current history state depending on
  // any active tab set in the html file
  const activeTab = $('#tabs > .active').first()
  if (activeTab.length) {
    setView(activeTab);
  }
});
