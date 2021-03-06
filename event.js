let bgHexString = "#ffffff";
let fgHexString = "#000000";
let BGC = [255, 255, 255];
let FGC = [0, 0, 0];

let body = document.getElementsByTagName("body")[0];

let change = document.getElementById("change");
let flip = document.getElementById("flip");
let copy = document.getElementById("copy");

copy.addEventListener("click", () => {
  copy.innerHTML = "COPIED " + "<i class=\"fas fa-check\">";
  let toCopy = "";
  Array.from(document.getElementsByTagName("p")).forEach((text) => {
    if (text.id === "di") return;
    toCopy += text.innerText + "\n";
  });

  navigator.clipboard.writeText(toCopy);
});

change.addEventListener("click", () => {
  // reset
  copy.innerText = "COPY";
  BGC = generatorRandomColor();
  FGC = getComplementary(BGC);

  bgHexString = convertRGBtoHEX(BGC);
  fgHexString = convertRGBtoHEX(FGC);

  display(BGC, fgHexString, bgHexString);
});

flip.addEventListener("click", () => {
  // reset
  copy.innerText = "COPY";
  // swap colors here
  let [xh, yh] = swap(fgHexString, bgHexString);
  fgHexString = xh;
  bgHexString = yh;

  [xh, yh] = swap(FGC, BGC);
  FGC = xh;
  BGC = yh;

  display(BGC, fgHexString, bgHexString);
});

/**
 * swaps two data of any type
 *
 * @param x the first element
 * @param y the second element
 * @return an array where `x = swap[0]` and `y = swap[1]`
 */
function swap(x, y) {
  return [y, x];
}

/**
 * Displays result to the browser
 *
 * @param bg the window background color
 * @param fgHexString the foreground Hex string
 * @param bgHexString the background Hex string
 */
function display(bg, fgHexString, bgHexString) {
  let isDark = isColorDark(bg);

  Array.from(document.getElementsByTagName("p")).forEach((text) => {
    text.style.color = fgHexString;
    if (text.id === "fg") text.innerHTML = "Foreground Color: " + fgHexString;
    else if (text.id === "bg") text.innerHTML = "Background Color: " + bgHexString;
    else text.innerHTML = "Dark Theme: " + isDark;

    // elevate text with an opposite color to enable dark-themed colors display properly
    if (isDark) {
      text.classList.add("dark");
      text.classList.remove("light");
    } else {
      text.classList.add("light");
      text.classList.remove("dark");
    }
  });

  Array.from(document.getElementsByTagName("button")).forEach((button) => {
    button.style.backgroundColor = bgHexString;
    button.style.color = fgHexString;

    // elevate text with an opposite color to enable dark-themed colors display properly
    if (isDark) {
      button.classList.add("dark");
      button.classList.remove("light");
    } else {
      button.classList.add("light");
      button.classList.remove("dark");
    }
  });

  body.style.backgroundColor = bgHexString;
}

/**
 * Retrieves the complementary colors
 *
 * @param the color to complement
 * @returns the color in RGB
 */
function getComplementary(colors = [0, 0, 0]) {
  let r = colors[0];
  let b = colors[1];
  let g = colors[2];

  let x = Math.max(r, b, g) + Math.min(r, b, g);

  let rr = x - r;
  let bb = x - b;
  let gg = x - g;
  return [Math.ceil(rr), Math.floor(bb), Math.floor(gg)];
}

/**
 * Convert from RGB color space to corresponding HEX string
 *
 * @param the RGB color
 */
function convertRGBtoHEX(colors = [0, 0, 0]) {
  return (
    "#" +
    colors[0].toString(16).padStart(2, "0") +
    colors[1].toString(16).padStart(2, "0") +
    colors[2].toString(16).padStart(2, "0")
  );
}

/**
 * Generates a random color in RGB
 *
 * @returns an array representing the colors
 */
function generatorRandomColor() {
  let red = Math.round(Math.random() * 254);
  let blue = Math.round(Math.random() * 254);
  let green = Math.round(Math.random() * 254);
  return [red, blue, green];
}

/**
 * Checks if a color is dark or light using the HSP color space
 *
 * @param the color in RGB
 */
function isColorDark(colorValues = [0, 0, 0]) {
  // R.E: http://alienryderflex.com/hsp.html
  let [red, blue, green] = colorValues;
  let hsp = Math.sqrt(0.299 * Math.pow(red, 2) + 0.587 * Math.pow(green, 2) + 0.114 * Math.pow(blue, 2));
  console.log("hsp: " + hsp);
  if (hsp > 127.5) return false;
  else return true;
}
