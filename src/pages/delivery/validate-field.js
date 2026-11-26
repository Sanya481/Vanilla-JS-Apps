const markFieldInvalid = (field, message) => {
  const inputField = document.querySelector(`input[name="${field}"]`)
  if (!inputField) return
  const inputFormGroup = inputField.closest('.eco-form-group')
  if (!inputFormGroup) return

  inputFormGroup.classList.add('error')

  let inputHint = inputFormGroup.querySelector('.eco-input-hint')
  if (!inputHint) {
    inputHint = document.createElement('div')
    inputHint.className = 'eco-input-hint'
    inputFormGroup.appendChild(inputHint)
  }

  inputHint.textContent = message
  inputHint.classList.remove('visually-hidden')
}

const validateCustomFields = (dataFields) => {
  let isValid = true

  // Проверка названия
  const name = dataFields.itemName.trim()
  if (!name) {
    // Пустая строка
    markFieldInvalid('itemName', 'Название обязательно для заполнения')
    isValid = false
  } else if (name.length < 3) {
    // Слишком короткое
    markFieldInvalid('itemName', 'Минимум 3 символа')
    isValid = false
  } else if (/^\d+$/.test(name)) {
    // Только цифры
    markFieldInvalid('itemName', 'Название не может состоять только из цифр')
    isValid = false
  } else if (name.length > 25) {
    // проверка на максимальную длину
    markFieldInvalid('itemName', 'Максимум 25 символов')
    isValid = false
  } else if (/[^\w\sа-яА-ЯёЁ-]/.test(name)) {
    // Проверка на спецсимволы
    markFieldInvalid('itemName', 'Недопустимые символы')
    isValid = false
  }

  // Проверка расстояния
  const distanceStr = dataFields.itemDistance.trim()
  const distance = Number(distanceStr)
  if (!distanceStr) {
    markFieldInvalid('itemDistance', 'Укажите расстояние')
    isValid = false
  } else if (isNaN(distance)) {
    markFieldInvalid('itemDistance', 'Должно быть числом')
    isValid = false
  } else if (distance < 1) {
    markFieldInvalid('itemDistance', 'Минимум 1 км')
    isValid = false
  } else if (distance > 15) {
    markFieldInvalid('itemDistance', 'Максимум 15 км')
    isValid = false
  } else if (!/^\d+$/.test(distanceStr)) {
    markFieldInvalid('itemDistance', 'Только целые числа')
    isValid = false
  }

  // Проверка веса
  const weightStr = dataFields.itemWeight.trim()
  const weight = Number(weightStr)

  if (!weightStr) {
    // Пустая строка
    markFieldInvalid('itemWeight', 'Укажите вес')
    isValid = false
  } else if (isNaN(weight)) {
    // Не число
    markFieldInvalid('itemWeight', 'Должно быть числом')
    isValid = false
  } else if (weight < 0.1) {
    // Слишком маленькое
    markFieldInvalid('itemWeight', 'Минимум 0.1 кг')
    isValid = false
  } else if (weight > 20) {
    // Слишком большое
    markFieldInvalid('itemWeight', 'Максимум 20 кг')
    isValid = false
  } else if (!/^\d*\.?\d+$/.test(weightStr)) {
    // Проверка формата числа (допускает 0.1, но не "0..1")
    markFieldInvalid('itemWeight', 'Некорректный формат')
    isValid = false
  }

  if (isValid) {
    document.querySelectorAll('.eco-form-group').forEach((group) => {
      group.classList.remove('error')
    })
  }

  return isValid
}

export default validateCustomFields

/*
*Number(value) преобразует любые значения:
Number("123") → 123 (число)
Number("abc") → NaN (но тип будет 'number')
Number("") → 0 (может быть неочевидно)
Проверка isNaN() нужна, чтобы отличить реальные числа от некорректных значений

*isNaN() – это функция в JavaScript, которая определяет, является ли переданное значение "Not a Number" (не число). Она пытается преобразовать значение в число и возвращает true, если результат – NaN (не число), и false – если это корректное число.

*Когда isNaN(distance) вернёт true?
Ввод пользователя (dataFields.itemDistance)	Number() → distance	isNaN(distance)
"10" (корректное число)	10	false
"abc" (не число)	NaN	true
"" (пустая строка)	0	false
"10.5" (дробное число)	10.5	false
null	0	false
undefined	NaN	true

*Проблемы isNaN()
"" (пустая строка) → 0 → isNaN(0) → false (может быть неочевидно).
null → 0 → isNaN(0) → false (может быть неожиданно).
undefined → NaN → isNaN(NaN) → true.
*/
