import { showNotification } from '../../utils/notification/notification'
import { renderFilm, renderFilmsList } from './renderFilm'
import { loadFilmsFromServer } from './firstLoadFilm'
import { EMAIL, API_URL } from './constant'
import './styles/main.scss'
import '@scss/main.scss'
import './sortFilms'
import './deleteAll'
import './filterFilms'

const sendFilmToServer = async (film) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      email: EMAIL,
    },
    body: JSON.stringify(film),
  })
  const data = await response.json()

  if (!response.ok) {
    // Логика оператора ||: возвращает первое truthy значение или последнее, если все falsy.
    throw new Error(data.error || 'Ошибка при добавлении фильма')
  }
  return data
}

const addFilmToTable = async (film) => {
  try {
    const filmForm = document.querySelector('[data-film-form]')
    const filmToAdd = await sendFilmToServer(film)
    const filmTbody = document.querySelector('[data-film-tbody]')

    const emptyMessage = filmTbody.querySelector('.empty-message')
    if (emptyMessage) {
      emptyMessage.remove()
    }

    const row = document.createElement('tr')
    row.dataset.id = filmToAdd.id
    renderFilm(row, filmToAdd)
    filmTbody.appendChild(row)

    showNotification('Фильм успешно добавлен!')
    filmForm.reset()
  } catch (error) {
    // Обработка ошибки - показываем сообщение пользователю
    console.error(error.message || 'Ошибка при добавлении фильма')
    showNotification(error.message)
  }
}

const updateFilmInDOM = (updatedFilm) => {
  const filmTbody = document.querySelector('[data-film-tbody]')
  const filmToEdit = filmTbody.querySelector(`[data-id="${updatedFilm.id}"]`)

  if (filmToEdit) {
    filmToEdit.innerHTML = ''
    renderFilm(filmToEdit, updatedFilm)
  }
}

const updateFilm = (filmId, newData) => {
  const films = JSON.parse(localStorage.getItem('films'))

  const filmIndex = films.findIndex((item) => item.id === +filmId)

  if (filmIndex === -1) return alert('Фильм не найден')

  // Обновляем только переданные поля (частичное обновление)
  films[filmIndex] = {
    ...films[filmIndex], // старые данные
    ...newData, // новые данные (перезапишут старые)
    id: parseInt(filmId), // сохраняем оригинальный ID
  }

  localStorage.setItem('films', JSON.stringify(films))

  updateFilmInDOM(films[filmIndex])
}

const handleSubmitForm = (evt) => {
  const filmForm = document.querySelector('[data-film-form]')
  evt.preventDefault()

  const formData = new FormData(filmForm)
  const formDataObject = Object.fromEntries(formData.entries())

  const data = {
    ...formDataObject,
    isWatched: formData.has('isWatched'),
  }

  // Проверяем: редактирование или добавление?
  const editingId = filmForm.dataset.editingId

  if (editingId) {
    // РЕДАКТИРУЕМ существующий фильм
    updateFilm(editingId, data)
  } else {
    // ДОБАВЛЯЕМ новый фильм
    addFilmToTable(data)
  }

  delete filmForm.dataset.editingId // очищаем режим редактирования
}

const deleteOnServer = async (filmId) => {
  const response = await fetch(`${API_URL}/${filmId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      email: EMAIL,
    },
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Не удалось удалить фильм')
  }
}

// Удаление
const deleteFilm = async (filmId) => {
  try {
    const filmTbody = document.querySelector('[data-film-tbody]')

    const data = await deleteOnServer(filmId)

    const filmRow = filmTbody.querySelector(`tr[data-id='${filmId}']`)
    if (filmRow) {
      filmRow.remove()
    }

    showNotification(data?.message || 'Фильм успешно удален')
  } catch (error) {
    console.error('Ошибка при удалении фильма', error)
    showNotification(error.message)
  }
}

const onDeleteFilm = (evt) => {
  if (evt.target.hasAttribute('data-delete-film')) {
    const filmId = evt.target.getAttribute('data-delete-film')
    deleteFilm(filmId)
  }
}

if (document.querySelector('[data-film-form]')) {
  const filmForm = document.querySelector('[data-film-form]')
  const filmTbody = document.querySelector('[data-film-tbody]')

  // Удаление фильма
  filmTbody.addEventListener('click', onDeleteFilm)
  // Добавление фильма при заполнении формы
  filmForm.addEventListener('submit', handleSubmitForm)
  // Загрузка фильмов при открытии браузера
  document.addEventListener('DOMContentLoaded', loadFilmsFromServer)
}
