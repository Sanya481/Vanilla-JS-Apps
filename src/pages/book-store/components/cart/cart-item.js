import { promocodeArr } from '../promocode-field/promocode-data.js'
import {
  setCookie,
  removeCookie,
  getCookie,
} from '../promocode-field/promocode-cookie.js'
import { store } from '../../store.js'

const cartContent = document.querySelector('[data-cart-content]')
const cartStore = document.querySelector('[data-cart]')
const cartCheckoutBtn = document.querySelector('[data-cart-checkout-btn]')
const cartTotalPrice = document.querySelector('[data-cart-total-price]')

// Переменные для промокодов (объявляем здесь, чтобы были доступны в экспортируемых функциях)
let originalPrice,
  finalPrice,
  discountBadge,
  promocodeBtn,
  promocodeBlock,
  promocodeInput,
  promocodeMessage

// Проверяем что корзина существует на странице
if (cartStore) {
  // ===== ПЕРЕМЕННЫЕ ДЛЯ ПРОМОКОДОВ =====
  originalPrice = cartTotalPrice?.querySelector('[data-original-price]')
  finalPrice = cartTotalPrice?.querySelector('[data-final-price]')
  discountBadge = cartTotalPrice?.querySelector('[data-discount-badge]')
  promocodeBtn = cartStore.querySelector('[data-promocode-btn]')
  promocodeBlock = cartStore.querySelector('[data-promocode-block]')
  promocodeInput = cartStore.querySelector('[data-promocode-input]')
  promocodeMessage = cartStore.querySelector('[data-promocode-message]')

  // ===== ФУНКЦИИ ДЛЯ ПРОМОКОДОВ =====
  const resetPromocodeState = (options = {}) => {
    const {
      resetInput = true,
      resetStyles = true,
      resetPrices = true,
    } = options

    if (!promocodeInput || !promocodeBtn) return

    if (resetInput) {
      promocodeInput.disabled = true
      promocodeBtn.disabled = true
      promocodeInput.value = ''
    }

    if (resetStyles && promocodeBlock && promocodeMessage) {
      promocodeBlock.classList.remove(
        'promocode-field--success',
        'promocode-field--error',
      )
      promocodeMessage.dataset.status = ''
      promocodeMessage.hidden = true
    }

    if (resetPrices && originalPrice && discountBadge) {
      discountBadge.classList.remove('isShow')
      originalPrice.classList.remove('isChange')
      discountBadge.hidden = true
      discountBadge.textContent = ''
      if (finalPrice) finalPrice.textContent = ''
    }
  }

  const validatePromocode = (code, promocodesArr) => {
    const trimmedCode = code.trim()
    return promocodesArr.find((el) => el.promocode === trimmedCode)
  }

  const createMessage = (message, gift = '') => {
    if (!promocodeMessage) return

    promocodeMessage.innerHTML = ''
    const spanEl = document.createElement('span')
    spanEl.textContent = `${message} ${gift}`
    promocodeMessage.hidden = false
    promocodeMessage.appendChild(spanEl)
  }

  const showSuccessMessage = (giftText) => {
    if (!promocodeBlock || !promocodeMessage) return

    promocodeBlock.classList.remove(
      'promocode-field--success',
      'promocode-field--error',
    )

    resetPromocodeState({
      resetInput: false,
      resetStyles: false,
      resetPrices: true,
    })

    createMessage('Промокод применён', giftText)
    promocodeMessage.dataset.status = 'success'
    promocodeBlock.classList.add('promocode-field--success')
  }

  const showErrorMessage = (errorText) => {
    if (!promocodeBlock || !promocodeMessage) return

    promocodeBlock.classList.remove(
      'promocode-field--success',
      'promocode-field--error',
    )

    createMessage(errorText)
    promocodeMessage.dataset.status = 'error'
    promocodeBlock.classList.add('promocode-field--error')
  }

  const applyDiscount = (discount) => {
    if (!originalPrice || !finalPrice || !discountBadge) return

    if (!originalPrice.textContent) {
      originalPrice.textContent = cartTotalPrice.textContent
    }

    const cartTotal = +originalPrice.textContent
    const totalDiscount = cartTotal - (cartTotal * discount) / 100

    finalPrice.textContent = totalDiscount.toFixed(2)
    discountBadge.textContent = `${discount}%`
    discountBadge.classList.add('isShow')
    originalPrice.classList.add('isChange')
    discountBadge.hidden = false
  }

  const applySavedPromocode = () => {
    if (!document.cookie || store.cart.isEmpty) return
    if (!promocodeInput || !promocodeBtn) return

    const cookie = getCookie()
    if (cookie.promocode) {
      const foundPromocode = promocodeArr.find(
        (item) => item.promocode === cookie.promocode,
      )
      if (foundPromocode) {
        promocodeInput.value = foundPromocode.promocode
        showSuccessMessage(foundPromocode.gift)

        if (foundPromocode.discount) {
          applyDiscount(foundPromocode.discount)
        }

        promocodeInput.disabled = true
        promocodeBtn.disabled = true
      } else {
        removeCookie('promocode')
      }
    }
  }

  const handlePromocodeCheck = (evt) => {
    // Для клика мыши
    if (evt.type === 'click' && evt.currentTarget !== promocodeBtn) return
    // Для клавиатуры - проверяем Enter
    if (evt.type === 'keydown' && evt.key !== 'Enter') return

    if (store.cart.isEmpty) return
    if (!promocodeInput) return

    const inputValue = promocodeInput.value
    const foundPromocode = validatePromocode(inputValue, promocodeArr)

    if (foundPromocode) {
      setCookie('promocode', foundPromocode.promocode, 30)
      showSuccessMessage(foundPromocode.gift)

      if (foundPromocode.discount) {
        applyDiscount(foundPromocode.discount)
      }
    } else {
      showErrorMessage('Такого промокода не существует')
    }
  }

  const handleEnterKey = (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault()
      handlePromocodeCheck(evt)
      // Переводим фокус на кнопку для доступности
      if (promocodeBtn) {
        promocodeBtn.focus()
      }
    }
  }

  // Инициализация промокодов
  if (promocodeBtn) {
    promocodeBtn.addEventListener('click', handlePromocodeCheck)
  }

  if (promocodeInput) {
    promocodeInput.addEventListener('keydown', handleEnterKey)
  }

  // ===== ФУНКЦИИ ДЛЯ КОРЗИНЫ =====
  let currentCart = []

  const handleCartActions = (cart) => {
    if (!cartContent) return
    currentCart = cart
    updateCartUI()
  }

  const calculateTotalCartPrice = () => {
    return currentCart.reduce((total, book) => {
      return total + book.book.price * book.quantity
    }, 0)
  }

  const updateCartUI = () => {
    if (!cartContent) return

    const cartItems = cartContent.querySelectorAll('[data-cart-product]')
    cartItems.forEach((item) => item.remove())

    const totalPrice = calculateTotalCartPrice()
    if (originalPrice) {
      originalPrice.textContent = totalPrice.toFixed(2)
    }

    store.cart.items = currentCart
    store.cart.isEmpty = currentCart.length === 0
    store.cart.total = calculateTotalCartPrice()

    if (store.cart.isEmpty) {
      cartStore.classList.remove('has-items')
      if (cartCheckoutBtn) cartCheckoutBtn.disabled = true
      if (originalPrice) originalPrice.textContent = '0.00'

      if (promocodeBtn && promocodeInput) {
        promocodeBtn.disabled = true
        promocodeInput.disabled = true
      }

      resetPromocodeState()
      removeCookie('promocode')
    } else {
      applySavedPromocode()

      cartStore.classList.add('has-items')
      if (cartCheckoutBtn) cartCheckoutBtn.disabled = false

      if (promocodeBtn && promocodeInput) {
        promocodeBtn.disabled = false
        promocodeInput.disabled = false
      }

      currentCart.forEach((item) => {
        renderInCart(item)
      })
    }
  }

  const handleChangeQuantity = (evt) => {
    const button = evt.target.closest(
      '[data-cart-decrease], [data-cart-increase], [data-cart-remove]',
    )

    if (!button) return

    const cardItem = button.closest('[data-book-id]')
    const cardItemId = +cardItem.dataset.bookId

    const bookIndex = currentCart.findIndex(
      (item) => item.book.id === cardItemId,
    )
    if (bookIndex === -1) return

    if (button.hasAttribute('data-cart-decrease')) {
      if (currentCart[bookIndex].quantity <= 1) {
        currentCart.splice(bookIndex, 1)
      } else {
        currentCart[bookIndex].quantity -= 1
      }
    } else if (button.hasAttribute('data-cart-increase')) {
      currentCart[bookIndex].quantity += 1
    } else if (button.hasAttribute('data-cart-remove')) {
      currentCart.splice(bookIndex, 1)
    }

    updateCartUI()
  }

  const renderInCart = (book) => {
    const { id, title, author, price, imgSrc } = book.book
    const totalPrice = price * book.quantity

    const cartProduct = document.createElement('article')
    cartProduct.className = 'cart-product'
    cartProduct.dataset.bookId = id
    cartProduct.dataset.cartProduct = ''

    cartProduct.innerHTML = `
      <div class="cart-product__image-wrapper">
        <img src="${imgSrc}" alt="${title}" class="cart-product__image" width="60" height="90" loading="lazy">
      </div>
      <div class="cart-product__info">
        <h3 class="cart-product__name">${title}</h3>
        <p class="cart-product__author">${author}</p>
        <div class="cart-product__quantity-controls">
          <button class="cart-product__qty-btn cart-product__qty-btn--minus" aria-label="Уменьшить количество" data-cart-decrease>−</button>
          <span class="cart-product__qty-value" aria-live="polite">${
            book.quantity
          }</span>
          <button class="cart-product__qty-btn cart-product__qty-btn--plus" aria-label="Увеличить количество" data-cart-increase>+</button>
        </div>
      </div>
      <div class="cart-product__price">$${totalPrice.toFixed(2)}</div>
      <button class="cart-product__remove-btn" aria-label="Удалить из корзины" data-cart-remove>&times;</button>
    `

    cartContent.appendChild(cartProduct)
  }

  // Инициализация корзины
  if (cartContent) {
    cartContent.addEventListener('click', handleChangeQuantity)
  }

  // ===== ЭКСПОРТ =====
  window.cartAPI = {
    handleCartActions,
    updateCartUI,
    applySavedPromocode,
    resetPromocodeState,
  }
}

// Экспорт для других модулей
export const handleCartActions = window.cartAPI?.handleCartActions || (() => {})
export const updateCartUI = window.cartAPI?.updateCartUI || (() => {})
export default updateCartUI
