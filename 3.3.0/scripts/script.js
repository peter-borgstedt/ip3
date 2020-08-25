"use strict"

/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.3,
 * Window object (Webbläsarobjekt)
 *
 * Open and closes a window by asking the client to confirm.
 * If the window is already open or closed it alerts the user of it.
 *
 * Also is an echoing button which ask the user using a prompt for some input,
 * which later is displayed after a 5 seconds which is being counted down.
 *
 * Features:
 * - alert, confirm, prompt
 * - open, close
 * - setInterval, clearInterval, setTimeout, clearTimeout
 *
 * @author Peter Borgstedt <peter_borgstedt@hotmail.com>
 */
$(document).ready(() => {
  const openWindowButton = $('#openWindowButton');
  const closeWindowButton = $('#closeWindowButton');
  const alertButton = $('#alertButton');
  const countdownElement = $('#countdown');

  /**
   * Create and opens a new window
   * @returns new Window object
   */
  const openNewWindow = () => {
    // Center popup window
    const height = 240;
    const width = 320;
    const top = Number((screen.height / 2) - (height / 2));
    const left = Number((screen.width / 2) - (width / 2));

    const newWindow = window.open('', '', `height=${height}, width=${width}, top:${top}, left=${left}`);
    newWindow.document.write("<em>Tryck på stäng-knappen igen i föregående fönster för att stänga!</em>");

    return newWindow;
  }

  /** Opens a new window */
  openWindowButton.on('click', () => {
    if (!this.newWindow || this.newWindow.closed) {
      if (confirm('Säker på att du vill öppna ett fönstret')) {
        this.newWindow = openNewWindow();
      }
    } else {
      alert('Window is already open!');
      this.newWindow.focus();
    }
  });

  /** Close's any existing open window */
  closeWindowButton.on('click', () => {
    if (this.newWindow && !this.newWindow.closed) {
      if (confirm('Säker på att du vill stänga fönstret')) {
        this.newWindow.close();
      }
    } else {
      alert('Window is already closed!');
    }
  });

  /**
   * Opens a prompt asking the user for an input which then
   * is displayed after a 5 second countdown.
   */
  alertButton.on('click', () => {
    const input = prompt('Skriv något du vill ska ekas ut!');
    if (input.length > 0) {
      countdownElement.text('5');

      // Update content in element with the current countdown second
      const interval = setInterval(() => {
        // + will convert the string to a number which also can be done using Number(str) 
        let second = +countdownElement.text();
        countdownElement.text(second > 0 ? --second : 0);
      }, 1000);

      // Alert with echo after timeout
      const timeout = setTimeout(() => {
        countdownElement.text('');

        // Clear interval and timeout
        clearInterval(interval);
        clearTimeout(timeout);

        if (input.length > 0) {
          alert(input);
        }
      }, 5000);
    } else {
      alert('Du behöver skriva in något...');
    }
  });
});
