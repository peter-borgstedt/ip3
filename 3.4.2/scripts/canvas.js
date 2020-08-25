/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.4.2,
 * Image management.
 *
 * Features:
 * - Drawing linear (straight) lines
 * - Drawing bézier curves
 * - Drawing shapes (rectangle, triangle and circle)
 * - Drawing text (with transparency and shadow)
 * - Drawing bitmaps (able to select from file)
 * - Clearing canvas
 * - Saving canvas to image-file
 *
 * References:
 * https://www.w3schools.com/tags/canvas_lineto.asp
 * https://www.w3schools.com/tags/canvas_beziercurveto.asp
 * https://www.w3schools.com/graphics/canvas_text.asp
 * https://www.w3schools.com/tags/canvas_measuretext.asp (get width of text)
 * https://stackoverflow.com/a/21434420 (parse font to get height)
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern
 * http://www.coding-dude.com/wp/javascript/drawing-simple-line-patterns-using-html5-canvas/
 * https://www.w3schools.com/tags/canvas_createlineargradient.asp
 *
 * @author <a href="mailto:pebo6883@student.su.se">Peter Borgstedt</a>
 */

/**
 * Draw linear line.
 * @param {CanvasRenderingContext2D} context The canvas 2D context
 * @param {Number} x0 start X position (horizontal)
 * @param {Number} y0 start Y position (vertical)
 * @param {Number} x1 end X position
 * @param {Number} y1 end Y position
 * @param {Number} size Line size
 * @param {String} color Line color
 */
const drawLine = (context, x0, y0, x1, y1, size, color) => {
  // Don't use any set shadows and transparency when drawing lines
  context.globalAlpha = 1;
  context.shadowColor = context.shadowBlur = null;

  context.lineWidth = size || 1;
  context.strokeStyle = color || 'black';
  context.beginPath();
  context.moveTo(x0, y0); // 0, 0
  context.lineTo(x1, y1); // 320, 240
  context.stroke();
  console.log('line drawn:', x0, y0, x1, y1);
}

/**
 * Draw bezier curve.
 * @param {CanvasRenderingContext2D} context The canvas 2D context
 * @param {*} startX Start X position (horizontal)
 * @param {*} startY Start Y position (vertical)
 * @param {*} bx0 Bezier point 1 X position
 * @param {*} by0 Bezier point 1 Y position
 * @param {*} bx1 Bezier point 2 X position
 * @param {*} by1 Bezier point 2 Y position
 * @param {*} endX End X position
 * @param {*} endY End Y position
 * @param {*} size Line size
 * @param {*} color Line color
 */
const drawBezierCurve = (context, startX, startY, bx0, by0, bx1, by1, endX, endY, size, color) => {
  // Don't use any set shadows and transparency when drawing lines
  context.globalAlpha = 1;
  context.shadowColor = context.shadowBlur = null;

  context.lineWidth = size || 1;
  context.strokeStyle = color || 'black';
  context.beginPath();
  context.moveTo(startX, startY);
  context.bezierCurveTo(bx0, by0, bx1, by1, endX, endY);
  context.stroke();
}

/**
 * Draw text.
 * @param {CanvasRenderingContext2D} context The canvas 2D context
 * @param {String} text Text to be drawn
 * @param {String} font Font to be used for text
 * @param {Number} fontSize Font size
 * @param {String} fontColor Font color
 * @param {String} shadowColor Shadow color
 * @param {Number} shadowBlur Shadow blur amount
 * @param {Number} globalAlpha Alpha / transparency amount 
 */
const drawText = (context, text, font, fontSize, fontColor, shadowColor, shadowBlur, globalAlpha) => {
  context.globalAlpha = globalAlpha || 1;
  context.shadowColor = shadowColor || 'black';
  context.shadowBlur = shadowBlur || 0;

  context.font = `normal ${fontSize || 12}px ${font || 'Arial'}`;
  context.fillStyle = fontColor || 'black';

  // Center the text
  const textWidth = context.measureText(text).width;
  const fontHeight = parseInt(context.font);
  const x = (canvas.width - textWidth) / 2;
  const y = (canvas.height + fontHeight) / 2;

  context.fillText(text, x, y);
  // Alternative (for stroke): context.strokeText(text, x, y);
}

