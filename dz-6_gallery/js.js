"use strict";

/**
 * @property {Object} settings Объект с настройками галереи.
 * @property {string} settings.previewSelector Селектор обертки для миниатюр галереи.
 * @property {string} settings.openedImageWrapperClass Класс для обертки открытой картинки.
 * @property {string} settings.openedImageClass Класс открытой картинки.
 * @property {string} settings.openedImageScreenClass Класс для ширмы открытой картинки.
 * @property {string} settings.openedImageCloseBtnClass Класс для картинки кнопки закрыть.
 * @property {string} settings.openedImageCloseBtnSrc Путь до картинки кнопки открыть.
 */
const gallery = {
  settings: {
    previewSelector: '.mySuperGallery',
    openedImageWrapperClass: 'galleryWrapper',
    openedImageClass: 'galleryWrapper__image',
    selectedImageEl: null,
    openedImageScreenClass: 'galleryWrapper__screen',
    openedImageCloseBtnClass: 'galleryWrapper__close',
    openedImageCloseBtnSrc: 'images/gallery/close.png',
    openedImageLoadErrorSrc: 'images/gallery/error.png',
    openedImagePreviosBtnClass: 'galleryWrapper__previos',
    openedImagePreviosBtnSrc: 'images/gallery/left.svg',
    openedImageNextBtnClass: 'galleryWrapper__next',
    openedImageNextBtnSrc: 'images/gallery/right.svg'
  },

  /**
   * Инициализирует галерею, ставит обработчик события.
   * @param {Object} userSettings Объект настроек для галереи.
   */
  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settings, userSettings);

    // Находим элемент, где будут превью картинок и ставим обработчик на этот элемент,
    // при клике на этот элемент вызовем функцию containerClickHandler в нашем объекте
    // gallery и передадим туда событие MouseEvent, которое случилось.
    document
      .querySelector(this.settings.previewSelector)
      .addEventListener('click', event => this.containerClickHandler(event));
  },

  /**
   * Обработчик события клика для открытия картинки.
   * @param {MouseEvent} event Событие клики мышью.
   * @param {HTMLElement} event.target Целевой объект, куда был произведен клик.
   */
  containerClickHandler(event) {
    // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
    if (event.target.tagName !== 'IMG') {
      return;
    }

    this.selectedImageEl = event.target;
    // Открываем картинку с полученным из целевого тега (data-full_image_url аттрибут).
    this.openImage(this.selectedImageEl.dataset.full_image_url);
    console.log(event);
  },

  /**
   * Открывает картинку.
   * @param {string} src Ссылка на картинку, которую надо открыть.
   */
  openImage(src) {
    let fullImgEl = this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`);
    const testImg = new Image();
    testImg.onload = () => fullImgEl.src = src;
    testImg.onerror = () => fullImgEl.src = "images/gallery/error.png";
    testImg.src = src;
    // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.
    // this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = src;
  },

  /**
   * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
   * @returns {Element}
   */
  getScreenContainer() {
    // Получаем контейнер для открытой картинки.
    const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
    // Если контейнер для открытой картинки существует - возвращаем его.
    if (galleryWrapperElement) {
      return galleryWrapperElement;
    }

    // Возвращаем полученный из метода createScreenContainer контейнер.
    return this.createScreenContainer();
  },
  /**
   * Открывает соседнюю картинку в очереди
   * @param {number} num при отрицательном значении использует соседа слева, иначе справа
   */
  showNeighborFullImg(num = 1) {
    this.selectedImageEl = num < 0 ? this.getPrevImage() : this.getNextImage();
    this.openImage(this.selectedImageEl.dataset.full_image_url);
  },
  /**
   * Возвращает следующий элемент (картинку) от открытой или первую картинку в контейнере,
   * если текущая открытая картинка последняя.
   * @returns {Element} Следующую картинку от текущей открытой.
   */
  getNextImage() {
    // Получаем элемент справа от текущей открытой картинки.
    // Если элемент справа есть, его и возвращаем, если нет, то берем первый элемент в контейнере миниатюр.
    let nextImg = this.selectedImageEl.nextElementSibling;

    if (nextImg !== null) {
      return nextImg
    }

    return this.selectedImageEl.parentElement.firstElementChild;
  },

  /**
   * Возвращает предыдущий элемент (картинку) от открытой или последнюю картинку в контейнере,
   * если текущая открытая картинка первая.
   * @returns {Element} Предыдущую картинку от текущей открытой.
   */
  getPrevImage() {
    // Получаем элемент слева от текущей открытой картинки.
    // Если элемент слева есть, его и возвращаем, если нет, то берем последний элемент в контейнере миниатюр.
    let prevImg = this.selectedImageEl.previousElementSibling ;
    if (prevImg !== null) {
      return prevImg;
    }
    return this.selectedImageEl.parentElement.lastElementChild;
  },

  /**
   * Создает контейнер для открытой картинки.
   * @returns {HTMLElement}
   */
  createScreenContainer() {
    // Создаем сам контейнер-обертку и ставим ему класс.
    const galleryWrapperElement = document.createElement('div');
    galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

    // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
    const galleryScreenElement = document.createElement('div');
    galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
    galleryWrapperElement.appendChild(galleryScreenElement);

    // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
    const closeImageElement = new Image();
    closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
    closeImageElement.src = this.settings.openedImageCloseBtnSrc;
    closeImageElement.addEventListener('click', () => this.close());
    galleryWrapperElement.appendChild(closeImageElement);

    // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
    const image = new Image();
    // image.addEventListener("error", () => image.src = this.settings.openedImageLoadErrorSrc);
    image.classList.add(this.settings.openedImageClass);
    galleryWrapperElement.appendChild(image);

    // Создаем кнопку для прокрутки полных картинок назад
    const prevImgBtn = new Image();
    prevImgBtn.classList.add(this.settings.openedImagePreviosBtnClass);
    prevImgBtn.src = this.settings.openedImagePreviosBtnSrc;
    prevImgBtn.addEventListener('click', () => this.showNeighborFullImg(-1));
    galleryWrapperElement.appendChild(prevImgBtn);

    // Создаем кнопку для прокрутки полных картинок назад
    const nextImgBtn = new Image();
    nextImgBtn.classList.add(this.settings.openedImageNextBtnClass);
    nextImgBtn.src = this.settings.openedImageNextBtnSrc;
    nextImgBtn.addEventListener('click', () => this.showNeighborFullImg());
    galleryWrapperElement.appendChild(nextImgBtn);

    // Добавляем контейнер-обертку в тег body.
    document.body.appendChild(galleryWrapperElement);

    // Возвращаем добавленный в body элемент, наш контейнер-обертку.
    return galleryWrapperElement;
  },

  /**
   * Закрывает (удаляет) контейнер для открытой картинки.
   */
  close() {
    document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
  }
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});