export const mediaFactory = (data) => {
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
    const name = document.createElement( 'h2' );
    name.textContent = name;

    return (name);
  }
return { name, picture, getUserInfoDOM, getUserPictureDOM, getUserNameDOM }

}

export const displayHeader = (photographer) => {
  // console.log(photographer);
  const infoHeaderSection = document.querySelector(".photographer_info");
  const imgHeaderSection = document.querySelector(".photographer_picture");
  const nameModal = document.querySelector(".namePhotographer");
  
  const photographModel = mediaFactory(photographer);
  const userInfoDOM = photographModel.getUserInfoDOM();
  const userPictureDOM = photographModel.getUserPictureDOM();
  const userNameDOM = photographerModel.getUserNameDOM();

  infoHeaderSection.appendChild(userInfoDOM);
  imgHeaderSection.appendChild(userPictureDOM);
  nameModal.appendChild(userNameDOM);
}

export const displayMedias = (medias) => {
  // console.log(medias);
}