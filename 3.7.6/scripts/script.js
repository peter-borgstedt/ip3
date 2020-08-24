/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.7.6,
 * Offline Application
 *
 * A simple static web page with three pages, images and minor content.
 * Displays connections status whether user has internet connection, if the
 * site is reachable (site is down or up).
 * 
 * Application Cache is now deprecated and not recommended to be used,
 * also parts in the manifest related to the application cache is deprecated,
 * such as the section headers (CACHE, NETWORK, FALLBACK).
 *
 * Read more about this at:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache (deprecated)
 *
 * The new recommended way is to use the Cache API and a service worker, which
 * has been used to solve this assignment.
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/caches
 * https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
 * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/connection
 * https://stackoverflow.com/a/189443
 */
/** Register or updates an existing service worker */
const registerServiceWorker = () => {
  navigator.serviceWorker.register('./worker.js')
    .then((registration) => {
      if (registration.installing) {
        // Installs a new or updates existing service worker
        console.log('Service worker installing');
      } else if (registration.waiting) {
        // Waiting for clients using old version of service worker
        // to end their session, afterward the new service worker
        // will be activated and the old removed
        console.log('Service worker installed');
      } else if (registration.active) {
        // The service worker is already active (and up to date)
        console.log('Service worker active');
      }
    })
    .catch((error) => console.error(error));
};

/**
 * Check whether its possible to connect to the site by trying to
 * retrieve a resource that is not cached in the Cache API by service worker
 */
const checkIfSiteIsUp = () => {
  // We might have internet connection, but the site may be down,
  // a way to check this is to try fetch something that we have not
  // explicitly cached (like one of the image that is ignored being caching)
  return fetch('./images/www.png', { method: 'get' })
    .then((result) => result.ok)
    .catch((error) => false)
};

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    // Check if site is online or if we are in a offline
    // mode either by internet being disconnected or the site is down
    checkIfSiteIsUp().then((siteIsOnline) => {
      const internetStatus = document.getElementById('internet-status');
      const siteStatus = document.getElementById('site-status');
        // Set if there is a internet connection or not
      internetStatus.textContent = navigator.onLine ? 'Connected' : 'Disconnected';
      // Set if site is offline or not
      siteStatus.textContent = siteIsOnline ? 'Online' : 'Offline';
    });

    // Register or update service worker if not already registered or up to date
    registerServiceWorker();
  }
});
