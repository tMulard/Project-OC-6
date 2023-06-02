export const mediaPhotographerFactory = (data) => {
  const { name, portrait, id, city, country, tagline, price} = data;

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

  function getUserPriceDOM() {
    const salary = document.createElement( 'h2' );
    salary.textContent = price;

    return (salary);
  }

return { name, picture, getUserInfoDOM, getUserPictureDOM , getUserNameDOM, getUserPriceDOM}

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
    const textContainer = document.createElement( 'div' );
    textContainer.classList.add('textContainer');
    const h3 = document.createElement( 'h3' );
    h3.textContent = media.title;
    const likeContainer = document.createElement('div');
    likeContainer.classList.add('likeContainer');
    const p = document.createElement('p');
    p.textContent = media.likes;
    const like = document.createElement("i");
    like.classList.add('fas');
    like.classList.add('fa-heart');
    
    article.appendChild(mediaBalise);
    textContainer.appendChild(h3);
    likeContainer.appendChild(p);
    likeContainer.appendChild(like);
    textContainer.appendChild(likeContainer);
    article.appendChild(textContainer);

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
  mediaSection.innerHTML = ''
  
  medias.forEach((media) => {
    const mediaCardDOM = mediaFactory(media);
    mediaSection.appendChild(mediaCardDOM);
  });
}

export const displayStats = (photographer, medias) => {

  let totalLikes = 0;

  medias.forEach((media) => {
    totalLikes += media.likes;
  });

  const likeContainer = document.createElement('div');
    likeContainer.classList.add('likeContainer');
  const total = document.createElement('p');
    total.textContent = totalLikes;
  const likeIcon = document.createElement("i");
    likeIcon.classList.add('fas');
    likeIcon.classList.add('fa-heart');

  const photographModel = mediaPhotographerFactory(photographer);
  const photographerSalary = document.createElement('p');
        photographerSalary.classList.add('salary');
        photographerSalary.textContent = photographModel.getUserPriceDOM().innerText + `€ / jour`;

  const statSection = document.querySelector(".statistics");
    statSection.innerHTML = ''

  likeContainer.appendChild(total)
  likeContainer.appendChild(likeIcon)
  statSection.appendChild(likeContainer)
  statSection.appendChild(photographerSalary)

}