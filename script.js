const picked = document.getElementById("pickCol");

const cBtn = document.getElementById("colour");
const rBtn = document.getElementById("rainbow");
const eBtn = document.getElementById("erase");
const sBtn = document.getElementById("shading");
const clBtn = document.getElementById("clear");

const slider = document.getElementById("slider");
const numSize = document.getElementById("size-value");
const grid = document.getElementById("grid");

let curCol = "#95a984";
let curBtn = "colour";
let curSize = 16;

let mouseHold = false;

document.body.onmousedown = () => (mouseHold = true);
document.body.onmouseup = () => (mouseHold = false);

picked.addEventListener("input", function (e) {
  curCol = e.target.value;
});

cBtn.onclick = function () {
  setCurBtn("colour");
};
rBtn.onclick = function () {
  setCurBtn("rainbow");
};
eBtn.onclick = function () {
  setCurBtn("eraser");
};
sBtn.onclick = function () {
  setCurBtn("shading");
};
clBtn.onclick = function () {
  updateSetup();
};

slider.onmousemove = function (e) {
  updateSize(e.target.value);
};
slider.onchange = function (e) {
  deploySize(e.target.value);
};

function setCurBtn(nextBtn) {
  activatedBtnListener(nextBtn);
  curBtn = nextBtn;
}
function setCurSize(nextSize) {
  curSize = nextSize;
}

function colChange(e) {
  if (e.type === "mouseover" && !mouseHold) {
    return;
  }

  const cell = e.target;
  const currentColor = cell.style.backgroundColor;
  let r, g, b;

  if (curBtn === "colour") {
    cell.style.backgroundColor = curCol;
  } else if (curBtn === "rainbow") {
    const R = Math.floor(Math.random() * 255);
    const G = Math.floor(Math.random() * 255);
    const B = Math.floor(Math.random() * 255);
    cell.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
  } else if (curBtn === "eraser") {
    cell.style.backgroundColor = "#fff8dc";
  } else if (curBtn === "shading") {
    if (currentColor === "rgb(255, 255, 255)") {
      // If the cell is white, start shading with the current color
      cell.style.backgroundColor = curCol;
    } else {
      // Calculate shading by darkening the current color
      const shadingFactor = 0.1; // Amount to darken the color on each shading

      r = parseInt(currentColor.slice(4, -1).split(",")[0].trim());
      g = parseInt(currentColor.slice(4, -1).split(",")[1].trim());
      b = parseInt(currentColor.slice(4, -1).split(",")[2].trim());

      r = Math.max(r - shadingFactor * 255, 0);
      g = Math.max(g - shadingFactor * 255, 0);
      b = Math.max(b - shadingFactor * 255, 0);

      cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
  }
}

function activatedBtnListener(newBtn) {
  switch (curBtn) {
    case "colour":
      cBtn.classList.remove("active");
      break;
    case "rainbow":
      rBtn.classList.remove("active");
      break;
    case "eraser":
      eBtn.classList.remove("active");
      break;
    case "shading":
      sBtn.classList.remove("active");
      break;
  }
  switch (newBtn) {
    case "colour":
      cBtn.classList.add("active");
      break;
    case "rainbow":
      rBtn.classList.add("active");
      break;
    case "eraser":
      eBtn.classList.add("active");
      break;
    case "shading":
      sBtn.classList.add("active");
      break;
  }
}

function setup(scale) {
  grid.style.gridTemplateColumns = `repeat(${scale}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${scale}, 1fr)`;
  let resolution = scale * scale;
  for (let i = 0; i < resolution; i++) {
    const replacement = document.createElement("div");
    replacement.classList.add("replace-element");
    replacement.style.backgroundColor = "#fff8dc"; // Set the background color
    replacement.addEventListener("mouseover", colChange);
    replacement.addEventListener("mousedown", colChange);
    grid.appendChild(replacement);
  }
}
function updateSize(scale) {
  numSize.innerHTML = `${scale} x ${scale}`;
}

function updateSetup() {
  grid.innerHTML = "";
  setup(curSize);
}

function deploySize(scale) {
  setCurSize(scale);
  updateSize(scale);
  updateSetup();
}

window.onload = function () {
  setup(16);
  activatedBtnListener("colour");
};
