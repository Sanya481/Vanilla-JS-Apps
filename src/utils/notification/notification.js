import './_notification.scss';

export const showNotification = (text) => {
  // Создаем уведомление
  const notification = document.createElement('div')
  notification.className = 'notification show'

  notification.innerHTML = `  
    <div class="notification-content">
      <span class="notification-message">${text}</span>
      <button class="notification-close" data-notification-close>&times;</button>
    </div>  
  `
  // Добавляем в body
  document.body.appendChild(notification)

  // Закрытие по крестику
  notification
    .querySelector('[data-notification-close]')
    .addEventListener('click', () => {
      notification.classList.add('hiding')
      setTimeout(() => notification.remove(), 300)
    })

  setTimeout(() => {
    notification.classList.add('hiding')
    setTimeout(() => notification.remove(), 300)
  }, 5000)
}
