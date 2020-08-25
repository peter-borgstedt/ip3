/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.4.2,
 * Image management.
 *
 * Features:
 * - Preloading of images
 * - Image rollover effect (using hover and attr with JQuery)
 *
 * References:
 * https://stackoverflow.com/questions/3646036/preloading-images-with-javascript
 * https://api.jquery.com/hover
 *
 * @author <a href="mailto:pebo6883@student.su.se">Peter Borgstedt</a>
 */

/**
 * A simple function for preloading images creating
 * a HTMLImageElement to cache them in the browser,
 * the callback is called upon when all images have been
 * loaded.
 * @param {Array.<String>} images Images paths
 * @param {Function} done Invoked when all are preloaded
 */
const preload = function(images, done) {
  let preloaded = 0; // The amount of finished loaded images
  for (const image of images) {
    const img = new Image();
    img.onload = () => {
      if (images.length === ++preloaded) {
        done(); // Invoke callback method when all images have been loaded
      }
    };
    img.src = image; // Start loading image file
  }
}

/** No need for any detailed code comments, its pretty self explanatory */
$(document).ready(() => {
  const bitmap = $('<img width="320" height="240" alt="Bitmap">');
  bitmap.attr('id', 'bitmap');

  const bitmapPlaceholder = $('#bitmap-placeholder');
  bitmapPlaceholder.append(bitmap);
  
  preload(['../../assets/sun.jpg', '../../assets/strawberry.jpg'], () => {
    // All images have been preloaded
    bitmap.attr('src', '../../assets/sun.jpg'); // Set initial image

    // The .hover method is a combination of .mouseenter .mouseleave,
    // which also most likely are regular html events behind the scene
    bitmap.hover(() => bitmap.attr('src', '../../assets/strawberry.jpg'),
                () => bitmap.attr('src', '../../assets/sun.jpg'));
  })
});
