import showResultsPopup from './components/results-popup'
import { validateNameField, validateEmail } from './components/validate-field'
import { state, DOM } from './constants'
import './styles/main.scss'
import '@scss/main.scss'

if (document.querySelector('[data-game-survey]')) {
  const gameFieldRating = document.querySelector('[data-game-field-rating]')

  const surveyFormSection = document.querySelectorAll(
    '[data-survey-form-section]',
  )

  const totalSteps = surveyFormSection.length - 1

  /**
   * Обновление состояния прогресс бара и текста
   */
  function updateProgress() {
    state.progress = (state.currentStep / totalSteps) * 100
    DOM.surveyProgressBar.style.width = `${state.progress}%`
    DOM.surveyProgressText.textContent = `${state.progress}% завершено`
  }

  const handleInputChange = (evt) => {
    if (evt.target.dataset.validate === 'name') {
      validateNameField(evt.target)
    }

    if (evt.target.dataset.validate === 'email') {
      validateEmail(evt.target)
    }
  }

  // Шаг назад
  const prevStep = (step) => {
    state.currentStep--
    console.log('ШАг назад', state.currentStep)
    step.previousElementSibling.classList.add('survey-form__section--active')
    step.classList.remove('survey-form__section--active')

    updateProgress()
  }

  // Шаг вперёд
  const nextStep = (step) => {
    console.log('Current step before:', state.currentStep)

    if (step.querySelector('[data-validate="name"]')) {
      const nameField = step.querySelector('[data-validate="name"]')
      if (!validateNameField(nameField)) return
    }

    if (step.querySelector('[data-validate="email"]')) {
      const mailField = step.querySelector('[data-validate="email"]')
      if (!validateEmail(mailField)) return
    }

    state.currentStep++
    console.log('Current step after:', state.currentStep)
    step.classList.remove('survey-form__section--active')
    const nextSection = step.nextElementSibling
    if (nextSection) {
      nextSection.classList.add('survey-form__section--active')
    }

    updateProgress()
  }

  const onClickMove = (evt) => {
    const prevBtn = evt.target.closest('.survey-form__prev')
    const nextBtn = evt.target.closest('.survey-form__next')
    if (!prevBtn && !nextBtn) return

    const surveyFormSection = evt.target.closest('[data-survey-form-section]')
    if (!surveyFormSection) return

    if (nextBtn && state.currentStep < totalSteps) {
      nextStep(surveyFormSection)
    }

    if (prevBtn && state.currentStep > 0) {
      prevStep(surveyFormSection, prevBtn)
    }
  }

  const onChangeRange = (evt) => {
    DOM.levelValue.textContent = evt.target.value
  }

  const onSubmitForm = (evt) => {
    evt.preventDefault()
    // 1. Собираем данные
    const formData = new FormData(evt.target)

    // Удаляем старые значения (если были)
    // formData.delete('skills')

    const skills = formData.getAll('skills') // ['sport', 'music'] (если выбраны оба)

    // Преобразуем в объект (для проверки)
    const data = {
      ...Object.fromEntries(formData.entries()),
      skills: skills.length > 0 ? skills : null, // Добавляем массив вручную
    }

    console.log('data', data)

    // Далее можно отправить данные на сервер
    // или показать в попапе:
    showResultsPopup(data)
  }

  DOM.gameSurvey.addEventListener('click', onClickMove)
  DOM.gameSurvey.addEventListener('change', handleInputChange)
  gameFieldRating.addEventListener('input', onChangeRange)
  DOM.gameSurvey.addEventListener('submit', onSubmitForm)
}

/*
 * Событие change срабатывает после потери фокуса полем

*1. Зачем Object.fromEntries(formData.entries())?
FormData — это специальный объект, который не всегда удобен для работы в JavaScript (например, если нужно просто получить данные формы в виде обычного объекта).
Метод Object.fromEntries() преобразует список пар [ключ, значение] в обычный объект.

Пример:
Допустим, форма имеет поля:
username: "Alice"
age: "25"
skills: "sport" (выбран один checkbox)

После const formData = new FormData(evt.target):

formData содержит:
[ ["username", "Alice"], ["age", "25"], ["skills", "sport"] ]
После Object.fromEntries(formData.entries()):

{
  username: "Alice",
  age: "25",
  skills: "sport" // проблема: если выбрано несколько skills, будет только последний!
}

*Оператор расширения «разворачивает» свойства объекта или элементы массива в новом месте.
*Пример с массивом:
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5]; // [1, 2, 3, 4, 5]

*Пример с объектом:
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

*Почему в console.log(formData) выводятся методы?
Когда вы выводите FormData в консоль, браузер показывает не данные, а сам объект FormData с его методами (append, getAll и т.д.). Это происходит потому, что FormData — не обычный объект, а специальный класс для работы с формами.
*/
