calculate.addEventListener("click", () => {
  document.querySelector(".roomDraw").innerHTML = "";
  parametrsClear("A");
  parametrsClear("B");
  parametrsClear("C");
  cssDraw();
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

function cssDraw() {
  calculateRoom();
  const LINEWIDTH = Number(line.value);
  const WIDTH = Math.ceil(width.value / (600 + LINEWIDTH)); // всего блоков по ширине
  const HEIGHT = Math.ceil(height.value / (600 + LINEWIDTH));
  const FULLBLOCKSWIDTH = Math.floor(width.value / (600 + LINEWIDTH)); //целые блоки по ширине
  const FULLBLOCKSHEIGHT = Math.floor(height.value / (600 + LINEWIDTH));

  let bottomBlocksHeight;
  let rightBlocksWidth;

  Number(width.value - FULLBLOCKSWIDTH * (600 + LINEWIDTH)) / 10 == 0
    ? (rightBlocksWidth = 60)
    : (rightBlocksWidth =
        Number(width.value - FULLBLOCKSWIDTH * (600 + LINEWIDTH)) / 10);

  Number(height.value - FULLBLOCKSHEIGHT * (600 + LINEWIDTH)) / 10 == 0
    ? (bottomBlocksHeight = 60)
    : (bottomBlocksHeight =
        Number(height.value - FULLBLOCKSHEIGHT * (600 + LINEWIDTH)) / 10);

  let testDiv = document.querySelector(".roomDraw");
  let table = document.createElement("div");
  table.classList.add("table");
  testDiv.append(table);

  for (i = 0; i < HEIGHT; i++) {
    let newTr = document.createElement("tr");
    i == HEIGHT - 1
      ? (newTr.style.height = `${bottomBlocksHeight + "px"}`)
      : (newTr.style.height = "60px");
    newTr.className = "newTr";
    table.append(newTr);

    for (n = 0; n < WIDTH; n++) {
      if (
        i == HEIGHT - 1 &&
        n == WIDTH - 1 &&
        HEIGHT - 1 !== 0 &&
        WIDTH - 1 !== 0 &&
        rightBlocksWidth < 60 &&
        bottomBlocksHeight < 60
      ) {
        let newTd = document.createElement("td");
        newTd.className = "A";

        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTd.style.width = `${rightBlocksWidth + "px"}`;
        newTd.style.height = `${bottomBlocksHeight + "px"}`;
        newTr.append(newTd);
        smallBlockParametrs(rightBlocksWidth, bottomBlocksHeight, "A");
        razmA.textContent = "";
        razmA.textContent = `${
          bottomBlocksHeight * 10 + " mm x " + rightBlocksWidth * 10 + " mm"
        }`;
        console.log("TEST");
      } else if (n == WIDTH - 1 && WIDTH - 1 !== 0 && rightBlocksWidth < 60) {
        let newTd = document.createElement("td");
        newTd.className = "B";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTd.style.width = `${rightBlocksWidth + "px"}`;
        newTr.append(newTd);
        smallBlockParametrs(rightBlocksWidth, 60, "B");
        razmB.textContent = "";
        razmB.textContent = `${"600 mm x " + rightBlocksWidth * 10 + " mm"}`;
      } else if (
        i == HEIGHT - 1 &&
        HEIGHT - 1 !== 0 &&
        bottomBlocksHeight < 60
      ) {
        let newTd = document.createElement("td");
        newTd.className = "C";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTd.style.height = `${bottomBlocksHeight + "px"}`;
        newTr.append(newTd);
        smallBlockParametrs(60, bottomBlocksHeight, "C");
        razmC.textContent = "";
        razmC.textContent = `${bottomBlocksHeight * 10 + " mm x 600 mm"}`;
      } else {
        let newTd = document.createElement("td");
        newTd.className = "newTd";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTr.append(newTd);
      }
    }
  }
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

centred.addEventListener("click", () => {
  document.querySelector(".roomDraw").innerHTML = "";
  parametrsClear("A");
  parametrsClear("B");
  parametrsClear("C");
  cssDrawCentred();
});

function cssDrawCentred() {
  calculateRoom();
  const LINEWIDTH = Number(line.value);
  const WIDTH = Math.ceil(width.value / (600 + LINEWIDTH)); // всего блоков по ширине
  const HEIGHT = Math.ceil(height.value / (600 + LINEWIDTH));
  const FULLBLOCKSWIDTH = Math.floor(width.value / (600 + LINEWIDTH)); //целые блоки по ширине
  const FULLBLOCKSHEIGHT = Math.floor(height.value / (600 + LINEWIDTH));

  console.log(WIDTH + " Vsego po shirine");
  let bottomBlocksHeight;
  let rightBlocksWidth;

  Number(width.value - FULLBLOCKSWIDTH * (600 + LINEWIDTH)) / 10 == 0 // проверка на размер блока == 0px
    ? (rightBlocksWidth = 60)
    : (rightBlocksWidth =
        Number(width.value - FULLBLOCKSWIDTH * (600 + LINEWIDTH) - LINEWIDTH) /
        10);

  Number(height.value - FULLBLOCKSHEIGHT * (600 + LINEWIDTH)) / 10 == 0
    ? (bottomBlocksHeight = 60)
    : (bottomBlocksHeight =
        Number(
          height.value - FULLBLOCKSHEIGHT * (600 + LINEWIDTH) - LINEWIDTH
        ) / 10);

  let testDiv = document.querySelector(".roomDraw");
  let table = document.createElement("div");
  table.classList.add("table");
  testDiv.append(table);

  let shir = WIDTH;
  let vist = HEIGHT;

  rightBlocksWidth == 60 ? (shir = WIDTH) : (shir = WIDTH + 1);
  bottomBlocksHeight == 60 ? (vist = HEIGHT) : (vist = HEIGHT + 1);

  for (i = 0; i < vist; i++) {
    let newTr = document.createElement("tr");

    i == 0 && bottomBlocksHeight / 2 > 0
      ? (newTr.style.height = `${bottomBlocksHeight / 2 + "px"}`)
      : (newTr.style.height = "30px");
    i == HEIGHT && bottomBlocksHeight / 2 > 0
      ? (newTr.style.height = `${bottomBlocksHeight / 2 + "px"}`)
      : (newTr.style.height = "30px");

    (i == 0 || i == HEIGHT) && bottomBlocksHeight < 60
      ? (newTr.style.height = `${bottomBlocksHeight / 2 + "px"}`)
      : (newTr.style.height = "60px");

    newTr.className = "newTr";
    table.append(newTr);

    for (n = 0; n < shir; n++) {
      if (
        (n == 0 || n == WIDTH) &&
        rightBlocksWidth < 60 &&
        (i == 0 || i == HEIGHT) &&
        bottomBlocksHeight < 60
      ) {
        let newTd = document.createElement("td");
        newTd.className = "A";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTd.style.width = `${rightBlocksWidth / 2 + "px"}`;
        newTd.style.height = `${bottomBlocksHeight / 2 + "px"}`;
        newTr.append(newTd);
        smallBlockParametrs(rightBlocksWidth / 2, bottomBlocksHeight / 2, "A");
        razmA.textContent = "";
        razmA.textContent = `${
          (bottomBlocksHeight / 2) * 10 +
          " mm x " +
          (rightBlocksWidth / 2) * 10 +
          " mm"
        }`;
      } else if ((n == 0 || n == WIDTH) && rightBlocksWidth < 60) {
        let newTd = document.createElement("td");
        newTd.className = "B";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTd.style.width = `${rightBlocksWidth / 2 + "px"}`;
        newTr.append(newTd);
        smallBlockParametrs(rightBlocksWidth / 2, 60, "B");
        razmB.textContent = "";
        razmB.textContent = `${
          "600 mm x " + (rightBlocksWidth / 2) * 10 + " mm"
        }`;
      } else if ((i == 0 || i == HEIGHT) && bottomBlocksHeight < 60) {
        let newTd = document.createElement("td");
        newTd.className = "C";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTd.style.height = `${bottomBlocksHeight / 2 + "px"}`;
        newTr.append(newTd);
        smallBlockParametrs(60, bottomBlocksHeight / 2, "C");
        razmC.textContent = "";
        razmC.textContent = `${(bottomBlocksHeight / 2) * 10 + " mm x 600 mm"}`;
      } else {
        let newTd = document.createElement("td");
        newTd.className = "newTd";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTr.append(newTd);
      }
    }
  }
}
