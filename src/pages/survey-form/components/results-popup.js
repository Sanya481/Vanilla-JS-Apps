import { state, DOM } from '../constants'

const resultsPopup = document.querySelector('[data-results-popup]')
const resultsPopupContent = document.querySelector(
  '[data-results-popup-content]',
)

// Сброс дополнительных полей, не очищаемых через .reset()
const resetCustomFields = () => {
  // Обновляем прогресс
  DOM.surveyProgressText.textContent = '0% завершено'
  DOM.surveyProgressBar.style.width = '0%'
  DOM.levelValue.textContent = '5'

  const stepFields = DOM.gameSurvey.querySelectorAll(
    '[data-survey-form-section]',
  ) // Получаем NodeList

  // Сбрасываем активные классы
  stepFields.forEach((field) => {
    field.classList.remove('survey-form__section--active')
  })
  // Активируем первый шаг
  stepFields[0].classList.add('survey-form__section--active')

  state.currentStep = 0
  state.progress = 0
}

const onClosePopup = (evt) => {
  const isBtnClose = evt.target.closest('[data-results-popup-close]')
  const isClickOutside = !resultsPopupContent.contains(evt.target)

  if (isBtnClose || isClickOutside) {
    resultsPopup.hidden = true
    resultsPopup.classList.remove('results-popup--show')

    // Сбрасываем форму
    DOM.gameSurvey.reset() // Очищаем все поля
    resetCustomFields()

    document.removeEventListener('click', onClosePopup)
  }
}

const showResultsPopup = ({
  name,
  email,
  rating,
  skills,
  comments,
  character,
}) => {
  resultsPopup.hidden = false
  resultsPopup.classList.add('results-popup--show')

  resultsPopup.querySelector('[data-result-name]').textContent = name
  resultsPopup.querySelector('[data-result-email]').textContent = email
  resultsPopup.querySelector('[data-result-level]').textContent = rating
  resultsPopup.querySelector('[data-result-character]').textContent = character
  resultsPopup.querySelector('[data-result-comments]').textContent =
    comments.trim() !== '' ? comments : 'Без комментариев'

  resultsPopup.querySelector('[data-result-skills]').textContent =
    skills?.join(', ') ?? 'Навыки не указаны'

  document.addEventListener('click', onClosePopup)
}

export default showResultsPopup
