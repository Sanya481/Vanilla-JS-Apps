import fetchBooks from './api/api'
import createBookCard from './components/book-card/createCard'
import changeSortBooks from './components/sort/sort'
import updateCartUI, { handleCartActions } from './components/cart/cart-item'
import openModal from './components/promo-modal/modal'

import './styles/main.scss'
import '@scss/main.scss'

const bookCatalog = document.querySelector('[data-book-catalog]')
const cartStore = document.querySelector('[data-cart]')
if (bookCatalog || cartStore) {
  /**
   * все товары в магазине.
   */
  let books = []
  /**
   * товары в корзине (храним id, quantity и другие данные).
   */
  let cart = []

  /**
   * текущее количество отображённых элементов (изначально = 6)
   */
  let visibleItems = 6

  /**
   * сколько добавлять за один клик (3)
   */
  const ITEMS_PER_LOAD = 3

  /**
   * Флаг первого рендера
   */
  let isInitialRender = true

  /**
   * Инициализация приложения
   */
  const initBookStore = async () => {
    const bookCatalog = document.querySelector('[data-book-catalog]')
    if (!bookCatalog) return

    try {
      const data = await fetchBooks() // Загружаем книги с сервера
      books = data // Сохраняем в переменную
      renderBookCard(books, bookCatalog) // Рендерим карточки
      setupCartHandlers()
    } catch (error) {
      console.error('Error initializing book store:', error)
    }
  }

  /**
   * Рендер каталога книг
   * @param {Array} books
   */
  const renderBookCard = (books, container) => {
    // Создаем фрагмент
    const fragment = document.createDocumentFragment()
    const cards = books.map((book) => createBookCard(book)) // Получаем массив карточек

    if (isInitialRender) {
      // Очищаем каталог только при первом рендере
      container.innerHTML = ''
      const initialBooks = cards.slice(0, visibleItems)
      // Добавляем карточки во фрагмент
      initialBooks.forEach((card) => {
        fragment.appendChild(card)
      })
      isInitialRender = false
      console.log('Первоначальный рендер')
    } else {
      // Добавляем только новые карточки
      const newBooks = cards.slice(visibleItems - ITEMS_PER_LOAD, visibleItems)
      newBooks.forEach((card) => {
        fragment.appendChild(card)
      })
      console.log('Догрузка элементов')
    }

    // Добавляем фрагмент в DOM
    container.appendChild(fragment)
  }

  /**
   * Обработчик добавления в корзину
   * @param {Event} evt
   * @returns
   */
  const addToCart = (evt) => {
    // Проверяем, что клик был по кнопке "Добавить в корзину"
    if (!evt.target.hasAttribute('data-add-to-cart')) return
    // Получаем ID книги из data-атрибута
    const bookId = +evt.target.dataset.bookId

    // 1. Находим книгу в общем списке
    const book = books.find((book) => book.id === bookId)
    if (!book) return // если не нашли — выходим

    // 2. Проверяем, есть ли книга в корзине
    const existingItem = cart.find((item) => item.book.id === bookId)

    if (existingItem) {
      // Если уже есть — увеличиваем количество
      existingItem.quantity += 1
      // console.log(' количество', cart)
    } else {
      // Если нет — добавляем новую запись
      cart.push({ book, quantity: 1 })
      // console.log(' новую запись', cart)
    }

    // 3. Обновляем корзину на странице
    handleCartActions(cart)
  }

  // Вешаем обработчик на каталог (делегирование событий)
  function setupCartHandlers() {
    const bookCatalog = document.querySelector('[data-book-catalog]')
    if (bookCatalog) {
      bookCatalog.addEventListener('click', addToCart)
    }
  }

  // Инициализация
  handleCartActions(cart) // Передаём корзину один раз

  if (document.querySelector('[data-book-catalog]')) {
    // Запускаем приложение
    initBookStore()
  }

  // Реализация кнопки "Показать ещё"

  const showMoreBtn = document.querySelector('[data-show-more]')

  /**
   * Показать ещё книг
   * @param {Event} evt
   */
  const onShowMoreButtonClick = (evt) => {
    const button = evt.target.closest('[data-show-more]')
    if (button) {
      visibleItems = visibleItems + ITEMS_PER_LOAD
      renderBookCard(books, bookCatalog)

      if (visibleItems >= books.length) {
        showMoreBtn.disabled = true
        showMoreBtn.textContent = 'Все книги загружены'
      }
    }
  }

  if (document.querySelector('[data-show-more]')) {
    showMoreBtn.addEventListener('click', onShowMoreButtonClick)
  }

  // Реализация самой дешёвой/дорогой книги

  const promoBlock = document.querySelector('[data-promo-block]')

  const onShowPromoBook = (evt) => {
    evt.stopPropagation()

    // Проверяем, что книги загружены
    if (!books || books.length === 0) {
      console.error('Books not loaded!')
      return
    }

    const promoCheapestBtn = evt.target.closest('[data-promo-cheapest]')
    const promoPremiumBtn = evt.target.closest('[data-promo-premium]')

    if (promoCheapestBtn) {
      const cheapestBook = books.reduce(
        (min, book) => (book.price < min.price ? book : min),
        books[0], // Начальное значение
      )
      openModal(cheapestBook)
      console.log('cheapestBook', cheapestBook)
    } else if (promoPremiumBtn) {
      // min — текущая книга с минимальной ценой.
      // На каждом шаге сравниваем цену текущей книги (book.price) с min.price.
      // На каждом шаге сравниваем цену текущей книги (book.price) с min.price.
      const expensiveBook = books.reduce(
        (min, book) => (book.price > min.price ? book : min),
        books[0], // Начальное значение
      )
      openModal(expensiveBook)
      console.log('expensiveBook', expensiveBook)
    }
  }

  if (document.querySelector('[data-promo-block]')) {
    promoBlock.addEventListener('click', onShowPromoBook)
  }

  // *Сортировка

  const sortBlock = document.querySelector('[data-sort]')
  const sortDropdownContent = sortBlock.querySelector('[data-sort-dropdown]')
  const sortToggleBtn = sortBlock.querySelector('[data-sort-dropdown]')

  const sortBooks = (option) => {
    console.log('Выбрана опция:', option)
    let sortedBooks = [...books] // Создаём копию

    changeSortBooks(option, sortedBooks)

    // Обновляем исходный массив и сбрасываем счётчик
    books = sortedBooks
    visibleItems = 6
    isInitialRender = true

    // Сбрасываем состояние кнопки "Показать ещё"
    if (showMoreBtn) {
      showMoreBtn.disabled = false
      showMoreBtn.textContent = 'Показать ещё'
    }

    sortToggleBtn.setAttribute('aria-expanded', false)
    sortDropdownContent.hidden = true

    // Полностью перерисовываем каталог
    bookCatalog.innerHTML = ''
    renderBookCard(books, bookCatalog)
  }

  const onSortBlockOpen = (evt) => {
    evt.stopPropagation()
    const sortToggleBtn = evt.target.closest('[data-sort-toggle]')
    const sortOption = evt.target.closest('[data-sort-option]')

    if (sortToggleBtn) {
      // Переключаем атрибут hidden
      sortDropdownContent.hidden = !sortDropdownContent.hidden

      // Обновляем aria-expanded для доступности
      const isExpanded = sortDropdownContent.hidden ? false : true
      sortToggleBtn.setAttribute('aria-expanded', isExpanded)

      document.addEventListener('click', onCloseSortBlock)
    }

    if (sortOption) {
      const option = sortOption.dataset.sortOption
      sortBooks(option)
    }
  }

  const onCloseSortBlock = (evt) => {
    if (!sortDropdownContent.contains(evt.target)) {
      sortToggleBtn.setAttribute('aria-expanded', false)
      sortDropdownContent.hidden = true
    }
  }

  if (document.querySelector('[data-sort]')) {
    sortBlock.addEventListener('click', onSortBlockOpen)
  }

  // *Поиск

  const searchForm = document.querySelector('[data-search-form]')

  const searchBooks = (value) => {
    const query = value.trim().toLowerCase() // Удаляем пробелы по краям

    if (!query) {
      // Если строка пустая - показываем все книги
      visibleItems = 6
      renderBookCard(books, bookCatalog)
      return
    }

    const foundBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query),
    )

    visibleItems = foundBooks.length
    isInitialRender = true

    renderBookCard(foundBooks, bookCatalog)
  }

  const onSearchBook = (evt) => {
    evt.preventDefault()

    const searchValue = evt.target.querySelector('input').value

    searchBooks(searchValue)
  }

  if (document.querySelector('[data-search-form]')) {
    searchForm.addEventListener('submit', onSearchBook)
  }
}

