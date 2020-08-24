"use strict"

/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.2,
 * DOM-objekt och jQuery.
 *
 * Using JavsScript with ES6 features.
 *
 * A simple blog that demonstrate the following features:
 *
 * Define functions with "this" for easier access and export.
 *
 * Mutation of DOM:
 * - Fetches (querying of) elements
 * - Changing properties in elements
 * - Adding elements
 * - Removing elements
 * - Add and update of content in elements
 * - Retrieve information from elements
 * - Add and removal of classes in elements
 *
 * Mouse events:
 * - Usage of the "click" event
 *
 * Document and window events:
 * - Usage of "resize" event
 *
 * Form events:
 * - Usage of "submit" event
 * - Usage of "reset" event (is manually invoked within code)
 *
 * Key (keyboard) events:
 * - Usage of "Keydown" event
 *
 * Event object:
 * - Usage of "event.preventDefault" to prevent further progressing of the event
 *
 * Notice!
 * A stylesheet is being used for easy to read and clean code,
 * it is possible to inject styles directly on elements using jQuery or ƒetching
 * them directy using the document and then setting the styles explicitly.
 *
 * It is also a possible to create a style element and then append any
 * classes or styles in its content and then injecting it into the DOM.
 *
 * With that mention, some of the logic in this specific implementation sets
 * styles explicitly using jQuery.
 *
 * @author Peter Borgstedt <peter_borgstedt@hotmail.com>
 */
function Blog () {
  // No need to expose this parameters declaring like "this.postsAnchorElement".
  const postsAnchorElement = $("#posts");

  /**
   * Creates an HTML element for a post
   * @param {object} post Objekt som innehåller ämne och meddelande 
   * @returns HTMLElement
   */
  this.createPostElement = (post) => {
    const subjectElement = $('<div class="post-section"></div>');

    const highlightElement = $('<span class="post-highlight-button float-right clickable">\u2665</span>');
    const removeElement = $('<span class="float-right clickable">X</span>');

    // Explicitly set context "this" (otherwise "this" will be the invoking element)
    highlightElement.on('click', this.hightlightPost);
    removeElement.on('click', this.removePost.bind(this));

    subjectElement.append($('<span class="post-header float-left">Ämne:</span>'));
    subjectElement.append(removeElement);
    subjectElement.append(highlightElement);

    subjectElement.append($('<div class="float-clear">' + post.subject + '</div>'));

    const messageHeaderHtml = '<div class="post-header">Meddelande:</div>';
    const messageContentHtml = '<div>' + post.message + '</div>';
    const messageElement = $('<div class="post-section">' + messageHeaderHtml + messageContentHtml + '</div>');

    const postElement = $('<div id="' + post.id + '" class="post"></div>');
    postElement.append(subjectElement);
    postElement.append(messageElement);

    return postElement;
  }

  /**
   * Sets / updates the total amount of post.
   */
  this.setTotalPosts = () => {
    $('#post-counter').text('Totalt: ' + postsAnchorElement.children().length);
  }

  /**
   * Toggle element with text displaying there are no posts,
   * if there are posts the element is removed otherwise added.
   */
  this.toggleEmptyPosts = () => {
    const emptyPostElement = postsAnchorElement.children('.posts-empty');
    if (emptyPostElement.length) {
      // Remove if empty-post-element exists
      emptyPostElement.remove();
    } else if (!postsAnchorElement.children().length) {
      // Add if no children
      postsAnchorElement.append($('<div class="posts-empty">Inga inlägg</div>'));
    }
  }

  /**
   * Creates a post object from input.
   * @param {MousEvent} event A click event
   */
  this.addPost = (event) => {
    event.preventDefault(); // Will prohibit reloading of page

    // Retrieves data from the form and creates an object with key -> value
    const post = $(event.target)
      .serializeArray()
      .reduce((acc, item) => {
        acc[item.name] = item.value;
        return acc;
    }, { id: Date.now() }); // Id specificeras av en epoch

    event.target.reset(); // Use .reset() to clear values of the form

    this.toggleEmptyPosts();
    postsAnchorElement.append(this.createPostElement(post));

    this.setTotalPosts();
  }

  /**
   * Removes a selected post
   * @param {MouseEvent} event A click event
   */
  this.removePost = (event) => {
    const post = $(event.target).parents('.post');
    post.remove(); // Removes the post element from DOM
    this.setTotalPosts();
    this.toggleEmptyPosts();
  }

  /**
   * Highlights a selected post
   * @param {MouseEvent} event A click event
   */
  this.hightlightPost = (event) => {
    const highlightButton = $(event.target);
    const post = highlightButton.parents('.post');

    if (highlightButton.hasClass('post-highlight-button-active')) {
      highlightButton.removeClass('post-highlight-button-active');
      post.css('background-color', '');
    } else {
      highlightButton.addClass('post-highlight-button-active');
      post.css('background-color', '#FFFFAA');
    }
  }

  /**
   * Add key event listener and submit post if Shift+Enter is pressed.
   */
  this.addSubmitOnShiftEnter = () => {
    const submitOnShiftEnter = (event) => {
      if (event.keyCode == 13 && event.shiftKey) { // Shift-Enter
        const form = $('#post-form')[0];

        // Not supported in older browsers like IE
        if (form.reportValidity()) {
          form.requestSubmit();
        }

        // We do not want to process the event
        // TODO: test fix
        event.preventDefault();
        return false;
      }
    }

    // Map key event listener to inputs
    $('#post-subject').on('keydown', submitOnShiftEnter);
    $('#post-message').on('keydown', submitOnShiftEnter);
  }

  // Set some initial states
  this.addSubmitOnShiftEnter();
  this.toggleEmptyPosts();
}

$(document).ready(() => document.blog = new Blog())
