import { renderFilmsList } from './renderFilm'
import { API_URL, EMAIL } from './constant'

const sortByField = (films, field, direction = 'asc') => {
  return [...films].sort((a, b) => {
    const modifier = direction === 'asc' ? 1 : -1
    return (
      a[field].toLowerCase().localeCompare(b[field].toLowerCase()) * modifier
    )
  })
}

const getSortedFilms = (films, sortType) => {
  switch (sortType) {
    case 'title':
      return sortByField(films, 'title')
    case 'genre':
      return sortByField(films, 'genre')
    case 'releaseYear':
      return [...films].sort((a, b) => a.releaseYear - b.releaseYear)
    case 'default':
      return films
  }
}

const fetchFilms = async () => {
  const response = await fetch(API_URL, {
    headers: { email: EMAIL },
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Похоже фильмов нет')
  }
  return data
}

const sortFilms = async (sortType) => {
  try {
    const films = await fetchFilms()
    const sortedFilms = getSortedFilms(films, sortType)
    renderFilmsList(sortedFilms)
  } catch (error) {
    console.error(error)
  }
}

const handleSortClick = (evt) => {
  const sortMethod = evt.target.dataset.sortBy
  if (sortMethod) {
    sortFilms(sortMethod)
  }
}

if (document.querySelector('[data-sort-controls]')) {
  const sortControls = document.querySelector('[data-sort-controls]')

  sortControls.addEventListener('click', handleSortClick)
}
