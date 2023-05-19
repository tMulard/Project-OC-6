import { displayHeader, displayMedias } from "../factories/medias.js";
import { closeModal, displayModal } from "../utils/contactForm.js";
import { getData, getIdFromUrl } from "../utils/data.js";


const handleFilter = () => {
  const filterResult = document.querySelector(".filterResult");
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
      // récupération de la valeure
      const value = allFilter[i].innerHTML;
      // refermer les filtres
      filters.classList.toggle("hidden");
      // réécrire dans filterResult
      filterResult.innerHTML = value;

      // LOGIQUE D'AFFICHAGE
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

  displayHeader(photographer);
  displayMedias(medias);
  handleFilter();

  // likes
  // select
}

init();