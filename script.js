'use strict';
const form = document.querySelector('.form')
const inputs = document.querySelectorAll('.input')
const checkbox = document.querySelectorAll('.checkbox')
const toReg = document.querySelector('#reg');
const heading = document.querySelector('.heading');
const submitButton = document.querySelector('.submit-button');

const emptyMessage = 'Заполните поле'
const invalidEmail = 'Email не валиден'
const invalidPass = 'Пароль должен быть минимум 8 символов'

const regexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

let user = { name: '', pass: ''}

let autorization = false;

// переключение формы
toReg.textContent = 'Зарегистрироваться'
toReg.addEventListener ('click', () => {
  autorization = !autorization;

  if (!autorization) {
    toReg.textContent = 'Авторизоваться'
    heading.textContent = 'Регистрация'
    submitButton.textContent = 'Регистрация'
  } 
  else {
    toReg.textContent = 'Зарегистрироваться'
    heading.textContent = 'Вход'
    submitButton.textContent = 'Вход'
  }
});

// проверка на пустой инпут 
const blurInput = (event) => {
  // console.log(event);
  if (event.target.value === '') {
    event.target.nextElementSibling.textContent = emptyMessage
  } else {
    event.target.nextElementSibling.textContent = ''
  }
}


// проверяет на валидность
const validationForm = (event) => {
  if (!regexp.test(user.name)) {
    event.srcElement[0].nextElementSibling.textContent = invalidEmail
    event.srcElement[0].classList.add('error-input')
    return false
  }

  if (user.pass.length < 8) {
    event.srcElement[1].nextElementSibling.textContent = invalidPass
    event.srcElement[1].classList.add('error-input')
    return false
  }

  if (!event.srcElement[2].checked) {
    event.srcElement[2].nextElementSibling.nextElementSibling.textContent = emptyMessage
    event.srcElement[2].classList.add('') 
    return false
  }
  return true
}

// функция очищает инпуты и объект user после отправки формы
const clearInput = (event) => {
  event.srcElement[0].value = ''
  event.srcElement[0].classList.remove('error-input')
  event.srcElement[1].value = ''
  event.srcElement[1].classList.remove('error-input')

  // делает значение чекбокса по умолчанию
  event.srcElement[2].checked = false

  // сбрасывает значение объекта user по умолчанию
  user = { name: '', pass: ''}
}

// функция отправки данных пользователя в localStorage
const sendUser = (obj) => {
  let usersArr = []

  if (localStorage.getItem("users") === null) {
    usersArr.push(obj)
    localStorage.setItem('users', JSON.stringify(usersArr))
  } else {
    usersArr = JSON.parse(localStorage.getItem("users"))
    usersArr.push(obj)
    localStorage.setItem('users', JSON.stringify(usersArr))
  }
}

// повесили обработчики событий на все инпуты
inputs.forEach(input => {
  input.addEventListener('blur', blurInput)
  input.addEventListener('input', (event) => {
    // console.log('event: ', event);
    if (event.target.id === 'email') {
      user.name = event.target.value
    } else if (event.target.id === 'password') {
      user.pass = event.target.value
    }
  })
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (validationForm(event)) {
    sendUser(user)
    clearInput(event)
  } else {
    return
  }
})