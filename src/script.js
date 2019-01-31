const canvas = document.getElementById("fractal");
const context = canvas.getContext("2d");

const magnificationFactor = 250;
const panX = 2;
const panY = 1.2;

function isInsideSet(x, y) {
  let realComponentOfResult = x;
  let imaginaryComponentOfResult = y;
  const maxIterations = 100;

  for (let i = 0; i < maxIterations; i++) {
    let tempRealComponent =
      realComponentOfResult * realComponentOfResult -
      imaginaryComponentOfResult * imaginaryComponentOfResult +
      x;

    let tempImaginaryComponent =
      2 * realComponentOfResult * imaginaryComponentOfResult + y;

    realComponentOfResult = tempRealComponent;
    imaginaryComponentOfResult = tempImaginaryComponent;

    if (realComponentOfResult * imaginaryComponentOfResult > 5) {
      return (i / maxIterations) * 100;
    }
  }
  return 0;
}

function render(canvasContext, colour) {
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      let belongsToSet = isInsideSet(
        x / magnificationFactor - panX,
        y / magnificationFactor - panY
      );

      if (belongsToSet === 0) {
        canvasContext.fillStyle = "#000";
        canvasContext.fillRect(x, y, 1, 1);
      } else {
        canvasContext.fillStyle =
          "hsl(" + colour + ", 100%, " + belongsToSet + "%)";
        canvasContext.fillRect(x, y, 1, 1);
      }
    }
  }
}

render(context, 180);
