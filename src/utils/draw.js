import {
  generateProporties,
  randomInteger,
  setGradient,
  hexToRgb
} from './helpers';
import {ANAGLYPH} from "../constants/appConstants";


function enableDropShadows(p5) {
  p5.drawingContext.shadowOffsetX = 10;
  p5.drawingContext.shadowOffsetY = 10;
  p5.drawingContext.shadowBlur = 5;
  p5.drawingContext.shadowColor = 'rgba(0,0,0,.2)';
}

function disableDropShadows(p5) {
  p5.drawingContext.shadowOffsetX = 0;
  p5.drawingContext.shadowOffsetY = 0;
  p5.drawingContext.shadowBlur = 0;
  p5.drawingContext.shadowColor = 'transparent';
}

function drawAnaglyph(p5, x, y, width, height) {
  p5.fill(`rgba(${hexToRgb(ANAGLYPH[0])},${.1})`);
  p5.rect(x - 2, y, width, height);

  p5.fill(`rgba(${hexToRgb(ANAGLYPH[1])},${.1})`);
  p5.rect(x + 2, y, width, height);
}

// function calcPolygon(input) {
//   //n: number of vertices = number of sides
//   //r: radius (circumscribed circle)
//   //a: counterclockwise rotation angle in radians
//   //cx: center x (offset)
//   //cy: center y (offset)
//   //round: number of decimal places to keep (0-20)
//   var output = []
//   for (var i = 1; i <= input.n; i++) {
//     output.push({
//       x: ((input.r * Math.cos(input.a + 2 * i * Math.PI / input.n)) + input.cx).toFixed(input.round),
//       y: ((input.r * Math.sin(input.a + 2 * i * Math.PI / input.n)) + input.cy).toFixed(input.round)
//     })
//   }
//   return output
// }

function spiral(input) {
  var output = []
  for (let i = 0; i <= input.n; i++) {
    let angle = 0.1 * i;

    output.push({
      x: input.cx + (input.a + input.b * angle) * Math.cos(angle),
      y: input.cy + (input.a + input.b * angle) * Math.sin(angle)
    })
  }

  return output
}


