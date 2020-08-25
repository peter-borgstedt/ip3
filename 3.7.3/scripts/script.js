/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.7.3,
 * History management
 *
 * A simple single page application (SPA) with some super basic routing logic for
 * updating the history state and content on the site.
 *
 * References:
 * http://html5doctor.com/html5-custom-data-attributes
 * https://medium.com/@yanai101/popstate-and-history-api-the-missing-part-dc49f75676d
 * https://github.com/whatwg/html/issues/2174
 * https://stackoverflow.com/a/4585031
 *
 * @author <a href="mailto:pebo6883@student.su.se">Peter Borgstedt</a>
 */

/**
 * A wrapper function that calls the original function but injects some logic
 * between, in this case just setting the title from the state change arguments.
 * The title is set natively by browsers and must be done manually, see
 * reference below (or at the top).
 *
 * See:
 * https://github.com/whatwg/html/issues/2174 (might get deprecated in the future)
 * https://stackoverflow.com/a/4585031
 * @param {Function} func pushState or replaceState in history object
 */
const historyStateWrapper = (func => function() {
  const result = func.apply(this, arguments);
  // Explicitly set title (after push state has been run (see func.apply(...)))
  document.title = arguments[1]; // [data, title, url]
  return result;
})

window.history.pushState = historyStateWrapper(history.pushState)
window.history.replaceState = historyStateWrapper(history.replaceState);

$(document).ready(() => {
  // Remove last '/' for separation clarity when used
  const sitePath = location.pathname.substr(0, location.pathname.lastIndexOf('/'));

  // All tabs stored as a JQuery collection iterator
  const tabs = $('#tabs').find('div');

  /**
   * Replace content in an existing div with the content of a template element.
   * @param {string} id Id of an <template> element
   */
  const setTemplate = (id) => {
    // https://api.jquery.com/contents (equal to 'template.get(0).content.cloneNode(true)')
    const newContent = $('#' + id).contents().clone(true);

    // Replace first inner child, only one exist
    const existingContent = $('#content > *').first();
    existingContent.replaceWith(newContent);
  }

  /**
   * Set tab as active by adding '.active' class to the element and
   * removing the class from any previous (tab) elements.
   * @param {HTMLDivElement} tab A <div> element representing tab 
   */
  const setActiveTab = (tab) => {
    // Remove active class from any existing tabs
    tabs.removeClass('active');
    // Add active class to current selected tab
    tab.addClass('active');
  }

  /**
   * Updates the UI for a current tab.
   * @param {HTMLDivElement} tab A <div> element representing tab 
   */
  const setView = (tab) => {
    // Set template data for page
    setTemplate(tab.data('template'));
    // Set active tab
    setActiveTab(tab);
  }

  const getStateProperties = (tab) => {
    return {
      data: { id: tab.attr('id') },
      title: tab.data('title'),
      url: `${sitePath}/${tab.data('path')}`
    };
  }

  // Array.from convert an arbitrary iterable (in this case a
  // jquery collector iterator) to an array instance, then
  // map each element into a jquery element
  for (const tab of Array.from(tabs).map((tab) => $(tab))) {
    tab.on('click', (event) => {
      // Update location history
      setView(tab);
      const { data, title, url } = getStateProperties(tab);
      window.history.pushState(data, title, url);
    });
  }

  // Invokes when the active history entry changes while user navigates
  // the session history (clicking "go back" amd "go forward")
  window.addEventListener('popstate', (event) => {
    if (event.state) {
      // As this a small single page application it needs to update the
      // DOM to reflect any changed state as this is not stored.
      // Notice, in the assignment description this part could be skipped,
      // but as I built this as a SPA where rendering logic is focused
      // on the client side (front-end) it's easy to implement by just adding
      // the code below.
      setView($('#' + event.state.id));
    }
  });

  // Start the application by replacing the current history state depending on
  // any active tab set in the html file
  const activeTab = $('#tabs > .active').first()
  if (activeTab.length) {
    setView(activeTab);
    // This will completely replace the current existing state in history (which we want)
    const { data, title, url } = getStateProperties(activeTab);
    window.history.replaceState(data, title, url);
  }
});
