import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);


const gallery = document.querySelector(".gallery");
const partOfMarking = marking(galleryItems);

gallery.insertAdjacentHTML("beforeend", partOfMarking);
let lightbox = new SimpleLightbox(".gallery a", {
  captionSelector: "img",
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});

function marking(part) {
  return part
    .map(({ preview, original, description }) => {
      return `
      
      <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
      </a>
      
  `;
    })
    .join("");
};