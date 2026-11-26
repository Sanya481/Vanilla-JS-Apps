const bookModalPromo = document.querySelector('[data-book-modal-promo]')

const onModalClose = (evt) => {
  const isCloseBtn = evt.target.closest('[data-modal-close]')
  const isOutsideClick = !evt.target.closest('[data-modal-content]')
  // const isOpenBtn = !evt.target.closest('[data-promo-cheapest]')

  if (isCloseBtn || isOutsideClick) {
    bookModalPromo.setAttribute('aria-hidden', true)
    document.body.style.overflow = ''
    document.removeEventListener('click', onModalClose)
  }
}

const openModal = (book) => {
  if (!bookModalPromo) return

  const modalTitle = bookModalPromo.querySelector('[data-modal-title]')
  modalTitle.textContent = book.title
  const modalAuthor = bookModalPromo.querySelector('[data-modal-author]')
  modalAuthor.textContent = book.author
  const modalDescription = bookModalPromo.querySelector(
    '[data-modal-description]',
  )
  modalDescription.textContent = book.description
  const modalPrice = bookModalPromo.querySelector('[data-modal-price]')
  modalPrice.textContent = book.price
  const modalRating = bookModalPromo.querySelector('[data-modal-rating]')
  modalRating.textContent = book.rating
  const modalCover = bookModalPromo.querySelector('[data-modal-cover]')
  modalCover.src = book.imgSrc

  bookModalPromo.setAttribute('aria-hidden', false)
  document.body.style.overflow = 'hidden'
  document.addEventListener('click', onModalClose)
}

export default openModal
