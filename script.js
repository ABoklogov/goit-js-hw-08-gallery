import galleryItems from './gallery-items.js';

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const galleryEl = document.querySelector('.gallery');

const newGallery = galleryItems.map(element => {
    const itemEl = document.createElement('li');
    itemEl.classList.add('gallery__item');

    const linkEl = document.createElement('a');
    linkEl.classList.add('gallery__link');
    linkEl.setAttribute('href', `${element.original}`);

    const imgEl = document.createElement('img');
    imgEl.classList.add('gallery__image');
    imgEl.setAttribute('src', `${element.preview}`);
    imgEl.setAttribute('data-source', `${element.original}`);
    imgEl.setAttribute('alt', `${element.description}`);

    linkEl.appendChild(imgEl);
    itemEl.appendChild(linkEl);

    return itemEl
});

galleryEl.append(...newGallery);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
const ModalWindowEl = document.querySelector('.lightbox');
// console.log(ModalWindowEl);
galleryEl.addEventListener('click', onGalleryElClick);

function onGalleryElClick(event) {
    event.preventDefault();

    const imageEl = event.target;
    console.dir(imageEl);

    // if (target.nodeName !== "A") return;
    // imageEl.addEventListener('click', onOpenModalWindowClick);
    
    onOpenModalWindowClick()
}
function onOpenModalWindowClick() {
        ModalWindowEl.classList.add('is-open');
    }

// function setActiveLink(nextActiveLink) {
//   const currentActiveLink = nav.querySelector("a.active");

//   if (currentActiveLink) {
//     currentActiveLink.classList.remove("active");
//   }

//   nextActiveLink.classList.add("active");
// }