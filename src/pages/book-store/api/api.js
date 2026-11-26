/**
 * @description Модуль для работы с API книжного магазина
 */
import { booksData } from '../books-data'

/**
 * Асинхронно загружает список книг с сервера
 * @returns {Promise<Array<Book>>} Промис с массивом книг
 * @throws {Error} Ошибка загрузки данных
 */
const fetchBooks = async () => {
  try {
    // Имитируем асинхронную загрузку для совместимости со старым кодом
    return await Promise.resolve(booksData)
  } catch (error) {
    console.error('Failed to fetch books:', error)
    throw error
  }
}

export default fetchBooks

//  1. Делаем запрос (как заказ в пиццерию)
// fetch('/data/books.json')
//    2. Проверяем ответ (подтверждение заказа)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`Ошибка HTTP! Статус: ${response.status}`)
//     }
//     return response.json() // Говорим, что ожидаем JSON (как "распаковать" данные)
//   })
//    3. Работаем с полученными данными (едим пиццу)
//   .then((data) => {
//     console.log('Успешно получили данные:', data)
//     books = data

//     renderBookCard(books)
//     Здесь можно использовать данные:
//      renderBooks(data);
//      или сохранить в state и т.д.
//   })
//    4. Обрабатываем ошибки (если что-то пошло не так)
//   .catch((error) => {
//     console.error('Ошибка при получении данных:', error)
//      Можно показать пользователю сообщение об ошибке:
//      showErrorToUser('Не удалось загрузить книги, попробуйте позже');
//   })
