// Создает DOM-элемент карточки книги
import createBookCard from './book-card/create-book-card'

/**
 * Рендер каталога книг
 * @param {Array} books
 */
export const renderBookCard = (books, container,visibleItems, isInitialRender) => {
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
