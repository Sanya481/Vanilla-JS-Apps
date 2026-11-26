import { EMAIL, API_URL } from './constant'
import { showNotification } from '../../utils/notification/notification'
import { renderFilmsList } from './renderFilm'

const filterControls = document.querySelector('[data-filter-inputs]')
const filterStatus = document.querySelector('[data-filter-status]')
let filterData = {}

const getFilteredFilms = async (params) => {
  const response = await fetch(`${API_URL}?${params}`, {
    headers: { email: EMAIL },
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Ошибка загрузки')
  }
  return data
}

const buildQueryParams = (filterData) => {
  const params = new URLSearchParams()

  if (filterData.title?.trim()) params.append('title', filterData.title?.trim())
  if (filterData.genre?.trim()) params.append('genre', filterData.genre?.trim())
  if (filterData.releaseYear)
    params.append('releaseYear', filterData.releaseYear)
  if (filterData.hasOwnProperty('isWatched')) {
    params.append('isWatched', filterData.isWatched.toString())
  }

  return params
}

const fetchFilteredFilms = async (filterData) => {
  try {
    const params = buildQueryParams(filterData)
    const films = await getFilteredFilms(params)
    renderFilmsList(films)    
  } catch (error) {
    console.error('Ошибка фильтрации:', error)
    showNotification(error.message || 'Ошибка при фильтрации фильмов')
  }
}

const performFiltering = () => {
  fetchFilteredFilms(filterData)
}

const updateFilterAndSearch = (evt) => {
  if (evt.target.hasAttribute('data-filter-title')) {
    filterData = { ...filterData, title: evt.target.value }
  }
  if (evt.target.hasAttribute('data-filter-genre')) {
    filterData = { ...filterData, genre: evt.target.value }
  }
  if (evt.target.hasAttribute('data-filter-year')) {
    filterData = { ...filterData, releaseYear: evt.target.value }
  }

  performFiltering()
}

if (filterControls) {
  filterControls.addEventListener('input', updateFilterAndSearch)
}

const onFilterStatusChange = (evt) => {
  if (evt.target.hasAttribute('data-filter-status')) {
    if (evt.target.value === 'all') {
      const { isWatched, ...newFilterData } = filterData
      filterData = newFilterData
    } else {
      const isWatched = evt.target.value === 'watched' ? true : false
      filterData = { ...filterData, isWatched: isWatched }
    }
  }

  performFiltering()
}

if (filterStatus) {
  filterStatus.addEventListener('change', onFilterStatusChange)
}
