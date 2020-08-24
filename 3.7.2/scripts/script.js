/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.7.2,
 * Background processes (using the Web Worker API)
 *
 * An emulation of the IP1 1.1 Multi thread assignment using web workers.
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
 *
 * @author <a href="mailto:pebo6883@student.su.se">Peter Borgstedt</a>
 */

/** Print out any messages retrieved from Workers to the page */
const systemOutPrintLn = (event) => {
  const container = $('#terminal');
  container.append(`<div>${event.data}</div>`);
}

/**
 * Simplify using a Promise instead of doing chains an callbacks
 * which litter the code a lot and is harder to read.
 */
const threadSleep = (ms) => {
  return new Promise((resolve) => {
    const ref = setTimeout(() => {
      clearTimeout(ref); // Clean up
      resolve(); // Resolve promise (callback)
    }, ms);
  });
}

/**
 * Creates two workers which acts as threads and which communicates through the
 * Worker API for posting and retrieving messages back and forth and displaying
 * output in a terminal looking page.
 */
const publicStaticVoidMain = async () => {
  const w2 = new Worker('./worker.js', { name: 'T2: Tråd 2'});
  const w1 = new Worker('./worker.js', { name: 'T1: Tråd 1'});
  w2.onmessage = systemOutPrintLn;
  w1.onmessage = systemOutPrintLn;

  w1.postMessage('start');
  await threadSleep(5000);
  w2.postMessage('start');
  await threadSleep(5000);
  w1.terminate(); // Immediate without letting worker do any further progress
  await threadSleep(5000);
  w2.terminate();
}

/* A SOLUTION WITHOUT PROMISES USING CALLBACK CHAINING INSTEAD:
const publicStaticVoidMain = async () => {
  const w2 = new Worker('worker.js', { name: 'T2: Tråd 2'});
  const w1 = new Worker('worker.js', { name: 'T1: Tråd 1'});
  w2.onmessage = systemOutPrintLn;
  w1.onmessage = systemOutPrintLn;

  w1.postMessage('start');
  const w2Start = setTimeout(() => {
    clearTimeout(w2Start);
    w2.postMessage('start');

    const w1Interrupt = setTimeout(() => {
      clearTimeout(w1Interrupt);
      w1.postMessage('interrupt');

      const w2Interrupt = setTimeout(() => {
        clearTimeout(w2Interrupt);
        w2.postMessage('interrupt');
      }, 5000);
    }, 5000);
  }, 5000);
}
*/

$(document).ready(() => {
  if (window.Worker) {
    publicStaticVoidMain(); // Run emulation :)
  } else {
    // If browser does not support or is in a state that disallow it (running local in chrome)
    // display error message in console
    console.error('Browser or the state of it does not allow running Workers')
  }
});
