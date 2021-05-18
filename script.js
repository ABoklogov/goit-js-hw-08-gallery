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

    let srcOriginalImage = event.target.dataset.source;
    let altOriginalImage = event.target.attributes.alt.value;
    
    onOpenModalWindowClick();

    onOpenImage(srcOriginalImage, altOriginalImage);

    buttonCloseEl.addEventListener('click', onCloseImageClick);

    overlayEl.addEventListener('click', onCloseImageClick);

    window.addEventListener('keydown', onEscapeKeydown);


    // window.addEventListener('keydown', onFlippingImagesClick);

    // function onFlippingImagesClick(event) {
        
    //     if (event.key === "ArrowLeft") {
        
    //     } else if (event.key === "ArrowRight") {
    //         galleryItems.forEach((el, i, arr) => {
                
    //             let len = arr.length;
    //             let current = arr[i].original;
    //             let previous = arr[(i+len-1)%len].original;
    //             let next = arr[(i + 1) % len].original;
                
    //             if (el.original === srcOriginalImage) {
                
    //                 onOpenImage(next);
    //                 srcOriginalImage = next;
    //             }
    //         });
    //     } 
    // }
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
};

function onEscapeKeydown(event) {
    if (event.key === "Escape") {
        onCloseImageClick()
    }
};
