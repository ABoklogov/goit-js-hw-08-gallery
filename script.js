import galleryItems from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');
const modalWindowEl = document.querySelector('.lightbox');
const imageOriginalEl = document.querySelector('.lightbox__image');
const buttonCloseEl = document.querySelector('[data-action="close-lightbox"]');
const overlayEl = document.querySelector('.lightbox__overlay');
let indexImage;

const newGallery = galleryItems.map((element, index) => {
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
    imgEl.setAttribute('data-index', index);

    linkEl.appendChild(imgEl);
    itemEl.appendChild(linkEl);

    return itemEl
});

galleryEl.append(...newGallery);

galleryEl.addEventListener('click', onGalleryElClick);

function onGalleryElClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") return;

    indexImage = Number(event.target.dataset.index);
    const srcOriginalImage = event.target.dataset.source;
    const altOriginalImage = event.target.attributes.alt.value;
    
    onOpenModalWindowClick();

    onOpenImage(srcOriginalImage, altOriginalImage);

    buttonCloseEl.addEventListener('click', onCloseImageClick);

    overlayEl.addEventListener('click', onCloseImageClick);

    window.addEventListener('keydown', onEscapeKeydown);

    window.addEventListener('keydown', onFlippingImagesClick);
};

function onOpenModalWindowClick() {
    modalWindowEl.classList.add('is-open');
};

function onOpenImage(src, alt) {
    imageOriginalEl.attributes.src.value = src;
    imageOriginalEl.attributes.alt.value = alt;
};

function onCloseImageClick() {
    modalWindowEl.classList.remove('is-open');
    imageOriginalEl.attributes.src.value = '';

    buttonCloseEl.removeEventListener('click', onCloseImageClick);
    overlayEl.removeEventListener('click', onCloseImageClick);
    window.removeEventListener('keydown', onEscapeKeydown);
    window.removeEventListener('keydown', onFlippingImagesClick);
};

function onEscapeKeydown(event) {
    if (event.key === "Escape") {
        onCloseImageClick()
    }
};

function onFlippingImagesClick(event) {
        
    if (event.key === "ArrowLeft") {
        indexImage = indexImage > 0 ? indexImage -= 1 : galleryItems.length - 1;
    } else if (event.key === "ArrowRight") {
        indexImage = indexImage < galleryItems.length - 1 ? indexImage += 1 : 0;
    } else { return };

    onOpenImage(galleryItems[indexImage].original, galleryItems[indexImage].description);
};