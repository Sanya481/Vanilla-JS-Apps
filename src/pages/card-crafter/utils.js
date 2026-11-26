const formatCardNumber = (value) => {
  return value
    .replace(/\D/g, '') // Удалить всё, кроме цифр
    .replace(/(\d{4})/g, '$1-') // Добавить разделитель
    .slice(0, 19) // Ограничить длину
}

export default formatCardNumber
