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
//   'use strict'
//
//   const ValidateFieldFuncs = {
//     checkLenght (field, args) {
//       const lenght = field.value.length;
//       const sign = args[0];
//       const req = args[1];
//
//       switch (sign) {
//         case '===':
//           return lenght === req ? null : `Поле должно содержать ${lenght} символов`;
//         case '>=':
//           return lenght >= req ? null : `Поле должно содержать больше ${lenght} символов`;
//         case '<=':
//           return lenght <= req ? null : `Поле должно содержать не более ${lenght}`;
//         default:
//           return null;
//       }
//     },
//     checkForDigits (field) {
//
//       for(let char of field.value) {
//         if (!Number.isInteger(+char)) {
//           return 'Поле должно содержать цифры'
//         }
//       }
//       return null;
//     },
//     checkEquality(field1, field2Selector) {
//       const field2 = document.querySelector(field2Selector);
//       return field1.value === field2.value ? null : `Поля не равны`;
//     }
//   };
//
// const rules = [
//   {
//     selector: 'input[name="name"]',
//     methods: [
//       {name: 'checkLenght', args: ['>=', 1]},
//       {name: 'checkLenght', args: ['<=', 50]}
//     ]
//   },
//   {
//     selector: 'input[name="phone"]',
//     methods: [
//       {name: "checkLenght", args: ['===', 11]},
//       {name: "checkForDigits"}
//     ]
//   },
//   {
//     selector: 'input[name="password"]',
//     methods: [
//       {name: "checkEquality", args: ['input[name="password_repeat"]']}
//     ]
//   }
// ];
//
// const FormChecker = {
//   submitForm(event) {
//     if (!event.target.classList.contains("btn-primary")) return;
//
//     if (!this.isValid()) {
//
//       event.preventDefault();
//     }
//   },
//   isValid() {
//     let result = true;
//
//     for (let rule of rules) {
//       let inputEl = document.querySelector(rule.selector);
//       for(let method of rule.methods) {
//         let errMsg = ValidateFieldFuncs[method.name](inputEl, method.args);
//         if (errMsg) {
//           result = false;
//           this.invalidateField(inputEl, errMsg);
//         } else {
//           this.setValidField(inputEl)
//         }
//       }
//     }
//     return result;
//   },
//   invalidateField(elem, errMsg) {
//     elem.classList.add("is-invalid");
//     elem.classList.remove("is-valid");
//     console.log(errMsg);
//   },
//   setValidField(elem) {
//     elem.classList.add("is-valid");
//     elem.classList.remove("is-invalid");
//   }
// };

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