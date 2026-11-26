const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function showError(field, message) {
  let errorMsg = field.parentElement.querySelector('.error-message')

  if (!errorMsg) {
    errorMsg = document.createElement('div')
    errorMsg.classList.add('error-message')
    field.parentElement.append(errorMsg)
  }
  errorMsg.textContent = message
  field.classList.add('invalid')
  return false
}

function hideErrorField(field) {
  let errorMsg = field.parentElement.querySelector('.error-message')
  if (errorMsg) errorMsg.remove()
  field.classList.remove('invalid')
  return true
}

// Валидация имени
export function validateNameField(field) {
  const value = field.value.trim()
  const isValid = value.length >= 2

  // Если поле невалидно
  if (!value) return showError(field, 'Имя обязательно')
  if (!isValid)
    return showError(field, 'Имя должно содержать минимум 2 символа')

  return hideErrorField(field)
}

// Валидация Email
export function validateEmail(field) {
  const value = field.value.trim()
  const emailRegex = EMAIL_REGEX
  const isValid = emailRegex.test(value)
  const errorMsg = field.parentElement.querySelector('.error-message')

  if (!isValid) {
    errorMsg.hidden = false
    field.classList.add('invalid')
  } else {
    errorMsg.hidden = true
    field.classList.remove('invalid')
  }

  // Блокируем/разблокируем кнопку "Далее"
  const nextButton = field
    .closest('[data-survey-form-section]')
    .querySelector('.survey-form__next')
  nextButton.disabled = !isValid

  console.log('Email validation:', isValid)
  return isValid
}
