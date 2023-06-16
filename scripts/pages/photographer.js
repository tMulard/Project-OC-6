import { displayHeader, displayLightBox, displayMedias, displayStats, handleLikes } from "../factories/medias.js";
import { closeModal, displayModal } from "../utils/contactForm.js";
import { folderName, getData, getIdFromUrl } from "../utils/data.js";


const handleFilter = (medias) => {
  const filterResult = document.querySelector(".filterResult p");
  const filters = document.querySelector(".filters");
  const allFilter = document.querySelectorAll(".filter");
  const icon = document.querySelector("#filterArrow");

  filterResult.addEventListener("click", () => {
    filters.classList.toggle("hidden"); 
    icon.classList.toggle("face_down");
  });
  
  for(let i = 0; i < allFilter.length; i++)  {
    allFilter[i].addEventListener('click', () => {
      // UI
      icon.classList.toggle("face_down");
      filters.classList.toggle("hidden");

      // récupération de la valeure + réécriture
      const value = allFilter[i].innerHTML;
      filterResult.innerHTML = value;

      // LOGIQUE D'AFFICHAGE (SORTING)
      const clickedFilter = allFilter[i].textContent
      let filteredMedias = []

      switch (clickedFilter) {
        case 'Popularité':
          filteredMedias = medias.sort((mediaA, mediaB) => {
              return mediaB.likes - mediaA.likes
          })
          break;
        case 'Date':
          filteredMedias = medias.sort((mediaA, mediaB) => {
            return new Date(mediaA.date) - new Date(mediaB.date)
          })
          break;
        default:
          filteredMedias = medias.sort((mediaA, mediaB) => {
            return mediaA.title > mediaB.title
          })
          break;
      }

      displayMedias(filteredMedias)

    });
  };
}

const init = async () => {
  // modal
  const close = document.querySelector('.close');
  const contact_button = document.querySelector('.contact_button');
  close.addEventListener('click', closeModal);
  contact_button.addEventListener('click', displayModal)

  // data
  const id = parseInt(getIdFromUrl());
  const data = await getData();
  const photographers = data.photographers;
  const allMedia = data.media;

  const photographer = photographers.find((elt) => elt.id === id);
  const medias = allMedia.filter((elt) => elt.photographerId === id);
  // on rajoute le path du media dans l'objet media
  medias.forEach(media => {
    media.path = `assets/images/${folderName(photographer.name)}/`
  });
  // sort par popularité par default
  const filteredMedias = medias.sort((mediaA, mediaB) => {
    return mediaB.likes - mediaA.likes
  })

  displayHeader(photographer);
  displayMedias(filteredMedias);
  displayStats(photographer, medias);
  handleFilter(medias);
  handleLikes()

  // lightbox
  displayLightBox(photographer, medias);
  // accesibilité

}

init();