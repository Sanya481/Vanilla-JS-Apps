import './gallery-modal';
import './styles/main.scss'
import '@scss/main.scss'

if (document.querySelector('[data-gallery-list]')) {
  const galleryList = document.querySelector('[data-gallery-list]')

  const galleryModal = document.querySelector('[data-gallery-modal]')
  const galleryModalContent = galleryModal.querySelector(
    '[data-gallery-modal-content]',
  )

  const onEscKeyPress = (evt) => {
    if (evt.key === 'Escape') {
      galleryModal.setAttribute('aria-hidden', true)
      document.body.style.overflow = ''
      galleryModal.querySelector('[data-modal-image]').src = ''
    }
  }

  const onCloseModalGallery = (evt) => {
    const isCloseBtn = evt.target.closest('[data-gallery-modal-close]')
    const isOutsideClick = !galleryModalContent.contains(evt.target)
    if (isCloseBtn || isOutsideClick) {
      galleryModal.setAttribute('aria-hidden', true)
      document.body.style.overflow = ''
      galleryModal.querySelector('[data-modal-image]').src = ''

      document.removeEventListener('click', onCloseModalGallery)
      document.removeEventListener('keydown', onEscKeyPress)
    }
  }

  const openModalGallery = (srcPath) => {
    galleryModal.setAttribute('aria-hidden', false)
    document.body.style.overflow = 'hidden'
    galleryModal.querySelector('[data-modal-image]').src = srcPath

    document.addEventListener('click', onCloseModalGallery)
    document.addEventListener('keydown', onEscKeyPress)
  }

  const onClickPhoto = (evt) => {
    evt.stopPropagation()
    const photo = evt.target.closest('.gallery-card')
    if (photo) {
      const imgSrc = photo.querySelector('img').src
      openModalGallery(imgSrc)      
    }
  }

  galleryList.addEventListener('click', onClickPhoto)
}
