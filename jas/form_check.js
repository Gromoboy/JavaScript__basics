// Урок 5, задание 3:
//
// Создать форму в html со следующими полями:
//   * Имя - текстовое поле
// * Телефон - текстовое поле
// * Пароль - поле типа password
// * Повтор пароля - поле типа password
// * Кнопка отправить форму
//
// Необходимо реализовать валидацию этой формы по следующим правилам:
//
//   * Имя - должно содержать как минимум 1 символ, не более 50 символов.
// * Телефон - должно содержать 11 цифр, не больше, не меньше.
// * Пароль - минимум 5 символов, максимум 50.
// * Повтор пароля - значение должно совпадать с полем пароль.
// * Кнопка отправить форму - при нажатии на кнопку форма должна провериться, при прохождении проверки, форма
// отправляется, если проверка не была пройдена, то:
// - Каждое поле, которое не прошло проверку должно выделяться красным цветом.
// - Под каждым полем, что не прошло проверку, должна писаться подсказка по какой причине проверка провалилась.

  function checkForm(event) {
  "use strict";

  // debugger;
  if (!event.target.classList.contains("btn-primary")) return;
  const userName = document.getElementsByName("name").item(0);
  const userTel  = document.getElementsByName("phone").item(0);
  const userPass = document.getElementsByName("password").item(0);
  const userRepP = document.getElementsByName("password_repeat").item(0);
  if (userTel.value.length !== 11) {
    event.preventDefault();
    userTel.classList.add("is-invalid");
  } else {
    if( userTel.classList.contains("is-invalid")) {
      userTel.classList.remove("is-invalid");
    }
    userTel.classList.add("is-valid");
  }
  if (userName.value.length < 1 || userName.value.length > 50) {
    event.preventDefault();
    userName.classList.add("is-invalid");
  } else {
    if( userName.classList.contains("is-invalid")) {
      userName.classList.remove("is-invalid");
    }
    userName.classList.add("is-valid");
  }
  if (userPass.value.length < 5 || userPass.value.length > 50) {
    event.preventDefault();
    userPass.classList.add("is-invalid");
  } else {
    if( userPass.classList.contains("is-invalid")) {
      userPass.classList.remove("is-invalid");
    }
    userPass.classList.add("is-valid");
  }
  if (userRepP.value !== userPass.value) {
    event.preventDefault();
    userRepP.classList.add("is-invalid");
  } else {
    if( userRepP.classList.contains("is-invalid")) {
      userRepP.classList.remove("is-invalid");
    }
    userRepP.classList.add("is-valid");
  }
}