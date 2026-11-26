import validateCustomFields from './validate-field'
import './styles/main.scss'
import '@scss/main.scss'

if (document.querySelector('[data-delivery-form]')) {
  const deliveryForm = document.querySelector('[data-delivery-form]')
  const ecoListItems = document.querySelector('[data-eco-list-items]')
  const totalCoastDelivery = document.querySelector('[data-eco-total-cost]')
  const clearCartBtn = document.querySelector('[data-clear-cart]')
  const ecoEmptyState = document.querySelector('[data-eco-empty-state]')

  const PRICE_MULTIPLIER = 10

  let totalCoast = 0
  let cartDelivery = [] // Массив для хранения товаров

  const onClearCart = (evt) => {
    const isBtn = evt.target.closest('[data-clear-cart]')

    if (isBtn) {
      cartDelivery = []
      totalCoast = 0
      totalCoastDelivery.textContent = `Итого: ${totalCoast} ₽`
      ecoEmptyState.classList.remove('hide')
      clearCartBtn.disabled = true
      clearCartBtn.removeEventListener('click', onClearCart)

      ecoListItems
        .querySelectorAll('.eco-delivery-item')
        .forEach((item) => item.remove())
    }
  }

  const setEmptyState = (isVisible) => {
    console.log(isVisible)
    if (!ecoEmptyState) return

    if (isVisible) {
      ecoEmptyState.classList.add('hide')
      clearCartBtn.disabled = false
      clearCartBtn.addEventListener('click', onClearCart)
    } else {
      ecoEmptyState.classList.remove('hide')
      clearCartBtn.disabled = true
      clearCartBtn.removeEventListener('click', onClearCart)
    }
  }

  const updateTotalCost = (items) => {
    totalCoast = items.reduce((sum, item) => sum + item.cost, 0)
    totalCoastDelivery.textContent = `Итого: ${totalCoast} ₽`
  }

  const onItemClick = (evt) => {
    const itemDeleteBtn = evt.target.closest('[data-eco-item-remove]')

    if (itemDeleteBtn) {
      const itemToDelete = evt.target.closest('[data-eco-delivery-item]')
      const itemToDeleteId = Number(itemToDelete.dataset.id)
      console.log(itemToDeleteId)

      itemToDelete.remove()
      cartDelivery = cartDelivery.filter((item) => item.id !== itemToDeleteId)

      // Проверяем, не пуста ли корзина
      if (cartDelivery.length === 0) {
        setEmptyState(false)
      }

      updateTotalCost(cartDelivery)
    }
  }

  const renderDeliveryItem = (item) => {
    // 1. Получаем шаблон
    const template = document.getElementById('delivery-item')
    if (!template) {
      console.error('Шаблон с id "delivery-item" не найден')
      return
    }

    const id = Date.now()

    // 2. Клонируем содержимое шаблона
    const copy = template.content.cloneNode(true)

    // 4. Рассчитываем стоимость (используем свойства объекта item)
    const cost = (item.itemWeight * item.itemDistance) / PRICE_MULTIPLIER

    // Добавляем товар в корзину и обновляем общую стоимость
    cartDelivery.push({ ...item, cost, id })
    updateTotalCost(cartDelivery)

    // Показываем/скрываем блок пустого состояния
    if (cartDelivery.length !== 0) {
      // ecoEmptyState.classList.add('hide')
      setEmptyState(true)
    }

    // 3. Работаем с клонированным фрагментом
    copy.querySelector('[data-eco-item-weight]').textContent = `${parseFloat(
      item.itemWeight,
    )} кг`
    copy.querySelector(
      '[data-eco-item-distance]',
    ).textContent = `${+item.itemDistance} км`
    copy.querySelector('[data-eco-item-cost]').textContent = `${cost.toFixed(
      2,
    )} ₽`
    copy.querySelector('[data-eco-item-name]').textContent = item.itemName
    copy.querySelector('[data-eco-delivery-item]').dataset.id = id

    ecoListItems.appendChild(copy)

    deliveryForm.reset() // Сбросит все поля формы к значениям по умолчанию
  }

  const handleDeliveryFormSubmit = (evt) => {
    evt.preventDefault()

    //Когда вы передаёте форму в конструктор FormData, он автоматически собирает все её поля:
    const data = new FormData(deliveryForm)
    const deliveryData = Object.fromEntries(data.entries())
    console.log('Данные получены', Object.fromEntries(data.entries()))

    // Дополнительная кастомная валидация
    if (!validateCustomFields(deliveryData)) return

    renderDeliveryItem(deliveryData)
  }

  ecoListItems.addEventListener('click', onItemClick)
  deliveryForm.addEventListener('submit', handleDeliveryFormSubmit)
}

/*
*FormData - это встроенный в JavaScript объект, который позволяет легко собирать и отправлять данные HTML-форм, включая файлы, через AJAX.

*Атрибут enctype:
enctype="multipart/form-data" нужен ТОЛЬКО если форма содержит загрузку файлов (<input type="file">)

стоимость доставки = (вес товара * расстояние доставки)/10

*Как устроен filter()?
const newArray = originalArray.filter((element, index, array) => {
  return условие; // true — оставить элемент, false — удалить
});

element — текущий элемент массива.
index (опционально) — его индекс.
array (опционально) — исходный массив.
Возвращает новый массив, где только элементы, для которых условие вернуло true.
*/
