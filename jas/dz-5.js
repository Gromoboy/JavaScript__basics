// 1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию.
//   Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки.
//   Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
function showGameBoard() {

  "use strict";

  /**
   * @property {HTMLElement} gameContainerEl Контейнер игры (DOM элемент).
   */
  const board = {
    gameContainerEl: document.getElementById('gameBoard'),
    width: 8,
    height:8,
    titleBox:1,
    figures: [
      {name: '♙', color: 'w', pos: 'a2'},
      {name: '♙', color: 'w', pos: 'b2'},
      {name: '♙', color: 'w', pos: 'c2'},
      {name: '♙', color: 'w', pos: 'd2'},
      {name: '♙', color: 'w', pos: 'e2'},
      {name: '♙', color: 'w', pos: 'f2'},
      {name: '♙', color: 'w', pos: 'g2'},
      {name: '♙', color: 'w', pos: 'h2'},
      {name: '♖', color: 'b', pos: 'a1'},
      {name: '♘', color: 'b', pos: 'b1'},
      {name: '♗', color: 'b', pos: 'c1'},
      {name: '♕', color: 'b', pos: 'd1'},
      {name: '♔', color: 'b', pos: 'e1'},
      {name: '♗', color: 'b', pos: 'f1'},
      {name: '♘', color: 'b', pos: 'g1'},
      {name: '♖', color: 'b', pos: 'h1'},
    ],

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

          let cellChar = String.fromCharCode(0o100 + j);
          let cellNum = this.height - i + 1;

          if (i === 0 && j > 0) {
            cell.innerText = cellChar;
          }
          if (j === 0 && i > 0) {
            cell.innerText = cellNum;
          }
          if (i > 0 && j > 0) {
            cell.setAttribute("data-cellNum", cellChar + cellNum );
          }
          if (this.isCellIsBlack(i, j)) {
            cell.classList.add("cellBlack");
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

}
