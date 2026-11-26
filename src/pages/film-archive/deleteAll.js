import { API_URL, EMAIL } from './constant'
import { showNotification } from '../../utils/notification/notification'

const deleteAllFilmsApi = async () => {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      email: EMAIL,
    },
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message || 'Ошибка при удалении всех фильмов')
  }

  return data
}

const setButtonState = (button, { disabled, text }) => {
  if (disabled !== undefined) button.disabled = disabled
  if (text) button.textContent = text
}

// Удаление всех фильмов
const onDeleteAllFilms = async () => {
  const filmTbody = document.querySelector('[data-film-tbody]')
  const clearAllBtn = document.querySelector('[data-clear-all]')
  const originalText = clearAllBtn.textContent

  try {
    setButtonState(clearAllBtn, { disabled: true, text: 'Удаление...' })

    // Даем браузеру время на перерисовку
    await new Promise((resolve) => setTimeout(resolve, 10))

    if (!filmTbody.children.length || filmTbody.children.length === 0) {
      showNotification('Список фильмов пуст - удалять нечего')
      return
    }

    const isConfirmed = confirm(
      'Вы уверены, что хотите удалить ВСЕ фильмы? Это действие нельзя отменить.',
    )
    if (!isConfirmed) return

    await deleteAllFilmsApi()

    filmTbody.innerHTML = ''
    showNotification('Список фильмов очищен')
  } catch (error) {
    console.error(error)
    showNotification(error || 'Ошибка при удалении фильмов')
  } finally {
    setButtonState(clearAllBtn, { disabled: false, text: originalText })
  }
}

if (document.querySelector('[data-clear-all]')) {
  const clearAllBtn = document.querySelector('[data-clear-all]')

  clearAllBtn.addEventListener('click', onDeleteAllFilms)
}
