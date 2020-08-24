/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.5.2,
 * File reading (using File API)
 *
 * Features:
 * - Read one or several text files from disk or url and display the content in a new page.
 * - Use link to invoke file dialog
 * - Use button to invoke file dialog
 * - Drag and drop an image file and display its content rendered
 *
 * @author <a href="mailto:pebo6883@student.su.se">Peter Borgstedt</a>
 */
$(document).ready(function() {
  const loadTextFiles = (files) => {
    const docs = $('#text-documents');

    for (const file of files) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        // Create element displaying a text document
        docs.append($(`
          <div class="text-container">
            <div class="text-header">src=${file.name}</div>
            <div class="text-document">
              <div class="text-content">${event.target.result}</div>
            </div>
          </div>
        `));
      }
      // Read file as text
      fileReader.readAsText(file);
    }
  }

  $('#text-file-loader').on('click', (event) => {
    event.preventDefault();
    const selector = $('<input type="file" accept=".txt" multiple="true">');
    selector.on('change', (event) => {
      const input = event.target;
      loadTextFiles(input.files);
    });
    selector.click();
  })

  // Do not allow drag & drop on body
  $(document.body).bind("dragover", (event) => false);
  $(document.body).bind("drop", (event) => false);

  $('#text-file-selector').on('change', (event) => {
    loadTextFiles(event.target.files);
  })

  $("#image-container").on('dragenter', (event) => {
    event.preventDefault();
    const container = $(event.target);
    container.removeClass('image-drop-zone-dropped');
    container.addClass('image-drop-zone-dragenter');
  });

  $("#image-container").on('dragleave', (event) => {
    event.preventDefault();
    const container = $(event.target);

    // If an image has been dropped previously then add that
    // class again
    if (container.find('img').length) {
      container.addClass('image-drop-zone-dropped');
    }
    container.removeClass('image-drop-zone-dragenter');
  });

  $("#image-container").on('dragover', (event) => {
    event.preventDefault();
    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/dropEffect
    event.originalEvent.dataTransfer.dropEffect = "copy"; // Display a nice drop icon
  });

  $("#image-container").on('drop', (event) => {
    event.preventDefault();
    const container = $(event.target);
    container.removeClass('image-drop-zone-dragenter');
    container.addClass('image-drop-zone-dropped');

    const [ file ] = event.originalEvent.dataTransfer.files;
    const img = new Image();

    // FileReader.readAsDataUrl will give a ready base64-encoded-image,
    // an no no need to retrieve a byte-array and decode it (using atob / btoa) manually
    var fr = new FileReader();
    img.src = fr.readAsDataURL(file);
    fr.onload = (event) => {
      img.src = event.target.result; // A base64 encoded image
      container.find('*').remove()
      container.append(img);
    };
  });
});
