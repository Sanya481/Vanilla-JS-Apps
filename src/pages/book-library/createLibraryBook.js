/**
 * Создает DOM-элемент для одной книги
 * @param {Object} book - Данные книги 
 * @returns {HTMLElement} Возвращает клон шаблона (это DocumentFragment)
 */
function createLibraryBook(bookData) {
  // 1. Находим шаблон
  const template = document.querySelector('#library-book')
  // 2. Клонируем его содержимое (true = глубокое копирование)
  const templateBook = template.content.cloneNode(true)

  // 3. Заполняем данными
  const libraryBookEl = templateBook.querySelector('[data-library-book]')
  libraryBookEl.dataset.libraryBook = bookData.id

  const libraryBookImg = templateBook.querySelector('[data-library-book-img]')
  libraryBookImg.alt = `Обложка книги "${bookData.title}"`

  const libraryBookTitle = templateBook.querySelector(
    '[data-library-book-title]',
  )
  libraryBookTitle.textContent = bookData.title

  const libraryBookAuthor = templateBook.querySelector(
    '[data-library-book-author]',
  )
  libraryBookAuthor.textContent = bookData.author

  return templateBook
}

export default createLibraryBook