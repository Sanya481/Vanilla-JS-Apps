// Функция для добавления стилей
export function addCloudPopupStyles() {
  if (document.getElementById('cloud-popup-styles')) return;
  
  const styles = `
    .cloudPopup {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      opacity: 0;
      transform: translateX(100px) rotate(5deg);
      transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .cloudPopupActive {
      opacity: 1;
      transform: translateX(0) rotate(0deg);
    }
    
    .cloudPopupClosing {
      animation: popupBlowAway 1.2s ease-in-out forwards !important;
    }
    
    .cloudPopup__content {
      position: relative;
      animation: cloudFloat 4s ease-in-out infinite;
    }
    
    .cloudPopup__cloud {
      position: relative;
      filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
    }
    
    .cloudPopup__cloud-body {
      background: linear-gradient(145deg, #667eea 0%, #764ba2 100%);
      border-radius: 30px;
      padding: 25px;
      width: 265px;
      position: relative;
      z-index: 2;
      box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
    }
    
    .cloudPopup__cloud-tail {
      position: absolute;
      bottom: -15px;
      right: 30px;
      width: 40px;
      height: 30px;
      background: linear-gradient(145deg, #5a67d8 0%, #6b46c1 100%);
      border-radius: 0 0 20px 20px;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%);
      z-index: 1;
    }
    
    .cloudPopup__icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 15px;
      filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
      animation: iconBounce 2s ease-in-out infinite;
    }
    
    .cloudPopup__title {
      font-family: 'Comic Sans MS', cursive, sans-serif;
      font-size: 18px;
      color: white;
      margin-bottom: 12px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      line-height: 1.3;
    }
    
    .cloudPopup__text {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      line-height: 1.4;
      margin-bottom: 20px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
    
    .cloudPopup__button {
      background: linear-gradient(45deg, #ff6b6b, #ee5a24);
      color: white;
      border: none;
      padding: 12px 30px;
      font-size: 16px;
      font-weight: bold;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(238, 90, 36, 0.4);
      font-family: 'Comic Sans MS', cursive, sans-serif;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .cloudPopup__button:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 8px 20px rgba(238, 90, 36, 0.6);
    }
    
    .cloudPopup__close {
      position: absolute;
      top: -10px;
      right: -10px;
      background: #ff4757;
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
      font-size: 18px;
      transition: all 0.3s ease;
      z-index: 3;
      box-shadow: 0 3px 10px rgba(255, 71, 87, 0.4);
    }
    
    .cloudPopup__close:hover {
      transform: rotate(90deg) scale(1.1);
      background: #ff3742;
    }
    
    @keyframes cloudFloat {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      25% {
        transform: translateY(-5px) rotate(-1deg);
      }
      50% {
        transform: translateY(0) rotate(0deg);
      }
      75% {
        transform: translateY(-3px) rotate(1deg);
      }
    }
    
    @keyframes iconBounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
    
    @keyframes popupBlowAway {
      0% {
        opacity: 1;
        transform: translateX(0) rotate(0deg);
      }
      30% {
        opacity: 0.8;
        transform: translateX(-20px) rotate(-5deg) scale(0.95);
      }
      60% {
        opacity: 0.5;
        transform: translateX(-50px) rotate(-10deg) scale(0.9);
      }
      100% {
        opacity: 0;
        transform: translateX(200px) rotate(-20deg) scale(0.8);
        display: none;
      }
    }
    
    /* Адаптивность */
    @media (max-width: 768px) {
      .cloudPopup {
        top: 10px;
        right: 10px;
        left: 10px;
        transform: translateY(-100px);
      }
      
      .cloudPopupActive {
        transform: translateY(0);
      }
      
      .cloudPopup__cloud-body {
        min-width: auto;
        padding: 20px;
      }
      
      .cloudPopup__title {
        font-size: 16px;
      }
      
      .cloudPopup__text {
        font-size: 13px;
      }
      
      .cloudPopup__button {
        padding: 10px 25px;
        font-size: 14px;
      }
    }
    
    @media (max-width: 480px) {
      .cloudPopup {
        top: 5px;
        right: 5px;
        left: 5px;
      }
      
      .cloudPopup__cloud-body {
        padding: 15px;
        border-radius: 20px;
      }
      
      .cloudPopup__icon {
        width: 50px;
        height: 50px;
      }
      
      .cloudPopup__title {
        font-size: 15px;
      }
      
      .cloudPopup__button {
        padding: 8px 20px;
        font-size: 13px;
      }
    }
  `;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'cloud-popup-styles';
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export const giftArr = [
  {
    title: 'Скидка 20% на первую покупку в нашем магазине!',
    icon: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="28" fill="#FF6B6B" stroke="#EE5A24" stroke-width="2"/>
      <text x="30" y="38" text-anchor="middle" fill="white" font-size="16" font-weight="bold">20%</text>
      <path d="M15 15L45 45" stroke="#EE5A24" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    description: 'Отличный старт для новых читателей! Выберите любую книгу и получите скидку 20% на первый заказ.'
  },
  {
    title: 'Скидка 10% на всё!',
    icon: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <rect x="5" y="5" width="50" height="50" rx="10" fill="#667eea" stroke="#764ba2" stroke-width="2"/>
      <text x="30" y="38" text-anchor="middle" fill="white" font-size="18" font-weight="bold">10%</text>
      <circle cx="30" cy="30" r="20" fill="none" stroke="#764ba2" stroke-width="2" stroke-dasharray="5,3"/>
    </svg>`,
    description: 'Не упустите возможность сэкономить! Действует на все книги, включая новинки и бестселлеры.'
  },
  {
    title: 'Подарок при первой покупке в нашем магазине!',
    icon: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path d="M30 10L40 25L55 30L40 35L30 50L20 35L5 30L20 25L30 10Z" fill="#FFD93D" stroke="#FF9F1C" stroke-width="2"/>
      <circle cx="30" cy="30" r="8" fill="#FF6B6B"/>
      <path d="M25 25L35 35M35 25L25 35" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    description: 'К каждой первой покупке дарим стильный книжный аксессуар на выбор: закладку или обложку для книги.'
  },
  {
    title: 'Бесплатная доставка для вас!',
    icon: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path d="M10 40H50V25H10V40Z" fill="#4ECDC4" stroke="#1A535C" stroke-width="2"/>
      <circle cx="20" cy="45" r="5" fill="#1A535C"/>
      <circle cx="40" cy="45" r="5" fill="#1A535C"/>
      <path d="M15 25V15H35L45 25" stroke="#1A535C" stroke-width="2" fill="#FFE66D"/>
      <path d="M35 15V25H45" stroke="#1A535C" stroke-width="2"/>
      <path d="M20 30H40" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    description: 'Заказывайте книги без ограничений по сумме - доставим бесплатно в любой уголок города!'
  },
  {
    title: '📚 Особый день книголюбов!',
    icon: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <path d="M15 15H45V45H15V15Z" rx="5" fill="#9b59b6" stroke="#8e44ad" stroke-width="2"/>
      <path d="M25 20V40M35 20V40" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <path d="M20 25H40M20 35H40" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <circle cx="30" cy="30" r="15" fill="none" stroke="#FFEAA7" stroke-width="2" stroke-dasharray="4,4"/>
      <text x="30" y="48" text-anchor="middle" fill="white" font-size="10" font-weight="bold">SALE</text>
    </svg>`,
    description: 'Особый день для книголюбов! Скидки до 30% на отдельные категории литературы.'
  }
];