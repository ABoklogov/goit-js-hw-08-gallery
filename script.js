import galleryItems from './gallery-items.js';

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