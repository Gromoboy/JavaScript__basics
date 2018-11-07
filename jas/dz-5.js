// 1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию.
//   Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки.
//   Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.

// 2*. Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо можно использовать
// символы (существуют символы шахматных фигур) причем все фигуры должны стоять на своих местах и быть
// соответственно черными и белыми.
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
      {name: '♙', pos: 'A2'},
      {name: '♙', pos: 'B2'},
      {name: '♙', pos: 'C2'},
      {name: '♙', pos: 'D2'},
      {name: '♙', pos: 'E2'},
      {name: '♙', pos: 'F2'},
      {name: '♙', pos: 'G2'},
      {name: '♙', pos: 'H2'},
      {name: '♖', pos: 'A1'},
      {name: '♘', pos: 'B1'},
      {name: '♗', pos: 'C1'},
      {name: '♕', pos: 'D1'},
      {name: '♔', pos: 'E1'},
      {name: '♗', pos: 'F1'},
      {name: '♘', pos: 'G1'},
      {name: '♖', pos: 'H1'},
      {name: '♟', pos: 'A7'},
      {name: '♟', pos: 'B7'},
      {name: '♟', pos: 'C7'},
      {name: '♟', pos: 'D7'},
      {name: '♟', pos: 'E7'},
      {name: '♟', pos: 'F7'},
      {name: '♟', pos: 'G7'},
      {name: '♟', pos: 'H7'},
      {name: '♜', pos: 'A8'},
      {name: '♞', pos: 'B8'},
      {name: '♝', pos: 'C8'},
      {name: '♛', pos: 'D8'},
      {name: '♚', pos: 'E8'},
      {name: '♝', pos: 'F8'},
      {name: '♞', pos: 'G8'},
      {name: '♜', pos: 'H8'},
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
            cell.setAttribute("data-cell-num", cellChar + cellNum );
          }
          if (this.isCellIsBlack(i, j)) {
            cell.classList.add("cellBlack");
          }
        }
      }
    },
    renderFigures() {
      const cells = this.gameContainerEl.getElementsByTagName("td");
      // console.log(cells);
      for (let i = 1; i < cells.length; i++) {
        this.figures.forEach(fig => {
          if (fig.pos === cells[i].dataset.cellNum) {
            cells[i].innerText = fig.name;
          }
        });
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
  board.renderFigures();

}
