/**
 * File background.js.
 *
 * Handles background lines design and onclick listeners
 */
( function() {

  // initialize variables for canvas drawing
  var canvas = document.getElementsByClassName('site-canvas')[0],
      context = canvas.getContext('2d'),
      pixilRatio = window.devicePixelRatio || 1,
      width = window.innerWidth,
      height = window.innerHeight,
      canvasSize = 0.8,
      xInitial = (1 - canvasSize) * width / 2,
      yInitial = (1 - canvasSize) * height / 2,
      xFinal = (1 + canvasSize) * width / 2,
      yFinal = (1 + canvasSize) * height / 2,
      numberOfLines,
      points,
      radians = 0,
      math = Math,
      floor = math.floor,
      twoPi = math.PI * 2,
      cos = math.cos,
      random = math.random;

  canvas.width = width * pixilRatio;
  canvas.height = height * pixilRatio;
  context.scale(pixilRatio, pixilRatio);
  context.lineWidth = 3;
  context.globalAlpha = 0.1;

  // function to draw lines on canvas
  function canvasDraw() {
    context.clearRect(0, 0, width, height);
    numberOfLines = floor(5 + 20 * random());
    points = [
      {
        x: canvasSize * width * random() + xInitial,
        y: canvasSize * height * random() + yInitial
      }, {
        x: canvasSize * width * random() + xInitial,
        y: canvasSize * height * random() + yInitial
      }
    ];
    while(numberOfLines > 0) drawLine(points[0], points[1]);
  }

  // function to draw a line
  function drawLine(initialPoint, finalPoint) {
    context.beginPath();
    context.moveTo(initialPoint.x, initialPoint.y);
    context.lineTo(finalPoint.x, finalPoint.y);
    radians += twoPi / 50;
    context.strokeStyle = '#' + (
      cos(radians) * 127 + 128 << 16 |
      cos(radians + twoPi / 3) * 127 + 128 << 8 |
      cos(radians + twoPi / 3 * 2) * 127 + 128
    ).toString(16);
    context.stroke();
    points[0] = points[1];
    points[1] = {
      x: canvasSize * width * random() + xInitial,
      y: canvasSize * height * random() + yInitial
    };
    numberOfLines--;
  }

  // function to initialize the canvas
  function canvasInit() {
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    });
    document.onclick = canvasDraw;
    document.ontouchstart = canvasDraw;
    canvasDraw();
  }

  // run initialization function
  canvasInit();

} )();
