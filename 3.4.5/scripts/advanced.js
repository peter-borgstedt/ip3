/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.4.5,
 * Form management.
 *
 * More flexibilities and dynamics, create sub forms using a method
 * with properties for its content and inject it into a element placeholder.
 *
 * References:
 * https://www.w3schools.com/tags/att_input_type_hidden.asp
 * https://stackoverflow.com/questions/10777970/can-i-mark-a-field-invalid-from-javascript
 * https://www.w3schools.com/js/js_validation.asp
 *
 * @author <a href="mailto:pebo6883@student.su.se">Peter Borgstedt</a>
 */

/**
 * Creates a sub-form containing two areas,
 * first an area for picking favorite genres,
 * second an area for adding favorite entities for any sorts.
 * @param {object} props Properties defining the content of the sub-form
 */
const createSubForm = (properties) => {
  const {
    id,
    genreHeader, genreItems,
    entityHeader, entityPlaceholder, entitiesHeader
  } = properties;

  /**
   * NOTE! I do not consider this as a pure HTML as it is partially using literal strings and
   * jQuery for injecting it into the DOM. A requirement in the courses says no CSS and
   * no HTML in javascript code. This could ofcourse be split into single rows instead,
   * or even use the document.createElement(...) but the strong part of jQuery is its easy
   * injection of dynamic html combined javascript.
   * If this would be an issue, this part of the assignment is just done as extra,
   * the form-dynamic-basic.html and its resources is the offical part.
   */
  const subform = $(`
    <div id="${id}-sub-form" class="grid-layout-3">
      <fieldset id="genre-${id}-list" class="grid-span-3">
        <legend>${genreHeader}</legend>
      </fieldset>

      <label for="genre-${id}-entity-input">${entityHeader}</label>
      <input type="text" id="genre-${id}-entity-input" placeholder="${entityPlaceholder}" required data-no-validation-on-submit>
      <button onclick="addListItem(event, 'genre-${id}-entity-input', 'genre-${id}-entity-list')">+</button>

      <fieldset class="grid-span-3">
        <legend>${entitiesHeader}</legend>
        <div id="genre-${id}-entity-list" class="item-list" data-name="genre-${id}-entities">Tomt...</div>
      </fieldset>
    </div>
  `);

  const genres = subform.find(`#genre-${id}-list`)
  const genreItemEntries = Object.entries(genreItems);

  for (let i = 0; i < genreItemEntries.length; i++) {
    const [ name, value ] = genreItemEntries[i];

    genres.append(`
      <input type="checkbox" id="genre-${id}-${i}" name="genre-${id}" value="${value}">
      <label for="genre-${id}-${i}">${name}</label>
    `);
  }

  // Disable as default
  subform.attr('disabled', true);
  subform.find('input').attr('disabled', true);

  return {
    subformId: `${id}-sub-form`,
    subform,
    properties
  }
}

$(document).ready(() => {
  /**
   * Configures different sub forms with their content.
   */
  const subforms = [
    createSubForm({
      id: 'sport',
      interest: 'Sport',
      genreHeader: 'Favorit sport',
      genreItems: {
        ['Fotboll']: 'fotboll',
        ['Tennis']: 'tennis',
        ['Simning']: 'simning',
        ['Cyckling']: 'cyckling',
      },
      entityHeader: 'Favorit athleter',
      entityPlaceholder: 'Namn på atlet',
      entitiesHeader: 'Atleter'
    }),

    createSubForm({
      id: 'food',
      interest: 'Mat',
      genreHeader: 'Favorit matkultur',
      genreItems: {
        ['Japanskt']: 'japanskt',
        ['Svenskt']: 'svenskt',
        ['Italienskt']: 'italienskt',
        ['Spanskt']: 'spanskt',
      },
      entityHeader: 'Favorit kock',
      entityPlaceholder: 'Namn på kock',
      entitiesHeader: 'Kockar'
    }),

    createSubForm({
      id: 'music',
      interest: 'Musik',
      genreHeader: 'Favorit musik genre',
      genreItems: {
        ['Klassiskt']: 'klassiskt',
        ['Pop']: 'pop',
        ['Rock']: 'rock',
        ['Hiphop']: 'hiphop',
      },
      entityHeader: 'Favorit artister',
      entityPlaceholder: 'Namn på artist',
      entitiesHeader: 'Artister'
    }),

    createSubForm({
      id: 'art',
      interest: 'Konst',
      genreHeader: 'Favorit konststil',
      genreItems: {
        ['Impressionism']: 'impressionism',
        ['Avantgarde']: 'avantgarde',
        ['Barock']: 'barock',
        ['Klassicism']: 'klassicism',
      },
      entityHeader: 'Favorit artister',
      entityPlaceholder: 'Namn på artist',
      entitiesHeader: 'Artister'
    })
  ]

  /** Inject sub forms into the element placeholder in the form */
  for (const { subformId, subform, properties} of subforms) {
    $('#sub-forms').append(subform);
    $('#interests').append(`
      <input type="checkbox" id="interest-${properties.id}"
             name="interest" value="${properties.interest}"
             onchange="onSelect(event, '${subformId}')">
      <label for="interest-${properties.id}">${properties.interest}</label>
    `);
  }
});
