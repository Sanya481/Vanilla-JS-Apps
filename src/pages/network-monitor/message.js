const body = document.body

const createMessageContainer = () => {
  const container = document.createElement('div')
  container.className = 'message-container'

  body.appendChild(container)
  return container
}

const showErrorMessage = (text, result) => {
  let container = document.querySelector('.message-container')
  if (!container) {
    container = createMessageContainer()
  }

  container.innerHTML = ''

  const message = document.createElement('span')
  message.className = 'message'
  message.textContent = text

  switch (result) {
    case 'error': {
      message.classList.add('message--error')
      break
    }
    case 'slow': {
      message.classList.add('message--slow')
      break
    }
    case 'abort': {
      message.classList.add('message--abort')
      break
    }
  }

  container.appendChild(message)

  setTimeout(() => {
    if (message.parentNode) {
      message.remove()
    }
  }, 5000)
}

const checkConnection = async () => {
  const timeStart = Date.now()

  const controller = new AbortController()
  const signal = controller.signal

  const timerId = setTimeout(() => {
    console.log('Прошла 1 секунда! Отменяю')
    controller.abort()
    clearTimeout(timerId)
  }, 1000)

  try {
    const response = await fetch('https://sb-film.skillbox.cc/ping', {
      method: 'POST',
      signal,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error('Ошибка', data)
    }

    const timeFinish = Date.now()
    const time = timeFinish - timeStart

    if (time > 500) {
      console.log('Долго соединяется:', data)
      showErrorMessage('Медленное соединение', 'slow')
    }

    console.log('Всё в порядке:', data)
    return data
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Время истекло:', error)
      showErrorMessage('Слишком долгое ожидание ответа', 'abort')
    } else {
      console.error(error || 'Проблема с сетью')
      showErrorMessage('Проблема с сетью', 'error')
    }
  } finally {
    clearTimeout(timerId)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setInterval(() => checkConnection(), 5000)
})