/**
 * Draw shape.
 * @param {CanvasRenderingContext2D} context The canvas 2D context
 * @param {Number} x Start X position (horizontal)
 * @param {Number} y Start Y postion (vertical)
 * @param {Number} width Canvas width
 * @param {Number} height Canvas surface height
 * @param {String} color Shape fill color
 * @param {String} shape Shape name
 */
const drawShape = (context, x, y, width, height, color, shape) => {
  context.fillStyle = color;

  if (shape === 'rectangle') {
    context.fillRect(x, y, width, height);
  } else if (shape === 'circle') {
    console.log('cirkel');
    context.beginPath();
    context.arc(x + width / 2, y + height / 2, width / 2, 0, 2 * Math.PI); // 360
    context.fill();
  } else if (shape === 'triangle') {
    const x3 = x + width * Math.cos(45); 
    const y3 = y + height * Math.sin(45);

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + width, y);
    context.lineTo(x3, y3);
    context.fill();
  }
}

/**
 * Draw line gradient.
 * @param {CanvasRenderingContext2D} context The canvas 2D context
 * @param {Number} x Start X position (horizontal)
 * @param {Number} y Start Y postion (vertical)
 * @param {Number} width Canvas width
 * @param {Number} height Canvas surface height
 * @param {String} color1 Color 1
 * @param {String} color2 Color 2
 * @param {String} color3 Color 3
 */
const drawGradient = (context, x, y, width, height, color1, color2, color3) => {
  const gradient = context.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(0.5, color2);
  gradient.addColorStop(1, color3);
  
  context.fillStyle = gradient;
  context.fillRect(x, y, width, height);
}

/**
 * Draw pattern.
 * @param {CanvasRenderingContext2D} context The canvas 2D context
 * @param {Number} x Start X position (horizontal)
 * @param {Number} y Start Y postion (vertical)
 * @param {Number} width Canvas width
 * @param {Number} height Canvas surface height
 */
const drawPattern = (context, x, y, width, height) => {
  const size = 25;
  const pCanvas = document.createElement('canvas');
  pCanvas.width = size;
  pCanvas.height = size;

  const pContext = pCanvas.getContext('2d');
  pContext.fillStyle = '#00FF00';
  pContext.fillRect(0, 0, pCanvas.width, pCanvas.height);
  pContext.arc(0, 0, size, 0, 0.5 * Math.PI);
  pContext.stroke();

  context.fillStyle = context.createPattern(pCanvas, 'repeat');
  context.fillRect(x, y, width, height);
}

/**
 * Draw bitmap
 * @param {CanvasRenderingContext2D} context The canvas 2D context
 * @param {Number} x Start X position (horizontal)
 * @param {Number} y Start Y postion (vertical)
 * @param {Number} width Canvas width
 * @param {Number} height Canvas surface height
 * @param {HTMLImageElement} image Image element 
 */
const drawBitmap = (context, x, y, width, height, image) => {
  // Don't use any set shadows and transparency when drawing lines
  context.globalAlpha = 1;
  context.shadowColor = context.shadowBlur = null;

  context.drawImage(image, x, y, width, height);
}

