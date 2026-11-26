export const renderFilm = (el, filmToRender) => {
  el.innerHTML = `
      <td class="films-table__cell films-table__cell--title">${
        filmToRender.title
      }</td>
      <td class="films-table__cell films-table__cell--genre">${
        filmToRender.genre
      }</td>
      <td class="films-table__cell films-table__cell--year">${
        filmToRender.releaseYear
      }</td>
      <td class="films-table__cell films-table__cell--status">
        <span class="status status--${
          filmToRender.isWatched ? 'watched' : 'not-watched'
        }">
          ${filmToRender.isWatched ? 'Да' : 'Нет'}
        </span>
      </td>
      <td class="films-table__cell films-table__cell--actions">
        <div class="actions">
          <button type='button' class="btn btn--delete" data-delete-film='${
            filmToRender.id
          }'>
            Удалить
          </button>          
        </div>
      </td>
    `
}

export const renderFilmsList = (films, emptyMessage = 'Фильмы не найдены') => {
  const filmTbody = document.querySelector('[data-film-tbody]')
  const fragment = document.createDocumentFragment()

  filmTbody.innerHTML = ''

  if (films.length === 0) {
    filmTbody.innerHTML = `<tr class='empty-message'><td colspan="5" style="text-align: center; padding: 2rem;">${emptyMessage}</td></tr>`
    return
  }

  films.forEach((film) => {
    const row = document.createElement('tr')
    row.dataset.id = film.id
    renderFilm(row, film)
    fragment.appendChild(row)
  })

  filmTbody.appendChild(fragment)
}
