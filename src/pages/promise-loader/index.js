import './styles.scss'
import '@scss/main.scss'

import cat1 from './images/cat1.jpg'
import cat2 from './images/cat2.jpg'
import cat3 from './images/cat3.jpg'
import dog1 from './images/dog1.jpg'
import dog2 from './images/dog2.jpg'
import dog3 from './images/dog3.jpg'

// Задание 1
const progressBarContainer = document.querySelector(
  '[data-progressBar-wrapper]',
)
const imgWrapper = document.querySelector('[data-img-wrapper]')
const ImgCatBarWrapper = document.querySelector('[data-imgCat-bar-wrapper]')
const ImgDogBarWrapper = document.querySelector('[data-imgDog-bar-wrapper]')

const renderPhoto = (array) => {
  const ulEl = document.createElement('ul')
  ulEl.className = 'imgList'

  array.forEach((item) => {
    const liEl = document.createElement('li')
    liEl.innerHTML = `<img src=${item} width='250px' height='250px' />`
    ulEl.appendChild(liEl)
  })

  return ulEl
}

const getTime = Math.random() * 3000 + 2000

const createPromise = (image, time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(image)
    }, time)
  })
}
const promiseCat = (time) => createPromise([cat1, cat2, cat3], time)
const promiseDog = (time) => createPromise([dog1, dog2, dog3], time)

promiseCat(getTime).then((response) => {
  console.log('Котики приехали!', response)
  imgWrapper.appendChild(renderPhoto(response))
})

promiseDog(getTime).then((response) => {
  console.log('Собачки  приехали!', response)
  imgWrapper.appendChild(renderPhoto(response))
})

// Задание 2,3
const createProgressBar = (prefix) => {
  const progressBar = document.createElement('div')
  progressBar.className = `progress-bar--${prefix}`
  return progressBar
}

const counter = (count) => {
  const counter = document.createElement('span')
  counter.className = 'counter'
  counter.textContent = `⏱️ ${count} сек`
  return counter
}

const progress = (
  time,
  promiseFn = null,
  container = progressBarContainer,
  prefix = 'default',
) => {
  let secondsPassed = 0

  // Создаем обертку для каждого прогресс-бара
  const progressWrapper = document.createElement('div')
  progressWrapper.className = 'progress-item'

  const progressBar = createProgressBar(prefix)
  const counterBar = counter(secondsPassed)

  progressWrapper.appendChild(counterBar)
  progressWrapper.appendChild(progressBar)
  container.appendChild(progressWrapper)

  // 1. Настраиваем анимацию
  progressBar.style.transition = `transform ${time}s linear`
  // Даем браузеру момент на применение стилей
  setTimeout(() => {
    progressBar.style.transform = 'scaleX(1)'
  }, 10)

  // 2. Запускаем счетчик отдельно
  const intervalId = setInterval(() => {
    secondsPassed++
    counterBar.textContent = `⏱️ Прошло: ${secondsPassed} сек`
  }, 1000)

  new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time * 1000)
  }).then(() => {
    clearInterval(intervalId)
    progressWrapper.classList.add('completed')
    counterBar.textContent = `✅ ${secondsPassed} сек`
    if (promiseFn) {
      promiseFn().then((response) =>
        container.appendChild(renderPhoto(response)),
      )
    }
  })
}

const barTime = 8
const timeCat = 4
const timeDog = 6

progress(barTime)
progress(timeCat, () => promiseCat(timeCat), ImgCatBarWrapper, 'cat')
progress(timeDog, () => promiseDog(timeDog), ImgDogBarWrapper, 'dog')
