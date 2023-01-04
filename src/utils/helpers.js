export const random_boolean = function () {
  return Math.random() < 0.5
}

export const generateProporties = (pallet, canvasWidth, canvasHeight, palletGradient = false, type = 'default', countBlockLoops, countIndex) => {
  let canvasHeightLimitMax = canvasHeight;
  let canvasHeightLimitMin = 0;

  // if (countIndex > 0 && countIndex <= countBlockLoops / 3) {
  //   canvasHeightLimitMax = canvasHeight / 3
  //   canvasHeightLimitMin = 0
  // }
  //
  // if (countIndex > countBlockLoops / 3 && countIndex <= countBlockLoops / 3 * 2) {
  //   canvasHeightLimitMax = canvasHeight / 3 * 2
  //   canvasHeightLimitMin = canvasHeight / 3
  // }
  //
  // if (countIndex > countBlockLoops / 3 * 2 && countIndex <= countBlockLoops) {
  //   canvasHeightLimitMax = canvasHeight
  //   canvasHeightLimitMin = canvasHeight / 3 * 2
  // }


  const x = type === 'staticX' ? 0 : randomInteger(0, canvasWidth);
  const y = type === 'staticY' ? 0 : randomInteger(canvasHeightLimitMin, canvasHeightLimitMax);

  const sizeBlocks = randomInteger(2, 5)

  const width = randomInteger(0, canvasWidth / sizeBlocks);
  const height = randomInteger(0, canvasHeight / sizeBlocks);

  let color = pallet[randomInteger(0, pallet.length - 1)];

  //split 3 pieces
  if (palletGradient) {
    // countBlockLoops, countIndex

    const palletLength = pallet.length;
    var size = Math.round(pallet.length / 3);
    var arrayOfArrays = [];
    for (var i = 0; i < palletLength; i += size) {
      arrayOfArrays.push(pallet.slice(i, i + size));
    }

    console.log('y: ',y);
    console.log(Math.round(canvasWidth / 3))
    console.log(Math.round(canvasWidth / 3 * 2))
    console.log(canvasWidth)

    if (y >= 0 && y <= Math.round(canvasHeight / 3)) {
      color = arrayOfArrays[0][randomInteger(0, arrayOfArrays[0].length - 1)]
    }

    if (y >= Math.round(canvasHeight / 3) && y <= Math.round(canvasHeight / 3 * 2)) {
      color = arrayOfArrays[1][randomInteger(0, arrayOfArrays[1].length - 1)]
    }

    if (y >= Math.round(canvasHeight / 3 * 2) && y <= canvasHeight) {
      color = arrayOfArrays[2][randomInteger(0, arrayOfArrays[2].length - 1)]
    }
  }
  //


  let color2 = pallet[randomInteger(0, pallet.length - 1)];

  do {
    color2 = pallet[randomInteger(0, pallet.length - 1)];
  } while (color === color2);


  const opacity = randomInteger(20, 100) / 100;

  return {
    color,
    color2,
    x,
    y,
    width,
    height,
    opacity
  }
}

export const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const setGradient = (x, y, w, h, color1, color2, axis, p5) => {
  const color1Rgb = hexToRgb(color1).split(',');
  const color2Rgb = hexToRgb(color2).split(',');
  const c1 = p5.color(color1Rgb[0], color1Rgb[1], color1Rgb[2]);
  const c2 = p5.color(color2Rgb[0], color2Rgb[1], color2Rgb[2]);
  p5.noFill();

  if (axis === 'Y_AXIS') {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = p5.map(i, y, y + h, 0, 1);
      let c = p5.lerpColor(c1, c2, inter);
      p5.stroke(c);
      p5.line(x, i, x + w, i);
    }
  } else if (axis === 'X_AXIS') {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = p5.map(i, x, x + w, 0, 1);
      let c = p5.lerpColor(c1, c2, inter);
      p5.stroke(c);
      p5.line(i, y, i, y + h);
    }
  }
  p5.noStroke();
}

export const hexToRgb = (hex) => {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return r + "," + g + "," + b;
}
