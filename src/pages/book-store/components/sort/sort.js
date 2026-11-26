/**
 * Функция сортировки
 * @param {string} option - вариант сортировки
 * @param {Array} booksToSort - копия массива для сортировки
 * @returns 
 */
const changeSortBooks = (option, booksToSort) => {
  switch (option) {
    case 'price-asc': // Дешёвые → дорогие
      booksToSort.sort((a, b) => a.price - b.price)

      break
    case 'price-desc': // Дорогие → дешёвые
      booksToSort.sort((a, b) => b.price - a.price)
      break
    case 'title-asc': // А → Я
      booksToSort.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'title-desc': // Я → А
      booksToSort.sort((a, b) => b.title.localeCompare(a.title))
      break
    default:
      return
  }
}

export default changeSortBooks