import { renderFilmsList } from './renderFilm'
import { EMAIL } from './constant'
import { showNotification } from '../../utils/notification/notification'

/**
 * Функция загрузки фильмов при открытии страницы
 */
export const loadFilmsFromServer = async () => {
  try {
    const response = await fetch('https://sb-film.skillbox.cc/films', {
      headers: {
        email: EMAIL,
      },
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Ошибка при загрузке фильмов')
    }

    const films = data
    renderFilmsList(films)
  } catch (error) {
    console.error(error)
    showNotification(error || 'Ошибка при загрузке фильмов')
  }
}
