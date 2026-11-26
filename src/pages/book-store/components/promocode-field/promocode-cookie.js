export const getCookie = () => {
  return document.cookie.split('; ').reduce((acc, item) => {
    const [name, value] = item.split('=')
    acc[name] = value
    return acc
  }, {})
}

export const setCookie = (name, value, days = 30) => {
  // 1. Создаем объект Date для установки срока жизни
  const date = new Date()
  // 2. Устанавливаем дату истечения (текущее время + days дней)
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  // 3. Преобразуем дату в строку для куки
  const expires = `expires=${date.toString()}`
  // 4. Формируем полную строку куки
  document.cookie = `${name}=${value}; ${expires}; path=/`
}

/*
* 📖 Пошаговое объяснение:
new Date() - создаем объект текущей даты
date.setTime() - устанавливаем новое время
date.getTime() + days * 24 * 60 * 60 * 1000:
date.getTime() - текущее время в миллисекундах
days * 24 * 60 * 60 * 1000 - переводим дни в миллисекунды
24 часа × 60 минут × 60 секунд × 1000 миллисекунд
toUTCString() - преобразуем дату в формат для куки
path=/ - делаем куки доступными на всех страницах сайта
*/

export const removeCookie = (name) => {
  const expires = 'expires=Thu, 01 Jan 1970 00:00:00 GMT'

  document.cokie = `${name}=; ${expires}; path=/`
}