export const draw = (p5, settings) => {
  const {
    countBlockLoops,
    blockGradient,
    canvasWidth,
    canvasHeight,
    drawFinalCircles,
    finalVerticalLines,
    finalHorizontalLines,
    finalVerticalLinesCount,
    finalHorizontalLinesCount,
    countFinalCircles,
    anaglyph,
    shadows,
    palletGradient,
    animation,
    frameRate
  } = settings;

  p5.resizeCanvas(canvasWidth, canvasHeight);

  if (animation) {
    p5.loop();
    p5.frameRate(frameRate)
  } else {
    p5.noLoop()
  }

  const pallet = settings.pallet.split(',')
  const backGround = pallet[1]

  p5.background(`#${backGround}`);
  // p5.frameRate(20)
  p5.noStroke();
  // p5.blendMode(p5.MULTIPLY)

  //draw rectangles based on center

  if (shadows) {
    enableDropShadows(p5)
  }

  //draw rectangles based on vertical
  // p5.translate(width / 2, height / 2);

  // const circle = calcPolygon({
  //   n: countBlockLoops,
  //   r: canvasWidth / 2,
  //   a: 0,
  //   cx: canvasWidth / 2,
  //   cy: canvasHeight / 2,
  //   round: 2
  // });

  // const spiralValue = spiral({
  //   n: countBlockLoops,
  //   cx: canvasWidth / 2,
  //   cy: canvasHeight / 2,
  //   a: 30,
  //   b: 30
  // })

  for (let i = 0; i <= countBlockLoops; i++) {
    const {
      color,
      color2,
      y,
      width,
      height,
      opacity
    } = generateProporties(pallet, canvasWidth, canvasHeight, palletGradient, 'staticX')

    if (anaglyph) {
      drawAnaglyph(p5, 0, y, width, height)
    }


    if (blockGradient) {
      setGradient(0, y, width, height, color, color2, 'Y_AXIS', p5)
    } else {
      p5.fill(`rgba(${hexToRgb(color)},${opacity})`);
      // p5.translate(width/2, height/2);
      // p5.rotate(p5.PI / 180 * 45);
      p5.rect(0, y, width, height);
    }

  }

  // return false


  // return false

  //draw rectangles based on horizontal
  for (let i = 0; i <= countBlockLoops; i++) {
    const {
      color,
      color2,
      x,
      width,
      height,
      opacity
    } = generateProporties(pallet, canvasWidth, canvasHeight, palletGradient, 'staticY', countBlockLoops, i)
    if (anaglyph) {
      drawAnaglyph(p5, x, 0, width, height)
    }

    if (blockGradient) {
      setGradient(x, 0, width, height, color, color2, 'Y_AXIS', p5)
    } else {
      p5.fill(`rgba(${hexToRgb(color)},${opacity})`);
      // p5.translate(width/2, height/2);
      // p5.rotate(p5.PI / 180 * 45);
      p5.rect(x, 0, width, height);
    }

    // p5.translate(width/2, height/2);
    // p5.rotate(p5.PI / 180 * 45);
  }

  // return false
  //draw rectangles based on center

  for (let i = 0; i <= countBlockLoops; i++) {
    const {
      color,
      color2,
      x,
      y,
      width,
      height,
      opacity
    } = generateProporties(pallet, canvasWidth, canvasHeight, palletGradient, null, countBlockLoops, i)
    if (anaglyph) {
      drawAnaglyph(p5, x, y, width, height)
    }

    if (blockGradient) {
      setGradient(x, y, width, height, color, color2, 'Y_AXIS', p5)
    } else {
      p5.fill(`rgba(${hexToRgb(color)},${opacity})`);
      // p5.translate(width/2, height/2);
      // p5.rotate(p5.PI / 180 * 45);
      // p5.rotate(p5.PI / 180 * 45);
      p5.rect(x, y, width, height);
      // p5.rotate(0);
    }

    // p5.translate(width/2, height/2);
  }

  //vortex
  // for (let i = 0; i <= countBlockLoops; i++) {
  //   const {
  //     color,
  //     color2,
  //     y,
  //     width,
  //     height,
  //     opacity
  //   } = generateProporties(pallet, canvasWidth, canvasHeight)
  //
  //   if (anaglyph) {
  //     drawAnaglyph(p5, 0, y, width, height)
  //   }
  //
  //
  //   if (blockGradient) {
  //     setGradient(0, y, width, height, color, color2, 'Y_AXIS', p5)
  //   } else {
  //     p5.fill(`rgba(${hexToRgb(color)},${opacity})`);
  //     p5.rect(spiralValue[i].x - width / 2, spiralValue[i].y - height / 2, width, height);
  //   }
  // }


  // enableDropShadows(p5)
  // for (let i = 0; i <= 10; i++) {
  //   const {
  //     color,
  //     color2,
  //     x,
  //     y,
  //     width,
  //     height,
  //     opacity
  //   } = generateProporties(pallet, canvasWidth, canvasHeight)
  //   if (anaglyph) {
  //     drawAnaglyph(p5, x, y, width, height)
  //   }
  //
  //   if (blockGradient) {
  //     setGradient(x, y, width, height, color, color2, 'Y_AXIS', p5)
  //   } else {
  //     p5.fill(`rgba(${hexToRgb(color)},${.9})`);
  //     // p5.translate(width/2, height/2);
  //     // p5.rotate(p5.PI / 180 * 45);
  //     // p5.rotate(p5.PI / 180 * 45);
  //     p5.rect(x, y, width / 2, height / 2);
  //     // p5.rotate(0);
  //   }
  //
  //   // p5.translate(width/2, height/2);
  // }
  // disableDropShadows(p5)


  if (shadows) {
    disableDropShadows(p5)
  }

  //draw circles based on center
  // enableDropShadows(p5)

  if (drawFinalCircles) {
    for (let i = 0; i <= countFinalCircles; i++) {

      const {
        color,
        x,
        y,
        width,
        opacity
      } = generateProporties(pallet, canvasWidth, canvasHeight, palletGradient, null, countBlockLoops, i)

      //add anaglyph
      // if (random_boolean()) {
      //   p5.fill(`rgba(${hexToRgb(anaglyph[0])},${.2})`);
      //   p5.ellipse(x - 10, y, width);
      //
      //   p5.fill(`rgba(${hexToRgb(anaglyph[1])},${.2})`);
      //   p5.ellipse(x + 10, y, width);
      // }

      p5.fill(`rgba(${hexToRgb(color)},${opacity})`);
      p5.ellipse(x, y, width / 2);

      // if (random_boolean()) {
      //   p5.blendMode(p5.LIGHTEST)
      //
      //   const color2 = pallet[randomInteger(0, pallet.length - 1)];
      //   p5.fill(`rgba(${hexToRgb(color2)},${.1})`);
      //   p5.ellipse(x + 5, y + 5, width - 10);
      //
      //   p5.blendMode(p5.BLEND)
      // }
    }
  }


  // disableDropDhadows(p5)

  if (finalVerticalLines) {
    for (let i = 0; i <= finalVerticalLinesCount; i++) {
      const color = pallet[randomInteger(0, pallet.length - 1)];
      const x = randomInteger(0, canvasWidth);
      const width = randomInteger(0, 2);
      const height = randomInteger(50, canvasHeight);
      p5.fill(`rgba(${hexToRgb(color)},${.1})`);
      p5.rect(x, 0, width, height);
    }
  }

  if (finalHorizontalLines) {
    for (let i = 0; i <= finalHorizontalLinesCount; i++) {
      const color = pallet[randomInteger(0, pallet.length - 1)];
      const y = randomInteger(0, canvasHeight);
      const width = randomInteger(0, canvasWidth);
      const height = randomInteger(0, 2);
      p5.fill(`rgba(${hexToRgb(color)},${.1})`);
      p5.rect(0, y, width, height);
    }
  }


  //   p5.fill(102);
  // p5.rect(0, 0, 100, 60);
  //
  // p5.fill('#fff');
  // p5.rect(0, 0, 50, 30);

  // p5.ellipse(x, y, 70, 70);
  // NOTE: Do not use setState in the draw function or in functions that are executed
  // in the draw function...
  // please use normal variables or class properties for these purposes
}
