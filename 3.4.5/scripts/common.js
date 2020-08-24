/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.4.5,
 * Form management.
 * 
 * 
 * When submitting a form elements of item, it will be part of the
 * collected data, so we want to use this kind of element for the list,
 * so they get collected.
 *
 * A hidden field let web developers include data that cannot be seen or
 * modified by users when a form is submitted.
 * 
 * References:
 * https://www.w3schools.com/tags/att_input_type_hidden.asp
 * https://stackoverflow.com/questions/10777970/can-i-mark-a-field-invalid-from-javascript
 * https://www.w3schools.com/js/js_validation.asp
 */

let entityIndex = 0; /** Global index for entities, avoid issues when removing items */

/**
 * Removes an item from a arbitrary of items
 * @param {MouseEvent} event Mouse click event
 * @param {String} itemId A HTMLElement id representing the
 */
const removeListItem = (event, itemId) => {
  event.preventDefault(); // Do not forward event, we do not want to submit the form

  $(`#${itemId}`).remove(); // Removes the hidden input from the form
  const uiListItem = $(`#ui-${itemId}`);
  const itemList = uiListItem.closest('.item-list');
  uiListItem.remove(); // Removes the styled HTMLDivElement (do this after we looked up the item list)

  if (!itemList.children().length) {
    itemList.text('Tomt...')
  }
}

/**
 * Creates two elements based on the value of an HTMLInputElement.
 * 1. A HTMLInputElement with "hidden" as type, which will be the data storage
 * 2. A styled HTMLDivElement which will be the UI representation of the item
 * The second will be appended to an collection element representing the item list. 
 *
 * @param {MouseEvent} event Mouse click event
 * @param {String} inputId The HTMLInputElement id containing the value for the new item
 * @param {String} listId The HTMLDivElement id containing a collection of items 
 */
const addListItem = (event, inputId, itemListId) => {
  event.preventDefault(); // Do not forward event, we do not want to submit the form

  const input = $('#' + inputId)
  if (input[0].reportValidity()) {
    const value = input.val();
    const itemList = $('#' + itemListId);
    console.log(itemList.data('name'));

    if (!itemList.children().length) {
      itemList.text('') // Clear
    }

    const id = itemListId + '-' + entityIndex++;

    // The actual input item with the value, using type="hidden"
    // https://www.w3schools.com/tags/att_input_type_hidden.asp
    const hiddenInput = $(`<input type="hidden" id="${id}" name="${itemList.data('name')}" value="${value}">`);
    itemList.append(hiddenInput);

    // A styled displaying representation of the item
    itemList.append($(`
      <div id="ui-${id}" class="item">
        <span class="item-label">${value}</span>
        <button class="item-button" onclick="removeListItem(event, '${id}')"></button>
      </div>`));

    input.val('') // Clear value after item has been added
  }
}

const onSelect = (event, subFormId) => {
  setEnabledAll('#' + subFormId, !event.target.checked);

  if (event.target.checked) {
    // https://stackoverflow.com/a/19012631
    $('html, body').animate({  scrollTop: $('#' + subFormId).offset().top }, 1000);
  }
}

const setEnabledAll = (parentId, enabled = false) => {
  const parent = $(parentId);
  parent.attr('disabled', enabled);
  parent.find('input').attr('disabled', enabled);
}

const save = (event) => {
  event.preventDefault(); // Do not forward event so page reloads

  const form = $(event.target);
  for (const input of form.find('input')) {
    if (input.willValidate && input.dataset.noValidationOnSubmit === undefined) {
      if (!input.reportValidity()) {
        return;
      }
    }
  }

  var object = $(form)
  .serializeArray() // https://stackoverflow.com/a/2276477
  .reduce((acc, item) => {
    const existingItem = acc[item.name]
    if (existingItem) { // Item with name already exist (is a group)
      // Any radio or checkbox groups should be placed in an array
      if (!Array.isArray(existingItem)) {
        acc[item.name] = [ existingItem ];
      }
      acc[item.name].push(item.value);
    } else {
      acc[item.name] = item.value;
    }
    return acc;
  }, {});

  console.log('Result:');
  console.dir(object);
  alert('Öppna upp konsolen för att formulärdatat (resultatet får ej plats i en alert ruta)');
}

$(document).ready(() => {
  setEnabledAll('#sport-sub-form', true);
  setEnabledAll('#food-sub-form', true);
  setEnabledAll('#music-sub-form', true);
  setEnabledAll('#art-sub-form', true);
});
