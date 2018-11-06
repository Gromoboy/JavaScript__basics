// 1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию.
//   Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки.
//   Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
// function showGameBoard() {

  "use strict";

  /**
   * @property {HTMLElement} gameContainerEl Контейнер игры (DOM элемент).
   */
  const board = {
    gameContainerEl: document.getElementById('gameBoard'),
    width: 8,
    height:8,
    titleBox:1,
    /**
     * Метод отображения карты (игрового поля).
     */
    renderMap: function () {
      for (let i = 0; i < this.height + this.titleBox; i++) {
        let row = document.createElement("tr");
        let elRow = this.gameContainerEl.appendChild(row);
        for (let j = 0; j < this.width + this.titleBox; j++) {
          let cell = document.createElement("td");
          elRow.appendChild(cell);
          if (i === 0 && j > 0) {
            cell.innerText = String.fromCharCode(0o100 + j);
          }
          if (j === 0 && i > 0) {
            cell.innerText = this.height - i + 1;
          }
          if (this.isCellIsBlack(i, j)) {
            cell.style.background = "black";
          }
        }
      }
    },

    /**
     * Определяет является ли ячейка черной.
     * @param {int} rowNum Номер в строке.
     * @param {int} colNum Номер в колонке.
     * @returns {boolean} true, если ячейка должна быть черной, иначе false.
     */
    isCellIsBlack: function (rowNum, colNum) {
      return rowNum != 0 && colNum != 0 && (rowNum + colNum) % 2 === 1;
    },
  };

// Запускаем метод отображения карты.
  board.renderMap();

// }
