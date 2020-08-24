"use strict"

/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.4.1,
 * Effects and animations.
 *
 * Features:
 * - jQuery hide, show and toggle on element
 * - jQuery fadeIn, fadeOut, fadeToggle on element
 * - CSS animate on element with listening on 'animateend' event
 *
 * @author <a href="mailto:pebo6883@student.su.se">Peter Borgstedt</a>
 */

/** No need for any detailed code comments, its pretty self explanatory */
$(document).ready(() => {
  const showHideHelloWorld = $('#show-hide-hello-world');
  $('#show').on('click', (event) => showHideHelloWorld.show());
  $('#hide').on('click', (event) => showHideHelloWorld.hide());
  $('#toggle').on('click', (event) => showHideHelloWorld.toggle());

  const fadeInOutHelloWorld = $('#fade-in-out-hello-world');
  $('#fade-in').on('click', (event) => fadeInOutHelloWorld.fadeIn());
  $('#fade-out').on('click', (event) => fadeInOutHelloWorld.fadeOut());
  $('#fade-toggle').on('click', (event) => fadeInOutHelloWorld.fadeToggle());

  const duration = $('#duration');
  const opacity = $('#opacity');
  $('#fade-to').on('click', (event) => fadeInOutHelloWorld.fadeTo(duration.val() * 1000, opacity.val()));

  // CSS animation with some simple javascript logic for adding animation class
  // on click and then a event listener when the animation have ended ('animationend')
  const animate = $('#animate');
  const originalText = animate.text();
  animate.on('click', (event) => {
    animate.addClass('do-animate')
    animate.text(':)')
  });

  animate.on('animationend', (event) => {
    animate.removeClass('do-animate')
    animate.text(originalText);
  });

  // Animate with jQuery is really a hassle and any advanced stuff needs
  // a lot of coding, also colors are not supported, only unit properties.
  // It's much simpler with regular javascript if any advance logic is needed
  // and the use of CSS 'transition', 'animate' (with or without '@keyframes')
  // are just so powerful, see my example above.
  const animateJq = $('#animate-jq');
  const animateJqOnClick = () => {
    animateJq.off('click', animateJqOnClick);
    animateJq.animate({ height: "200px", width: "200px" }, 100, () => {
      // Animation complete, animate back...
      animateJq.animate({ height: "100px", width: "100px" }, 1000, () => {
        animateJq.on('click', animateJqOnClick); // Enable click again
      });
    });
  }
  animateJq.on('click', animateJqOnClick);
});
