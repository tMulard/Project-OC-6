import { displayHeader, displayMedias } from "../factories/medias.js";
import { closeModal, displayModal } from "../utils/contactForm.js";
import { getData, getIdFromUrl } from "../utils/data.js";


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

  // likes
  // select
}


init();