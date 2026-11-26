import './styles/main.scss'
import '@scss/main.scss'

const deliveryTrackerList = document.querySelector(
  '[data-delivery-tracker-list]',
)

// Базовый класс Delivery
class Delivery {
  constructor(customerName, address, distance) {
    this.customerName = customerName
    this.address = address
    this.distance = distance
  }

  // Геттер для расстояния с единицей измерения
  get distanceWithUnit() {
    return `${this.distance} км`
  }

  // Геттер для CSS-класса на основе расстояния
  get deliveryClass() {
    if (this.distance <= 3) return 'delivery-card--short'
    if (this.distance <= 8) return 'delivery-card--medium'
    return 'delivery-card--long'
  }

  // Метод создания HTML-карточки
  createCard(index) {
    return `
    <li class="delivery-card ${this.deliveryClass}" data-index="${index}">
      <div class="delivery-card__header">
        <h3 class="delivery-card__customer">${this.customerName}</h3>
        <span class="delivery-card__distance">${this.distanceWithUnit}</span>
      </div>
      <div class="delivery-card__body">
        <p class="delivery-card__address">📍 ${this.address}</p>
      </div>
      <div class="delivery-card__footer">
        <button class="delivery-card__action delivery-card__action--edit">Изменить</button>
        <button class="delivery-card__action">Принято в доставку</button>
      </div>
    </li>
    `
  }
}

// extends - наследует всё от Parent + может добавлять своё
class EditDelivery extends Delivery {
  constructor(customerName, address, distance, status = 'delivery') {
    // Вызываем конструктор родителя с параметрами
    super(customerName, address, distance)
    // Добавляем новое свойство - статус
    this.status = status
  }

  static getTotalDistance(deliveries, excludedStatus = 'canceled') {
    return deliveries
      .filter((delivery) => delivery.status !== excludedStatus)
      .reduce((sum, delivery) => sum + delivery.distance, 0)
  }

  // Переопределяем геттер deliveryClass
  get deliveryClass() {
    const parentClass = super.deliveryClass

    // Добавляем класс в зависимости от статуса
    if (this.status === 'delivered')
      return `${parentClass} delivery-card--delivered`
    if (this.status === 'canceled')
      return `${parentClass} delivery-card--canceled`
    return `${parentClass} delivery-card--delivery`
  }

  openEditModal() {
    // 1. Удаляем старую модалку
    const oldModal = document.querySelector('.modal-overlay')
    if (oldModal) oldModal.remove()

    // 2. Создаем modalHTML
    const modalHTML = `
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal__header">
          <h2 class="modal__title">✏️ Редактировать доставку</h2>
          <button class="modal__close">&times;</button>
        </div>
        
        <form class="modal__form" id="editForm">
          <div class="form-group">
            <label class="form-label" for="customerName">Имя покупателя</label>
            <input 
              type="text" 
              id="customerName" 
              name="customerName" 
              class="form-input"
              value="${this.customerName}"
              required
            >
          </div>
          
          <div class="form-group">
            <label class="form-label" for="address">Адрес доставки</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              class="form-input"
              value="${this.address}"
              required
            >
          </div>
          
          <div class="form-group">
            <label class="form-label" for="distance">Расстояние (км)</label>
            <input 
              type="number" 
              id="distance" 
              name="distance" 
              class="form-input"
              min="1"
              max="100"
              value="${this.distance}"
              required
            >
          </div>
          
          <div class="form-group">
            <label class="form-label" for="status">Статус доставки</label>
            <select id="status" name="status" class="form-select">
              <option value="delivery" ${
                this.status === 'delivery' ? 'selected' : ''
              }>🚚 Доставляется</option>
              <option value="delivered" ${
                this.status === 'delivered' ? 'selected' : ''
              }>✅ Доставлен</option>
              <option value="canceled" ${
                this.status === 'canceled' ? 'selected' : ''
              }>❌ Отменён</option>
            </select>
          </div>
          
          <div class="modal__footer">
            <button type="button" class="btn btn--secondary modal__cancel">Отмена</button>
            <button type="submit" class="btn btn--primary modal__save">Сохранить изменения</button>
          </div>
        </form>
      </div>
    </div>
  `.trim()

    const range = document.createRange()
    const fragment = range.createContextualFragment(modalHTML)
    const modalElement = fragment.firstElementChild
    document.body.appendChild(fragment)

    this.setupModalEvents(modalElement)
  }

