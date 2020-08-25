/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.5.1,
 * Web storage (using the API for session- and local storage)
 *
 * @author <a href="mailto:pebo6883@student.su.se">Peter Borgstedt</a>
 */
$(document).ready(() => {
  /**
   * Retrieves data from fields in form and stores it as a stringified json in
   * local- and session storage as well with a updated timestamp separately.
   * Is being invoked when form is submitted (the "Save" button is being clicked).
   * @param {Event} event Submit event
   */
  $('#storage-form').on('submit', (event) => {
    // Retrieve data from form and create an object of it with key -> value
    const person = $(event.target)
    .serializeArray()
    .reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {});

    const epoch = Date.now();

    // Store form object and timestamp in session storage
    sessionStorage.setItem('updated', epoch)
    sessionStorage.setItem('person', JSON.stringify(person));

    // Store form object and timestamp in local storage (persistent)
    localStorage.setItem('updated', epoch)
    localStorage.setItem('person', JSON.stringify(person));

    // https://api.jquery.com/event.stopimmediatepropagation
    return false;
  });

  /**
   * Retrieves data from session storage and displays it in a new window (page).
   * Is being invoked when the "Show data from session storage" button is being clicked.
   * @param {MouseEvent} event Click event
   */
  $('#session-data-button').on('click', (event) => {
    // Center popup window
    const height = 240;
    const width = 320;
    const top = Number((screen.height / 2) - (height / 2));
    const left = Number((screen.width / 2) - (width / 2));
    const win = window.open('', '', `height=${height}, width=${width}, top:${top}, left=${left}`);

    const updated = sessionStorage.getItem('updated'); // Get timestamp
    const personStringified = sessionStorage.getItem('person'); // Get form object

    if (personStringified) { // If there form object exist then parse it to an object
      const person = JSON.parse(personStringified);

      // Write data to document in popup window
      win.document.write(`
        Förnamn: ${person && person.forename},<br/>
        Efternamn: ${person && person.surname},<br/>
        Ålder: ${person && person.age},<br/>
        Uppdaterades: ${updated && new Date(Number(updated)).toISOString()}
      `);
    } else {
      win.document.write(`<p>Finns inget data lagrat...</p>`);
    }
  });

  /**
   * Retrieves data from local storage and displays it in a new window (page).
   * Is being invoked when the "Show data from local storage" button is being clicked.
   * @param {MouseEvent} event Click event
   */
  $('#local-data-button').on('click', (event) => {
    const win = window.open('', '_blank');

    const updated = localStorage.getItem('updated'); // Get timestamp
    const personStringified = localStorage.getItem('person'); // Get form object

    if (personStringified) { // If there form object exist then parse it to an object
      const person = JSON.parse(personStringified);

      // Write data to document in popup window
      win.document.write(`
        Förnamn: ${person && person.forename},<br/>
        Efternamn: ${person && person.surname},<br/>
        Ålder: ${person && person.age},<br/>
        Uppdaterades: ${updated && new Date(Number(updated)).toISOString()}
      `);
    } else {
      win.document.write(`<p>Finns inget data lagrat...</p>`);
    }
  });
});
