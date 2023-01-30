width.addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d.,-]/g, "").replace(/[,-]/g, ".");
});

height.addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d.,-]/g, "").replace(/[,-]/g, ".");
});

line.addEventListener("keyup", function () {
  if (this.value > 5) {
    this.value = "";
  }
  if (this.value < 1) {
    this.value = "";
  }
  if (this.value % 1 !== 0) {
    this.value = "";
  }
});

let buttons = document.querySelector(".buttons");
buttons.addEventListener("click", (e) => {
  if (e.target.id && (width.value || height.value) <= 200000) {
    document.querySelector(".cost").style.display = "block";
    document.querySelector(".containerMain").style.display = "inline-flex";
    universal(e.target.id);
  } else {
    alert("No");
  }
});

function calculateRoom() {
  area = (width.value * height.value) / 1000000;
  document.querySelector(".calculated_area").textContent = `${
    area.toFixed(2) + " m²"
  }`;
  perimeter = (2 * (Number(width.value) + Number(height.value))) / 1000;
  document.querySelector(".calculated_perimeter").textContent = `${
    perimeter.toFixed(2) + " m"
  }`;
  totalBlocks = area / 0.36;
  document.querySelector(".total_blocks").textContent = `${
    totalBlocks.toFixed(2) + " шт "
  }`;
  document.querySelector(".oneBlock").textContent = "600mm x 600mm";
}

function parametrsClear(letter) {
  let testLittle = document.querySelector(`.testLittle${letter}`);
  testLittle.textContent = "";
  let razm = document.getElementById(`razm${letter}`);
  razm.textContent = "";
}

function smallBlockParametrs(smallWidth, smallHeight, letter) {
  let testLittle = document.querySelector(`.testLittle${letter}`);
  testLittle.textContent = "";
  let littleBlock = document.createElement("td");
  littleBlock.style.width = `${smallWidth + "px"}`;
  littleBlock.style.height = `${smallHeight + "px"}`;
  littleBlock.classList.add(`${letter}`);
  littleBlock.style.border = "black solid 1px";
  testLittle.append(littleBlock);
}

