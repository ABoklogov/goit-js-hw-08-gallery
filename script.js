import galleryItems from './gallery-items.js';

const galleryEl = document.querySelector('.gallery');
const modalWindowEl = document.querySelector('.lightbox');
const imageOriginalEl = document.querySelector('.lightbox__image');
const buttonCloseEl = document.querySelector('[data-action="close-lightbox"]');
const overlayEl = document.querySelector('.lightbox__overlay');

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

galleryEl.addEventListener('click', onGalleryElClick);

function onGalleryElClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") return;

    const srcOriginalImage = event.target.dataset.source;
    const altOriginalImage = event.target.attributes.alt.value;
    // const nextOriginalImage = imageOriginalEl.parentNode.nextSibling.childNodes;
    // console.dir(nextOriginalImage);

    onOpenModalWindowClick();

    onOpenImage(srcOriginalImage, altOriginalImage);

    buttonCloseEl.addEventListener('click', onCloseImageClick);

    overlayEl.addEventListener('click', onOverlayClick);

    window.addEventListener('keydown', event => {
        if (event.key === "Escape") {
            modalWindowEl.classList.remove('is-open')
        }
    });

//     window.addEventListener('keydown', onFlippingImagesClick);

//     function onFlippingImagesClick(event) {
//     if (event.key === "ArrowLeft") {
//     console.log(event)
//     } else if (event.key === "ArrowRight") {
//     //    console.log(imageOriginalEl.nextSibling.event); 
//     } 
// }
};

function onOpenModalWindowClick() {
    modalWindowEl.classList.add('is-open');
    imageOriginalEl.attributes.src.value = '';
};

function onOpenImage(src, alt) {
    imageOriginalEl.attributes.src.value = src;
    imageOriginalEl.attributes.alt.value = alt;
};

function onCloseImageClick() {
    modalWindowEl.classList.remove('is-open');
};

function onOverlayClick(event) {
    if (event.target) {
        onCloseImageClick()
    };
};




