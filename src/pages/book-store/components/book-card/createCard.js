/**
 * @typedef {Object} Book
 * @property {number} id - Уникальный идентификатор книги
 * @property {string} title - Название книги
 * @property {string} author - Автор книги
 * @property {number} rating - Рейтинг книги (1-5)
 * @property {string} description - Описание книги
 * @property {string} imgSrc - URL обложки
 * @property {number} price - Цена книги
 */

/**
 * Создает DOM-элемент карточки книги
 * @param {Object} book - Объект с данными книги
 * @returns {HTMLElement} Созданный элемент карточки
 */
const createBookCard = ({
  id,
  title,
  author,
  rating,
  description,
  imgSrc,
  price,
}) => {
  const bookCard = document.createElement('article')
  bookCard.className = 'book-card'
  bookCard.dataset.bookId = id

  bookCard.innerHTML = `    
        <div class="book-card__badges">
          <span class="book-card__badge book-card__badge--bestseller">Бестселлер</span>          
        </div>
        <button class="book-card__favorite" aria-label="Добавить в избранное" data-favorite="false">
         ♥
        </button>          
        <div class="book-card__inner">
          <div class="book-card__cover-container">
            <img
              src=${imgSrc}
              alt='${title}'
              class="book-card__cover"
              width="120"
              height="180"
            />
          </div>
          <div class="book-card__content">
            <div class="book-card__header">
              <h3 class="book-card__title">${title}</h3>
              <p class="book-card__author">${author}</p>
            </div>
            <div class="book-card__rating" aria-label="Рейтинг: ${rating} из 5">
              ★★★★☆ <span class="book-card__rating-value">${rating}</span>
            </div>
            <p class="book-card__description">
              ${description}
            </p>
            <div class="book-card__footer">
              <div class="book-card__price" aria-label="Цена: ${price} долларов">
                $<span>${price}</span>
              </div>
              <button
                class="book-card__button button--primary"
                aria-label="Добавить в корзину"
                data-book-id=${id}
                data-add-to-cart
              >
                В корзину
              </button>
            </div>
          </div>
        </div>      
    `
  return bookCard
}

export default createBookCard
