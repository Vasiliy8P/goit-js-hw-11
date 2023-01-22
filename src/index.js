import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import ApiService from './api-service';
    
const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const btnLoadMoreEl = document.querySelector('.load-more');

const apiService = new ApiService();

btnLoadMoreIsHidden()

formEl.addEventListener('submit', onFormSubmit);
btnLoadMoreEl.addEventListener('click', onBtnLoadMoreClick)

function onFormSubmit(evt) { 
    evt.preventDefault();
    btnLoadMoreIsHidden()
    galleryEl.innerHTML = "";
    apiService.query = evt.currentTarget.elements.searchQuery.value.trim();
    apiService.page = 1;
    apiService.fetchImages().then(images => {
        if (images.hits.length === 0) {
            btnLoadMoreIsHidden();
            Notiflix.Notify.success("Sorry, there are no images matching your search query. Please try again.")
        } else {
            renderImage(images.hits);
            Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`)

            if (galleryEl.children.length === images.totalHits) {
                btnLoadMoreIsHidden();
                Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");
            } else {
                btnLoadMoreRemoveIsHidden();
            }
        }          
    });    
};

function onBtnLoadMoreClick() {
    apiService.fetchImages().then(images => {
        renderImage(images.hits);

        if (galleryEl.children.length === images.totalHits) {            
            btnLoadMoreIsHidden();
            Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");
        }

        const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();

        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
        });
    });
}

function renderImage(images) {
    const markupImageCard = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        `<div class="photo-card">
            <a class="thumb" href="${largeImageURL}">
                <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy">
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    <span>${likes}</span>
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <span>${views}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <span>${comments}</span>
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    <span>${downloads}</span>
                </p>
            </div>
        </div>`).join('');

    galleryEl.insertAdjacentHTML("beforeend", markupImageCard);

    const gallery = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });
    gallery.refresh()
}

function btnLoadMoreIsHidden() {
    btnLoadMoreEl.classList.add("is-hidden");
}

function btnLoadMoreRemoveIsHidden() {
    btnLoadMoreEl.classList.remove("is-hidden");
}
