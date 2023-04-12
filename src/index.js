import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApiServices from './getImage';

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector('.load-more');
const elements = document.querySelectorAll('.photo-card');

const lightbox = new SimpleLightbox(".gallery a", {});
const newsApiServices = new NewsApiServices();
let currentQuantity = newsApiServices.quantity;

form.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMoreBtn);

function onSearch(e) {
  e.preventDefault();
  getQuery(e);

  try {
    fetchData();
  }
  catch (error) {
    console.log(error);
    Notiflix.Notify.failure("Oops, something went wrong...");
  }
}

function createImagesMarkup(images) {
  return images
    .map(({ webformatURL, largeImageURL, likes, views, comments, downloads, tags }) => {
      return `
        <div class="photo-card">
          <div class="thumb">
            <a class="image" href="${webformatURL}">
            <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
            </a>
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b> ${downloads}
            </p>
          </div>
        </div>
      `;
    })
    .join("");
  
}

function addImagesToGallery(markup) {
  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}