/** No need for any detailed code comments, its pretty self explanatory */
$(document).ready(() => {
  /** Set some local available variables */
  const canvas = $('canvas')[0];
  const context = canvas.getContext("2d");

  /** Draws a linear line */
  $('#draw-line-button').on('click', (event) => {
    const x0 = Number($('#x0').val());
    const y0 = Number($('#y0').val());
    const x1 = Number($('#x1').val());
    const y1 = Number($('#y1').val());
    const color = $('#line-color').val();
    const size = Number($('#line-size').val());
    drawLine(context, x0, y0, x1, y1, size, color);
  });

  /** Draws a besier line */
  $('#draw-besier-curve-button').on('click', (event) => {
    const sx = Number($('#sx').val());
    const sy = Number($('#sy').val());
    const bx0 = Number($('#bx0').val());
    const by0 = Number($('#by0').val());
    const bx1 = Number($('#bx1').val());
    const by1 = Number($('#by1').val());
    const ex = Number($('#ex').val());
    const ey = Number($('#ey').val());
    const color = $('#bezier-color').val();
    const size = Number($('#bezier-size').val());

    drawBezierCurve(context, sx, sy, bx0, by0, bx1, by1, ex, ey, size, color);
  });

  /** Draws shapes (rectangle, triangle and circle) */
  $('#draw-shape-button').on('click', (event) => {
    const shape = $('#shape-select').val();
    const x = Number($('#shape-x').val());
    const y = Number($('#shape-y').val());
    const w = Number($('#shape-w').val());
    const h = Number($('#shape-h').val());
    const color = $('#shape-color').val();

    drawShape(context, x, y, w, h, color, shape);
  });

  /** Draws a gradient (three colors with equal length between their positions) */
  $('#draw-gradient-button').on('click', (event) => {
    const color1 = $('#gradient-color-1').val();
    const color2 = $('#gradient-color-2').val();
    const color3 = $('#gradient-color-3').val();
    drawGradient(context, 0, 0, canvas.width, canvas.height, color1, color2, color3);
  });

  $('#draw-pattern-button').on('click', (event) => {
    drawPattern(context, 0, 0, canvas.width, canvas.height);
  });

  /** Draw text */
  $('#draw-text-button').on('click', (event) => {
    const text = $('#text').val();
    const font = $('#font').val();
    const fontSize = Number($('#font-size').val());
    const fontColor = $('#font-color').val();

    const shadowColor = $('#shadow-color').val();
    const shadowBlur = Number($('#shadow-blur').val());
    const globalAlpha = Number($('#global-alpha').val());

    drawText(context, text, font, fontSize, fontColor, shadowColor, shadowBlur, globalAlpha);
  });

  // Create a file selector for custom bitmaps and use it internally
  // as we don't want the original 'look-and-feel' which is very hard
  // to adjust through css.
  const bitmapSelector = $('<input type="file" accept=".gif, .jpg, .jpeg, .png, .bmp">');
  const bitmapFileName = $('#bitmap-load-file-name');
  const bitmap = new Image();

  // Set default bitmap image
  bitmap.src = '../assets/sun.jpg';
  bitmapFileName.text('sun.jpg');

  /** Selects a custom bitmap */
  $('#bitmap-load-file-button').on('click', (event) => {
    bitmapSelector.on('change', (event) => {
      const bitmapFile = event.target.files[0];

      // Load bitmap with the FileReader (from the File API)
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
      // https://stackoverflow.com/a/15201258
      var fr = new FileReader();

      // When image has been loaded set the filename in the
      // file name span element
      bitmap.onload = () => bitmapFileName.text(bitmapFile.name);

      // When file is loaded set the result on the image element
      fr.onload = () => bitmap.src = fr.result;
      // Read data as URL, a safe way to read data (remotely and locally)
      fr.readAsDataURL(bitmapFile); // Converts to base64 string
    });
    bitmapSelector.click();
  })

  /** Draws a bitmap */
  $('#draw-bitmap-button').on('click', (event) => {
    const x = Number($('#bitmap-x').val());
    const y = Number($('#bitmap-y').val());
    const w = Number($('#bitmap-w').val());
    const h = Number($('#bitmap-h').val());
    drawBitmap(context, x, y, w, h, bitmap);
  });

  /** Clears the canvas */
  $('#clear-canvas').on('click', (event) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  })

  /** Saves the content in the canvas */
  $('#save-canvas').on('click', (event) => {
    // With the hyperlink element we got the attribute 'download' which
    // make it possible to actually decide a name, otherwise we will get
    // a UUID or something generated probably by the browser cache,
    // this is a nice approach.
    // Reference:
    // https://stackoverflow.com/a/58652379
    const el = document.createElement('a');
    el.setAttribute('download', 'canvas.png'); // The name we want to call the image
    
    // Use png as format (others can be used too)
    const image = canvas.toDataURL('image/png')
      // Set content-type, the 'image/octet-stream' means that the content contains
      // arbitrary binary data for an image.
      .replace('image/png', 'image/octet-stream');

    el.setAttribute("href", image);
    el.click();
  })
});
