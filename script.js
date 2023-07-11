const picked = document.getElementById("pickCol");

const cBtn = document.getElementById("colour");
const rBtn = document.getElementById("rainbow");
const eBtn = document.getElementById("erase");
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
  if (curBtn === "colour") {
    e.target.style.backgroundColor = curCol;
  } else if (curBtn === "rainbow") {
    const R = Math.floor(Math.random() * 255);
    const G = Math.floor(Math.random() * 255);
    const B = Math.floor(Math.random() * 255);
    e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
  } else if (curBtn === "eraser") {
    e.target.style.backgroundColor = "#f0f8ff";
  }
}

function activatedBtnListener(newBtn) {
  if (curBtn === "colour") {
    cBtn.classList.remove("active");
  } else if (curBtn === "rainbow") {
    rBtn.classList.remove("active");
  } else if (curBtn === "eraser") {
    eBtn.classList.remove("active");
  }
  if (newBtn === "colour") {
    cBtn.classList.add("active");
  } else if (newBtn === "rainbow") {
    rBtn.classList.add("active");
  } else if (newBtn === "eraser") {
    eBtn.classList.add("active");
  }
}

function setup(scale) {
  grid.style.gridTemplateColumns = `repeat(${scale}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${scale}, 1fr)`;
  let resolution = scale * scale;
  for (let i = 0; i < resolution; i++) {
    const replacement = document.createElement("div");
    replacement.classList.add("replace-element");
    replacement.style.backgroundColor = "#fff8dc"; // Set the background color to white
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
