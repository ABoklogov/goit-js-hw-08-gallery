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

    //---------------------------------------------------------
    // let srcNextOriginalImage = event.target.parentNode.parentNode.nextSibling.firstChild.firstChild.dataset.source;
    // let altNextOriginalImage = event.target.parentNode.parentNode.nextSibling.firstChild.firstChild.attributes.alt.value;
    // console.log(srcNextOriginalImage);
    // console.log(altNextOriginalImage);
    //----------------------------------------------------------

    onOpenModalWindowClick();

    onOpenImage(srcOriginalImage, altOriginalImage);

    buttonCloseEl.addEventListener('click', onCloseImageClick);

    overlayEl.addEventListener('click', onOverlayClick);

    window.addEventListener('keydown', event => {
        if (event.key === "Escape") {
            modalWindowEl.classList.remove('is-open')
        }
    });


    // window.addEventListener('keydown', onFlippingImagesClick);

    // function onFlippingImagesClick(event) {
    //     if (event.key === "ArrowLeft") {
        
    //     } else if (event.key === "ArrowRight") {
    //         onOpenImage(srcNextOriginalImage, altNextOriginalImage); 
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




