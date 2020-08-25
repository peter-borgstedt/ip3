/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.5.3,
 * Database storage (using DbIndex API)
 *
 * Displays a table with people which can be altered by either adding or removal.
 *
 * Features:
 * - Creates an database
 * - Creates an object store
 * - Add data to an object store
 * - Remove data from an object store
 * - Retrieves data from an object store
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
 *
 * @author <a href="mailto:pebo6883@student.su.se">Peter Borgstedt</a>
 */
$(document).ready(() => {
  const open = () => {
    // Open the database (or create)
    const dbr = window.indexedDB.open('my-db', 1);
    dbr.onerror = (event) => console.error(event);
    return dbr;
  }

  /**
   * Removes an item in a object store ('people').
   * @param {number} id Item key
   */
  const remove = (id) => {
    const dbr = open() // Open the database
    dbr.onsuccess = (event) => {
      // Database opened successfully
      const db = event.target.result;
      const request = db.transaction('people', "readwrite")
        .objectStore('people')
        .delete(id);

      request.onsuccess = (event) => {
        console.log(`Person borttagen med ID=${id}`);
      };
    };
  }

  /**
   * Retrieves all data from an object store ('people') and
   * populate/repopulate a table with with.
   * @param {ObjectStore} os An opened/connected object store
   */
  const populateTable = (os) => {
    const table = $('table');
    // Remove all rows except the first (header)
    table.find('tr:not(:first-child)').remove();

    os.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) { // More exists
        const data = cursor.value;
        // However, using document instead of a jquery template to
        // create elements is actually is a lot faster, but speed is not
        // an issue here
        const row = $('<tr/>');
        row.append($('<td/>').text(data.id));
        row.append($('<td/>').text(data.forename));
        row.append($('<td/>').text(data.surname));
        row.append($('<td/>').text(data.age));

        const deleteButton = $('<td class="container"><button>Radera</button></td>')
          .on('click', (event) => {
            const row = $(event.target).closest('tr');
            remove(Number(row.children().first().text()));
          });
        row.append(deleteButton);
        table.append(row);

        cursor.continue();
      } // else no more exists
    };
  }

  /**
   * A click event listener on refresh button,
   * which repopulates the table with data from the
   * indexDB when invoked.
   */
  $('#refresh').on('click', () => {
    const dbr = open() // Open the database
    dbr.onsuccess = (event) => {
      // Database opened successfully
      const db = event.target.result;
      const os = db.transaction('people', "readwrite").objectStore('people');
      populateTable(os);
    }
  });

  // A submit event listener on form,
  // which stores valid form data into the ('people')
  // object storage when invoked
  $('#storage-form').on('submit', (event) => {
    event.preventDefault(); // Stop propagation (don't reload page)

    // Retrieve data from form and create an object of it with key -> value
    var person = $(event.target)
    .serializeArray()
    .reduce(function (acc, item) {
      acc[item.name] = item.value;
      return acc;
    }, {});

    // Store the data in the 'people' object storage
    const dbr = open() // Open the database
    dbr.onsuccess = (event) => {
      // Database opened successfully
      const db = event.target.result;
      const os = db.transaction('people', "readwrite").objectStore('people');
      const request = os.add(person);
      
      request.onsuccess = (event) => {
        console.log(`Person tillagd med ID=${event.target.result}`);
      }
    }
  });


  /**
   * Initialize the database by constructing it with an object storage
   * if it does not exist already.
   */
  const initialize = () => {
    // Open the database (or create)
    const dbr = window.indexedDB.open('my-db', 1);
    dbr.onerror = (event) => console.error(event);

    dbr.onsuccess = (event) => {
      // Database opened successfully
      const db = event.target.result;
      const os = db.transaction('people', "readwrite").objectStore('people');
      populateTable(os);
    }

    // Invoked when the database does not exist or if the versions has been
    // updated, making it possible to create/update its structure
    // (which must be done here in 'upgradeneeded')
    dbr.onupgradeneeded = (event) => {
      const db = event.target.result;
      // Create the database structure
      const os = db.createObjectStore('people', { keyPath: 'id', autoIncrement: true });
      os.createIndex('name', 'name', { unique: false });

      // Use transaction oncomplete to make sure the object store creation is 
      // finished before adding aby data into it
      os.transaction.oncomplete = (event) => {
        const os = db.transaction('people', "readwrite").objectStore('people');

        // Add some initial data in the object storage
        os.add({
          forename: "Peter",
          surname: "Borgstedt",
          age: 38
        });
      };
    }
  }

  if (window.indexedDB) {
    initialize(); // Start
  } else {
    console.log('Din browser har inte stöd för indexedDB, vilket krävs av den här applikationen.');
  }
});
