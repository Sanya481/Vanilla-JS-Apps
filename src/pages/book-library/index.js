import createLibraryBook from './createLibraryBook'

import './styles/main.scss'
import '@scss/main.scss'

/**
 * Модуль работы с модальным окном добавления книг в библиотеку
 */
if (document.querySelector('[data-add-book]')) {
  const addBookButton = document.querySelector('[data-add-book]')
  const bookModal = document.querySelector('[data-book-modal]')
  const bookForm = bookModal.querySelector('[data-book-form]')
  const booksList = document.querySelector('[data-books-list]')
  const booksCountAll = document.querySelector('[data-books-count]')

  let bookLibrary = []
  // Счётчик для уникального ID к каждой новой книги (начинаем с 0)
  let lastBookId = 0

  /**
   * Рендерит список книг в библиотеке
   * @param {Array<{title: string, author: string}>} books - Массив книг для отображения
   * @param {HTMLElement} container - Контейнер для рендеринга
   */
  function renderBooksList(books, container) {
    const fragment = document.createDocumentFragment()

    books.map((book, index) => {
      fragment.appendChild(createLibraryBook(book, index))
    })

    container.innerHTML = ''
    container.appendChild(fragment)
    booksCountAll.textContent = books.length
  }

  /**
   * Закрывает модальное окно и выполняет очистку
   */
  function closeModal() {
    bookModal.classList.remove('is-open')
    bookForm.reset()
    bookModal.setAttribute('inert', '')
    document.body.style.overflow = ''

    // Удаляем все обработчики событий
    bookForm.removeEventListener('submit', handleFormSubmit)
    document.removeEventListener('click', handleCloseModal)
    document.removeEventListener('keydown', handleEscapeKey)
  }

  /**
   * Открывает модальное окно
   */
  function openModal() {
    bookModal.removeAttribute('inert')
    bookModal.classList.add('is-open')
    document.body.style.overflow = 'hidden'
    bookModal.querySelector('input').focus()

    // Добавляем обработчики событий
    bookForm.addEventListener('submit', handleFormSubmit)
    document.addEventListener('click', handleCloseModal)
    document.addEventListener('keydown', handleEscapeKey)
  }

  function handleCloseModal(evt) {
    const isCloseBtn = evt.target.closest('[data-modal-close]')
    const isOutsideClick =
      !evt.target.closest('[data-modal-library-content]') &&
      evt.target.closest('.modal-library__overlay')

    if (isCloseBtn || isOutsideClick) {
      closeModal()
    }
  }

  /**
   * Обрабатывает нажатие клавиши Escape
   * @param {Event} event - Объект события клавиатуры
   */
  function handleEscapeKey(event) {
    if (event.key === 'Escape') {
      closeModal()
    }
  }

  /**
   * Обрабатывает отправку формы добавления книги
   * @param {Event} event - Объект события формы
   */
  function handleFormSubmit(event) {
    event.preventDefault()

    const titleInput = event.target.querySelector('#book-title')
    const authorInput = event.target.querySelector('#book-author')

    const title = titleInput.value.trim()
    const author = authorInput.value.trim()

    if (!title || !author) {
      alert('Пожалуйста, заполните все поля')
      return
    }

    // Увеличиваем ID для каждой новой книги
    const id = ++lastBookId

    bookLibrary.push({ id, title, author })
    closeModal()
    renderBooksList(bookLibrary, booksList)
  }

  /**
   * Обрабатывает открытие модального окна
   * @param {Event} event - Объект события клика
   */
  function handleOpenModalClick(event) {
    event.stopPropagation()
    if (event.target.closest('[data-add-book]')) {
      openModal()
    }
  }

  // Инициализация
  addBookButton.addEventListener('click', handleOpenModalClick)

  // Удаление книги

  /**
   * Удаление книги
   * @param {Number} id
   */
  const deleteBook = (id) => {
    bookLibrary = bookLibrary.filter((book) => book.id !== id)
    renderBooksList(bookLibrary, booksList)
  }

  /**
   * Обработчик клика по библиотеке книг
   * @param {Event} evt
   */
  const onBookLibraryClick = (evt) => {
    const bookDeleteBtn = evt.target.closest('[data-library-action="delete"]')
    if (!bookDeleteBtn) return

    const bookElement = evt.target.closest('[data-library-book]')
    const bookId = Number(bookElement.dataset.libraryBook)

    deleteBook(bookId)
  }

  booksList.addEventListener('click', onBookLibraryClick)
}
