import formatCardNumber from './utils'
import './styles/main.scss'
import '@scss/main.scss'

// цвета для корпораций
const corpColors = {
  arasaka: {
    primary: '#FF2A6D',
    secondary: '#00FF9D',
    qrStyle:
      'linear-gradient(45deg, #000 25%, #00FF9D 25%, #00FF9D 50%, #000 50%, #000 75%, #00FF9D 75%)',
  },
  militech: {
    primary: '#05D9FE',
    secondary: '#FFEE00',
    qrStyle:
      'repeating-linear-gradient(45deg, #05D9FE, #05D9FE 5px, #000 5px, #000 10px)',
  },
  kangtao: {
    primary: '#FF00FF',
    secondary: '#00FF9D',
    qrStyle: 'radial-gradient(circle, #FF00FF 0%, #000 50%, #FF00FF 100%)',
  },
}

if (document.querySelector('[data-cyber-card-app]')) {
  const cyberCardApp = document.querySelector('[data-cyber-card-app]')

  // Получаем элементы один раз
  const elements = {
    cyberForm: cyberCardApp.querySelector('[data-cyber-card-form]'),
    nameInput: cyberCardApp.querySelector('[data-cyber-card-name]'),
    nameDisplay: cyberCardApp.querySelector('[data-cyber-visual-name]'),
    numberInput: cyberCardApp.querySelector('[data-cyber-card-number]'),
    numberDisplay: cyberCardApp.querySelector('[data-cyber-visual-number]'),
    corpSelect: cyberCardApp.querySelector('[data-cyber-card-corp]'),
    corpDisplay: cyberCardApp.querySelector('[data-cyber-visual-corp]'),
    colorSelect: cyberCardApp.querySelector('[data-cyber-card-color]'),
    visualCard: cyberCardApp.querySelector('[data-cyber-visual-card]'),
    qrCode: cyberCardApp.querySelector('[data-cyber-card-qr-code]'),
    qrScanline: cyberCardApp.querySelector('[data-cyber-card-qr-scanline]'),
  }

  // Обработчики событий
  const handlers = {
    handleInput: (evt) => {
      const target = evt.target
      const value = evt.target.value?.trim()

      if (target === elements.nameInput) {
        elements.nameDisplay.textContent =
          value.toUpperCase() || elements.nameInput.placeholder
      } else if (target === elements.numberInput) {
        elements.numberDisplay.textContent =
          formatCardNumber(value) || elements.numberInput.placeholder
      }
    },

    handleChange: (evt) => {
      if (evt.target === elements.corpSelect) {
        const corp = evt.target.value
        elements.corpDisplay.textContent = corp.toUpperCase()

        // Устанавливаем уникальный стиль штрихкода для каждой корпорации
        elements.qrCode.style.background = corpColors[corp].qrStyle
        elements.qrCode.style.backgroundSize = '10px 10px'

        // Обновляем цвет сканера
        elements.qrScanline.style.background = corpColors[corp].secondary

        // Глитч-эффект
        elements.visualCard.style.animation = 'glitch 0.5s linear'
        setTimeout(() => (elements.visualCard.style.animation = ''), 500)
      } else if (evt.target === elements.colorSelect) {
        elements.visualCard.style.background = evt.target.value
      }
    },

    handleFocusBlur: (evt) => {
      const isFocus = evt.type === 'focus'
      const wrapper = evt.target.closest('[data-glitch]')

      if (wrapper) {
        wrapper.classList.toggle('cyber-input--focused', isFocus)
        elements.visualCard.classList.toggle('active-input', isFocus)
      }
    },
  }

  elements.cyberForm.addEventListener('input', handlers.handleInput)
  elements.cyberForm.addEventListener('change', handlers.handleChange)
  elements.cyberForm.addEventListener('focus', handlers.handleFocusBlur, true)
  elements.cyberForm.addEventListener('blur', handlers.handleFocusBlur, true)

  // // Имя
  // const handleInputName = (evt, el) => {
  //   const nameVisualCard = evt.target.value.trim()
  //   el.textContent = nameVisualCard

  //   if (cardInputFieldName.value === '') {
  //     el.textContent = cardInputFieldName.placeholder
  //   }
  // }

  // // Номер
  // const handleInputNumber = (evt, el) => {
  //   console.log(evt.target.value)
  //   const nameVisualCard = evt.target.value.trim()
  //   el.textContent = formatCardNumber(nameVisualCard)
  //   console.log(cardInputFieldNumber.placeholder)

  //   if (cardInputFieldNumber.value === '') {
  //     el.textContent = cardInputFieldNumber.placeholder
  //   }
  // }

  // // Корпорация
  // const handleChangeCorp = (evt) => {
  //   const corpVisualCard = evt.target.value
  //   cyberVisualCorp.textContent = corpVisualCard

  //   console.log(evt.target.value)
  // }

  // // Цвет
  // const handleChangeColor = (evt) => {
  //   const corpVisualCard = evt.target.value
  //   cyberVisualCard.style.background = corpVisualCard

  //   console.log(evt.target.value)
  // }

  // // Универсальная функция для управления классами
  // const toggleFocusClasses = (wrapper, card, isFocused) => {
  //   const wrapperField = wrapper.closest('[data-glitch]')
  //   wrapperField.classList.toggle('cyber-input--focused', isFocused)
  //   card.classList.toggle('active-input', isFocused)
  // }

  // // Имя
  // cardInputFieldName.addEventListener('input', (evt) =>
  //   handleInputName(evt, cardName),
  // )
  // cardInputFieldName.addEventListener(
  //   'focus',
  //   () => toggleFocusClasses(cardInputFieldName, cyberVisualCard, true),
  //   true,
  // )
  // cardInputFieldName.addEventListener(
  //   'blur',
  //   () => toggleFocusClasses(cardInputFieldName, cyberVisualCard, false),
  //   true,
  // )

  // // Номер
  // cardInputFieldNumber.addEventListener('input', (evt) =>
  //   handleInputNumber(evt, cardNumber),
  // )
  // cardInputFieldNumber.addEventListener('focus', () =>
  //   toggleFocusClasses(cardInputFieldNumber, cyberVisualCard, true),
  // )
  // cardInputFieldNumber.addEventListener('blur', () =>
  //   toggleFocusClasses(cardInputFieldNumber, cyberVisualCard, false),
  // )

  // // Корпорация
  // cyberCardCorp.addEventListener('change', handleChangeCorp)
  // cyberCardCorp.addEventListener('focus', () =>
  //   toggleFocusClasses(cyberCardCorp, cyberVisualCard, true),
  // )
  // cyberCardCorp.addEventListener('blur', () =>
  //   toggleFocusClasses(cyberCardCorp, cyberVisualCard, false),
  // )

  // // Цвет
  // cyberCardColor.addEventListener('change', handleChangeColor)
  // cyberCardColor.addEventListener('focus', () =>
  //   toggleFocusClasses(cyberCardColor, cyberVisualCard, true),
  // )
  // cyberCardColor.addEventListener('blur', () =>
  //   toggleFocusClasses(cyberCardColor, cyberVisualCard, false),
  // )
}
