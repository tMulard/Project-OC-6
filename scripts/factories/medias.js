import { getData } from "../utils/data.js";

export const mediaPhotographerFactory = (data) => {
  const { name, portrait, id, city, country, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserInfoDOM() {
    const article = document.createElement( 'article' );
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;
    const tag = document.createElement('p');
    tag.textContent = tagline;

    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(tag);
    
    return (article);
  }
  function getUserPictureDOM() {
    const img = document.createElement( 'img' );
    img.setAttribute("src", picture);

    return (img);
  }
  function getUserNameDOM() {
    const nameElement = document.createElement( 'h2' );
    nameElement.textContent = name;

    return (nameElement);
  }


return { name, picture, getUserInfoDOM, getUserPictureDOM , getUserNameDOM}

}

export const mediaFactory = (data) => {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const getPhotographerFirstNameDOM = async (photographerId) => {
    const data = await getData();
    const photographers = data.photographers;
    const photographer = photographers.find((elt) => elt.id === photographerId);
    var namePhotographer = photographer.name;
    var lastIndex = namePhotographer.lastIndexOf(" ");

    namePhotographer = namePhotographer.substring(0, lastIndex);

    return (namePhotographer);
  }

  const imageDisplay = `assets/images/${getPhotographerFirstNameDOM(photographerId)}/${image}`;
  const videoDisplay = `assets/images/${getPhotographerFirstNameDOM(photographerId)}/${video}`;

  function getMediaDOM() {
    const article = document.createElement( 'article' );
    const img = document.createElement( 'img' );
        img.setAttribute("src", imageDisplay);
    // const vid = document.createElement( 'video' );
    //     vid.setAttribute("src", videoDisplay);
    const h2 = document.createElement( 'h2' );
        h2.textContent = title;
    const like = document.createElement("i");
      like.classList.add('fas fa-heart');

    article.appendChild(img);
    // article.appendChild(vid);
    article.appendChild(h2);
    article.appendChild(like);

    return (article);
  }


  return { id, title, getMediaDOM}
}

export const displayHeader = (photographer) => {
  // console.log(photographer);
  const infoHeaderSection = document.querySelector(".photographer_info");
  const imgHeaderSection = document.querySelector(".photographer_picture");
  const nameModal = document.querySelector(".namePhotographer");
  
  const photographModel = mediaPhotographerFactory(photographer);
  const userInfoDOM = photographModel.getUserInfoDOM();
  const userPictureDOM = photographModel.getUserPictureDOM();
  const userNameDOM = photographModel.getUserNameDOM();

  infoHeaderSection.appendChild(userInfoDOM);
  imgHeaderSection.appendChild(userPictureDOM);
  nameModal.appendChild(userNameDOM);
}

export const displayMedias = (medias) => {
  // console.log(medias);
  const mediaSection = document.querySelector(".media_section");

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}