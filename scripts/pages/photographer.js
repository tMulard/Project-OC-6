//Mettre le code JavaScript lié à la page photographer.html
import { closeModal, displayModal } from "../utils/contactForm.js";
import { getIdFromUrl } from "../utils/data.js";


const init = async () => {
  // modal
  const close = document.querySelector('.close');
  const contact_button = document.querySelector('.contact_button');
  close.addEventListener('click', closeModal);
  contact_button.addEventListener('click', displayModal)


  // data
  const id = getIdFromUrl()

  // récupérer les data
  
  // trouver les medias qui on comme photographerId == id

  // tout afficher :p (dans factories)

}


init();