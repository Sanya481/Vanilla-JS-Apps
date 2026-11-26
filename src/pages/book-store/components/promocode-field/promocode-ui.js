// // Отображение и обработка событий
// import { promocodeArr } from './promocode-data'
// import { setCookie, getCookie, removeCookie } from './promocode-cookie'
// import { store } from '../store'

// export const resetPromocodeState = (options = {}) => {
//   const { resetInput = true, resetStyles = true, resetPrices = true } = options
//   const cartStore = document.querySelector('[data-cart]')
//   const promocodeBtn = cartStore.querySelector('[data-promocode-btn]')
//   const promocodeBlock = cartStore.querySelector('[data-promocode-block]')
//   const cartTotalPrice = cartStore.querySelector('[data-cart-total-price]')
//   const finalPrice = cartTotalPrice.querySelector('[data-final-price]')
//   const discountBadge = cartTotalPrice.querySelector('[data-discount-badge]')
//   const originalPrice = cartTotalPrice.querySelector('[data-original-price]')
//   const promocodeMessage = cartStore.querySelector('[data-promocode-message]')
//   const promocodeInput = cartStore.querySelector('[data-promocode-input]')

//   if (!promocodeInput || !promocodeBtn) return

//   if (resetInput) {
//     promocodeInput.disabled = true
//     promocodeBtn.disabled = true
//     promocodeInput.value = ''
//   }

//   if (resetStyles && promocodeBlock && promocodeMessage) {
//     promocodeBlock.classList.remove(
//       'promocode-field--success',
//       'promocode-field--error',
//     )
//     promocodeMessage.dataset.status = ''
//     promocodeMessage.hidden = true
//   }

//   if (resetPrices && originalPrice && discountBadge) {
//     discountBadge.classList.remove('isShow')
//     originalPrice.classList.remove('isChange')
//     discountBadge.hidden = true
//     discountBadge.textContent = ''
//     finalPrice.textContent = ''
//   }
// }

// export const applySavedPromocode = () => {
//   if (!document.cookie || store.cart.isEmpty) return

//   const cookie = getCookie()

//   if (cookie.promocode) {
//     const foundPromocode = promocodeArr.find(
//       (item) => item.promocode === cookie.promocode,
//     )
//     if (foundPromocode) {
//       // Применяем визуально
//       promocodeInput.value = foundPromocode.promocode
//       showSuccessMessage(foundPromocode.gift)

//       if (foundPromocode.discount) {
//         applyDiscount(foundPromocode.discount)
//       }

//       // Блокируем поле ввода
//       promocodeInput.disabled = true
//       promocodeBtn.disabled = true
//     } else {
//       removeCookie('promocode')
//     }
//   }
// }

// /**
//  * Функция для проверки промокода
//  */
// const validatePromocode = (code, promocodesArr) => {
//   const trimmedCode = code.trim()
//   return promocodesArr.find((el) => el.promocode === trimmedCode)
// }

// if (document.querySelector('[data-book-store]')) {
//   const cartStore = document.querySelector('[data-cart]')
//   const promocodeBtn = cartStore.querySelector('[data-promocode-btn]')

//   const promocodeBlock = cartStore.querySelector('[data-promocode-block]')

//   const cartTotalPrice = cartStore.querySelector('[data-cart-total-price]')
//   const originalPrice = cartTotalPrice.querySelector('[data-original-price]')
//   const finalPrice = cartTotalPrice.querySelector('[data-final-price]')
//   const discountBadge = cartTotalPrice.querySelector('[data-discount-badge]')

//   const promocodeInput = cartStore.querySelector('[data-promocode-input]')
//   const promocodeMessage = cartStore.querySelector('[data-promocode-message]')

//   const createMessage = (message, gift = '') => {
//     promocodeMessage.innerHTML = ''

//     const spanEl = document.createElement('span')
//     spanEl.textContent = `${message} ${gift}`
//     promocodeMessage.hidden = false
//     promocodeMessage.appendChild(spanEl)
//   }

//   const showSuccessMessage = (giftText) => {
//     // Сначала очищаем ВСЕ статусные классы
//     promocodeBlock.classList.remove(
//       'promocode-field--success',
//       'promocode-field--error',
//     )

//     resetPromocodeState({
//       resetInput: false,
//       resetStyles: false,
//       resetPrices: true,
//     })

//     createMessage('Промокод применён', giftText)

//     promocodeMessage.dataset.status = 'success'
//     promocodeBlock.classList.add('promocode-field--success')
//   }

//   const showErrorMessage = (errorText) => {
//     // Сначала очищаем ВСЕ статусные классы
//     promocodeBlock.classList.remove(
//       'promocode-field--success',
//       'promocode-field--error',
//     )

//     createMessage(errorText)

//     promocodeMessage.dataset.status = 'error'
//     promocodeBlock.classList.add('promocode-field--error')
//   }

//   const applyDiscount = (discount) => {
//     if (!originalPrice.textContent) {
//       originalPrice.textContent = cartTotalPrice.textContent
//     }

//     // Берём оригинальную цену из спана
//     const cartTotal = +originalPrice.textContent
//     const totalDiscount = cartTotal - (cartTotal * discount) / 100

//     // Показываем итоговую цену
//     finalPrice.textContent = totalDiscount.toFixed(2)
//     discountBadge.textContent = `${discount}%`
//     discountBadge.classList.add('isShow')
//     originalPrice.classList.add('isChange')
//     discountBadge.hidden = false
//   }

//   const handlePromocodeCheck = (evt) => {
//     if (evt.currentTarget !== promocodeBtn || store.cart.isEmpty) return

//     const inputValue = promocodeInput.value
//     const foundPromocode = validatePromocode(inputValue, promocodeArr)

//     if (foundPromocode) {
//       setCookie('promocode', foundPromocode.promocode, 30)
//       showSuccessMessage(foundPromocode.gift)

//       if (foundPromocode.discount) {
//         applyDiscount(foundPromocode.discount)
//       }

//       // promocodeInput.disabled = true
//       // promocodeBtn.disabled = true
//     } else {
//       showErrorMessage('Такого промокода не существует')
//     }
//   }

//   const initPromocode = () => {
//     if (promocodeBtn) {
//       promocodeBtn.addEventListener('click', handlePromocodeCheck)
//     }
//   }

//   initPromocode()
// }
// // PROM10

// // export default applySavedPromocode
