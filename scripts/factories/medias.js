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

export const mediaFactory = (media) => {

  // vérifier si le média est une image ou une vidéo
  // afin d'afficher la bonne balise
  let mediaBalise
  if ('video' in media) {
    mediaBalise = document.createElement( 'video' );
      mediaBalise.setAttribute("src", `${media.path}${media.video}`);
  } else {
    mediaBalise = document.createElement( 'img' );
      mediaBalise.setAttribute("src", `${media.path}${media.image}`);
  }
    
    const article = document.createElement( 'article' );
    const h2 = document.createElement( 'h2' );
    h2.textContent = media.title;
    const p = document.createElement('p');
    p.textContent = media.likes;
    const like = document.createElement("i");
    like.classList.add('fas');
    like.classList.add('fa-heart');
    
    article.appendChild(mediaBalise);
  article.appendChild(h2);
  article.appendChild(p);
  article.appendChild(like);

  return article
}

export const displayHeader = (photographer) => {
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
  const mediaSection = document.querySelector(".media_section");
  
  medias.forEach((media) => {
    const mediaCardDOM = mediaFactory(media);
    mediaSection.appendChild(mediaCardDOM);
  });
}