/**
 * @property {object} settings Настройки корзины товаров.
 * @property {{price: number, name: string}[]} goods Список товаров что купил пользователь.
 * @property {HTMLElement} basketCountEl Место для показа количества товаров.
 * @property {HTMLElement} basketPriceEl Место для показа цены всех товаров.
 */
const basket = {
  settings: {
    countSelector: '#basket-count',
    priceSelector: '#basket-price',
    catalogSelector: '.catalog',
  },
  goods: [],
  countEl: null,
  priceEl: null,

  /**
   * Инициализирует переменные для корзины и показывает эти значения.
   */
  init(settings = {}) {
    Object.assign(this.settings, settings);

    document.querySelector(this.settings.catalogSelector)
            .addEventListener('click', e => this.buyClickHandler(e));
    const basketEl = document.querySelector('.basket');
    const rowForTotal = document.createElement('tr');
    basketEl.appendChild(rowForTotal);
    let cell = document.createElement('td');
    cell.innerText = "Количество:";
    rowForTotal.appendChild(cell);
    this.countEl = document.createElement('td');
    this.countEl.id = this.settings.countSelector.substr(1);
    this.countEl.innerText = '0';
    rowForTotal.appendChild(this.countEl);
    cell = document.createElement('td');
    cell.innerText = "Общая сумма:";
    rowForTotal.appendChild(cell);
    this.priceEl = document.createElement('td');
    this.priceEl.id = this.settings.priceSelector.substr(1);
    this.priceEl.innerText = '0';
    rowForTotal.appendChild(this.priceEl);

  },
  buyClickHandler(event) {
    if (!event.target.classList.contains('buy-btn')) {
      return;
    }
    const productName = event.target.dataset.name;
    const productPrice = +event.target.dataset.price;
    this.add(productName, productPrice);
    console.log(this.goods);
  },

  /**
   * Отображает количество всех товаров и их цену.
   */
  render() {
    this.countEl.innerText = this.goods.length;
    this.priceEl.innerText = this.getGoodsPrice();
  },

  /**
   * Считает и возвращает цену всех купленных товаров из массива this.goods.
   * @returns {number} Цену всех купленных товаров.
   */
  getGoodsPrice() {
    let total = 0;
    for (let good of this.goods) {
     total += good.price;
    }
    return total;
  },

  /**
   * Добавляет купленный товар в массив купленных товаров и отображает количество и цену всех товаров.
   * @param goodName Название товара.
   * @param goodPrice Цена товара.
   */
  add(goodName, goodPrice) {
    const good = {name:goodName, price:goodPrice};
    this.goods.push(good);
    this.render();
  },
};
basket.init();
