import { addCloudPopupStyles, giftArr } from './utils'
import './styles.module.scss'

// Функция для получения случайного числа в диапазоне
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Функция для получения случайного подарка
function getRandomGift() {
  const randomIndex = getRandomInt(0, giftArr.length - 1)
  return giftArr[randomIndex]
}

const createGiftPopup = (gift) => {
  console.log(gift)
  return `
           <div class="cloudPopup" role="dialog" aria-labelledby="popupTitle" aria-modal="true">
      <div class="cloudPopup__content">
        <div class="cloudPopup__cloud">
          <div class="cloudPopup__cloud-body">
            <div class="cloudPopup__icon">${gift.icon}</div>
            <h2 class="cloudPopup__title" id="popupTitle">${gift.title}</h2>
            <p class="cloudPopup__text">${gift.description}</p>
            <button class="cloudPopup__button" data-close-btn>Забрать подарок!</button>
          </div>
          <div class="cloudPopup__cloud-tail"></div>
        </div>
        <button class="cloudPopup__close" data-close-btn aria-label="Закрыть">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  `
}

const showGiftPopup = () => createGiftPopup(getRandomGift())

if (document.querySelector('[data-gift-popup-container]')) {
  const giftPopupContainer = document.querySelector(
    '[data-gift-popup-container',
  )

  document.addEventListener('DOMContentLoaded', () => {
    addCloudPopupStyles()
    setTimeout(() => {
      giftPopupContainer.innerHTML = showGiftPopup()

      setTimeout(() => {
        const popup = document.querySelector('.cloudPopup')
        if (popup) {
          popup.classList.add('cloudPopupActive')
        }
      }, 100)

      const closeButtons =
        giftPopupContainer.querySelectorAll('[data-close-btn]')
      const closePopup = () => {
        const popup = giftPopupContainer.querySelector('.cloudPopup')
        if (popup) {
          popup.classList.remove('cloudPopupActive')
          popup.classList.add('cloudPopupClosing')

          // Удаляем попап после анимации
          setTimeout(() => {
            giftPopupContainer.innerHTML = ''
          }, 1200)
        }
      }

      closeButtons.forEach((btn) => {
        btn.addEventListener('click', closePopup)
      })
    }, 3000)
  })
}
