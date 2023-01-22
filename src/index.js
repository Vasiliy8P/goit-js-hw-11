import './css/styles.css';
import Notiflix from 'notiflix';
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
            // if (.length === images.totalHits) {
            //     btnLoadMoreIsHidden();
            //     Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");
            // } else {
                btnLoadMoreRemoveIsHidden();
            // }
        }          
    });    
};

console.log("photoCardAll", photoCardAll)

function onBtnLoadMoreClick() {
    apiService.fetchImages().then(images => {
        renderImage(images.hits);

        // if (.length === images.totalHits) {            
        //     btnLoadMoreIsHidden();
        //     Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");
        // }
        
    });
}

function renderImage(images) {
    // if (images.length === 0) {
    //     btnLoadMoreIsHidden();
    //     Notiflix.Notify.success("Sorry, there are no images matching your search query. Please try again.")
    //     return
    // } 
    const markupImageCard = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        `<div class="photo-card">
            <div class="thumb">
                <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
            </div>
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
}

function btnLoadMoreIsHidden() {
    btnLoadMoreEl.classList.add("is-hidden");
}

function btnLoadMoreRemoveIsHidden() {
    btnLoadMoreEl.classList.remove("is-hidden");
}

