/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.7.2,
 * Background processes (using the Web Worker API)
 *
 * A simple web worker that receives message and starts
 * a continuous sending of messages each seconds until terminated.
 *
 * @author <a href="mailto:pebo6883@student.su.se">Peter Borgstedt</a>
 */

/**
 * Handle incoming messages.
 *
 * Typically a place to handle heavier asynchronous tasks like doing request
 * calls to end points, streaming of data (until all is collected),
 * and then sending a message with some data when all is done.
 * 
 * Web workers can continue working when the browser has been closed,
 * making it able to retrieve and collect data to next time.
 * 
 * Web workers also is able to handle offline mode thus making it
 * possible to do some offline handling.
 * 
 * Web workers are a main part of progressive web technology which is
 * in my own opinion the future of web and mobile development.
 *
 * Combining web workers with other services like IndexedDB for storing,
 * Cache API for caching files (able to run offline), push notifications,
 * and so on makes it a powerful front-end (middle-ware) service.
 *
 * In this assignment I will just fake some service call by waiting a second and
 * send some progress, as I wanted to emulate the first IP1 assignment with
 * a Worker. :)
 *
 * @param {MessageEvent} event A message containing some data to act upon
 */
self.onmessage = (event) => {
  const command = event.data;
  switch(command) {
    case 'start': {
      // Using the setInterval in the WorkerGlobalScope (not Window)
      // to sending a message.
      self.setInterval(() => postMessage(this.name), 1000);
      break;
    }
    default: {
      // Inform if any wrong command are being used
      self.postMessage(`Unknown command: ${command}`);
    }
  }
}