function universal(idTarget) {
  calculateRoom();
  document.querySelector(".roomDraw").innerHTML = "";
  parametrsClear("A");
  parametrsClear("B");
  parametrsClear("C");
  const LINEWIDTH = Number(line.value);
  const WIDTH = Math.ceil(width.value / (600 + LINEWIDTH)); // всего блоков по ширине
  const HEIGHT = Math.ceil(height.value / (600 + LINEWIDTH));
  const FULLBLOCKSWIDTH = Math.floor(width.value / (600 + LINEWIDTH)); //целые блоки по ширине
  const FULLBLOCKSHEIGHT = Math.floor(height.value / (600 + LINEWIDTH));

  let littleBlockHeight;
  let littleBlockWidth;
  Number(width.value - FULLBLOCKSWIDTH * (600 + LINEWIDTH)) / 10 == 0
    ? (littleBlockWidth = 60)
    : (littleBlockWidth =
        Number(width.value - FULLBLOCKSWIDTH * (600 + LINEWIDTH)) / 10);

  Number(height.value - FULLBLOCKSHEIGHT * (600 + LINEWIDTH)) / 10 == 0
    ? (littleBlockHeight = 60)
    : (littleBlockHeight =
        Number(height.value - FULLBLOCKSHEIGHT * (600 + LINEWIDTH)) / 10);
  let testDiv = document.querySelector(".roomDraw");
  let table = document.createElement("div");
  table.classList.add("table");
  testDiv.append(table);
  let compensWidth = WIDTH;
  let compensHeight = HEIGHT;
  if (idTarget == "centred") {
    littleBlockWidth == 60
      ? (compensWidth = WIDTH)
      : (compensWidth = WIDTH + 1);
    littleBlockHeight == 60
      ? (compensHeight = HEIGHT)
      : (compensHeight = HEIGHT + 1);
    console.log("rabotaet");
  }
  for (i = 0; i < compensHeight; i++) {
    let newTr = document.createElement("tr");
    if (idTarget == "calculate") {
      i == HEIGHT - 1
        ? (newTr.style.height = `${littleBlockHeight + "px"}`)
        : (newTr.style.height = "60px");
    } else if (idTarget == "centred") {
      i == 0 && littleBlockHeight / 2 > 0
        ? (newTr.style.height = `${littleBlockHeight / 2 + "px"}`)
        : (newTr.style.height = "30px");
      i == HEIGHT && littleBlockHeight / 2 > 0
        ? (newTr.style.height = `${littleBlockHeight / 2 + "px"}`)
        : (newTr.style.height = "30px");
      (i == 0 || i == HEIGHT) && littleBlockHeight < 60
        ? (newTr.style.height = `${littleBlockHeight / 2 + "px"}`)
        : (newTr.style.height = "60px");
    }
    newTr.className = "newTr";
    table.append(newTr);
    const smallBlockDraw = (className, littleWidth, littleHeight) => {
      let newTd = document.createElement("td");
      newTd.className = className;
      newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
      newTd.style.width = `${littleWidth + "px"}`;
      newTd.style.height = `${littleHeight + "px"}`;
      newTr.append(newTd);
    };
    for (n = 0; n < compensWidth; n++) {
      if (idTarget == "calculate") {
        if (
          i == HEIGHT - 1 &&
          n == WIDTH - 1 &&
          HEIGHT - 1 !== 0 &&
          WIDTH - 1 !== 0 &&
          littleBlockWidth < 60 &&
          littleBlockHeight < 60
        ) {
          smallBlockDraw("A", littleBlockWidth, littleBlockHeight);
          smallBlockParametrs(littleBlockWidth, littleBlockHeight, "A");
          razmA.textContent = "";
          razmA.textContent = `${
            littleBlockHeight * 10 + " mm x " + littleBlockWidth * 10 + " mm"
          }`;
        } else if (n == WIDTH - 1 && WIDTH - 1 !== 0 && littleBlockWidth < 60) {
          smallBlockDraw("B", littleBlockWidth, null);
          smallBlockParametrs(littleBlockWidth, 60, "B");
          razmB.textContent = "";
          razmB.textContent = `${"600 mm x " + littleBlockWidth * 10 + " mm"}`;
        } else if (
          i == HEIGHT - 1 &&
          HEIGHT - 1 !== 0 &&
          littleBlockHeight < 60
        ) {
          smallBlockDraw("C", null, littleBlockHeight);
          smallBlockParametrs(60, littleBlockHeight, "C");
          razmC.textContent = "";
          razmC.textContent = `${littleBlockHeight * 10 + " mm x 600 mm"}`;
        } else {
          let newTd = document.createElement("td");
          newTd.className = "newTd";
          newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
          newTr.append(newTd);
        }
      } else {
        if (
          (n == 0 || n == WIDTH) &&
          littleBlockWidth < 60 &&
          (i == 0 || i == HEIGHT) &&
          littleBlockHeight < 60
        ) {
          smallBlockDraw("A", littleBlockWidth / 2, littleBlockHeight / 2);
          smallBlockParametrs(littleBlockWidth / 2, littleBlockHeight / 2, "A");
          razmA.textContent = "";
          razmA.textContent = `${
            (littleBlockHeight / 2) * 10 +
            " mm x " +
            (littleBlockWidth / 2) * 10 +
            " mm"
          }`;
        } else if ((n == 0 || n == WIDTH) && littleBlockWidth < 60) {
          smallBlockDraw("B", littleBlockWidth / 2, null);
          smallBlockParametrs(littleBlockWidth / 2, 60, "B");
          razmB.textContent = "";
          razmB.textContent = `${
            "600 mm x " + (littleBlockWidth / 2) * 10 + " mm"
          }`;
        } else if ((i == 0 || i == HEIGHT) && littleBlockHeight < 60) {
          smallBlockDraw("C", null, littleBlockHeight / 2);
          smallBlockParametrs(60, littleBlockHeight / 2, "C");
          razmC.textContent = "";
          razmC.textContent = `${
            (littleBlockHeight / 2) * 10 + " mm x 600 mm"
          }`;
        } else {
          let newTd = document.createElement("td");
          newTd.className = "newTd";
          newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
          newTr.append(newTd);
        }
      }
    }
  }
}
// В канвас версии 367 строк
let dateHTML = (document.querySelector(
  ".reserved"
).innerHTML = `© Sergey Pankov. ${new Date().getFullYear()} All rigths reserved `);