  setupModalEvents(modalElement) {
    const closeBtn = modalElement.querySelector('.modal__close')
    const cancelBtn = modalElement.querySelector('.modal__cancel')
    const overlay = modalElement

    const closeModal = () => {
      modalElement.remove()
    }

    closeBtn.addEventListener('click', closeModal)
    cancelBtn.addEventListener('click', closeModal)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal()
      }
    })

    const form = modalElement.querySelector('#editForm')
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      // 1. Получаем FormData
      const formData = new FormData(form)
      // 3. Преобразуем в объект
      const data = Object.fromEntries(formData)
      console.log('data', data)

      // Обновляем объект
      this.customerName = data.customerName
      this.address = data.address
      this.distance = Number(data.distance)
      this.status = data.status

      // 3. Находим индекс
      const index = deliveryArr.findIndex((delivery) => delivery === this)
      // 4. Находим карточку
      const cardElement = document.querySelector(`[data-index='${index}']`)

      if (cardElement) {
        // 5. Обновляем карточку
        cardElement.outerHTML = this.createCard(index)

        // 6. Находим НОВУЮ карточку (после замены)
        const newCard = document.querySelector(`[data-index='${index}']`)

        // 7. Вешаем обработчик на новую кнопку
        const editBtn = newCard.querySelector('.delivery-card__action--edit')
        editBtn.addEventListener('click', () => {
          deliveryArr[index].openEditModal()
        })
      }

      closeModal()
    })
  }
}

const deliveryArr = [
  new EditDelivery('Ольга', 'ул. Вымыслов, д. 12', 8, 'delivered'),
  new EditDelivery('Дмитрий', 'ул. Задачная, д. 7', 5, 'canceled'),
  new EditDelivery('Оля', 'ул. Ткачей, д. 43', 10),
]

const allCards = deliveryArr
  .map((delivery, index) => delivery.createCard(index))
  .join('')

deliveryTrackerList.innerHTML = allCards

const editBtns = deliveryTrackerList.querySelectorAll(
  '.delivery-card__action--edit',
)

editBtns.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Берем объект из массива по индексу
    deliveryArr[index].openEditModal()
  })
})

const deliveryCount = document.querySelector('[data-delivery-count]')
deliveryCount.textContent = deliveryArr.length

// Рассчёт общего расстояния
const totalDistanceBtn = document.querySelector('[data-total-distance-btn]')
const totalDistanceValue = document.querySelector('[data-total-distance]')
const totalCountBadge = document.querySelector('[data-total-count]')

totalDistanceBtn.addEventListener('click', () => {
  const result = EditDelivery.getTotalDistance(deliveryArr)
  const activeDeliveries = deliveryArr.filter((delivery) => delivery.status !== 'canceled')

  // Добавляем анимацию
  totalDistanceValue.classList.remove('updated')
  void totalDistanceValue.offsetWidth // Триггер перерисовки
  totalDistanceValue.classList.add('updated')

  // Обновляем значения
  if (result === 0) {
    totalDistanceValue.textContent = '0 км'
    totalDistanceValue.style.color = '#64748b'
  } else {
    totalDistanceValue.textContent = `${result} км`
    totalDistanceValue.style.color = ''
  }

  // Обновляем бейдж с количеством
  totalCountBadge.textContent = `Активных доставок: ${activeDeliveries.length}`

  // Убираем анимацию после завершения
  setTimeout(() => {
    totalDistanceValue.classList.remove('updated')
  }, 800)
})
