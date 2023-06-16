export const mediaPhotographerFactory = (data) => {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserInfoDOM() {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h3 = document.createElement("h3");
    h3.textContent = `${city}, ${country}`;
    const tag = document.createElement("p");
    tag.textContent = tagline;

    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(tag);

    return article;
  }
  function getUserPictureDOM() {
    const img = document.createElement("img");
    img.setAttribute("src", picture);

    return img;
  }
  function getUserNameDOM() {
    const nameElement = document.createElement("h2");
    nameElement.textContent = name;

    return nameElement;
  }

  function getUserPriceDOM() {
    const salary = document.createElement("h2");
    salary.textContent = price;

    return salary;
  }

  return {
    name,
    picture,
    getUserInfoDOM,
    getUserPictureDOM,
    getUserNameDOM,
    getUserPriceDOM,
  };
};

export const mediaFactory = (media) => {
  // vérifier si le média est une image ou une vidéo
  // afin d'afficher la bonne balise
  let mediaBalise;
  if ("video" in media) {
    mediaBalise = document.createElement("video");
    mediaBalise.controls = true;
    const mediaSource = document.createElement("source");
    mediaSource.setAttribute("src", `${media.path}${media.video}`);
    mediaBalise.appendChild(mediaSource);
    mediaBalise.setAttribute("alt", `${media.title}`);
  } else {
    mediaBalise = document.createElement("img");
    mediaBalise.setAttribute("src", `${media.path}${media.image}`);
    mediaBalise.setAttribute("alt", `${media.title}`);
  }

  const article = document.createElement("article");
  const textContainer = document.createElement("div");
  textContainer.classList.add("textContainer");
  const h3 = document.createElement("h3");
  h3.textContent = media.title;

  const likeContainer = document.createElement("div");
  likeContainer.classList.add("likeContainer");
  const p = document.createElement("p");
  p.textContent = media.likes;
  const like = document.createElement("i");
  like.classList.add("fa");
  like.classList.add("fa-heart-o");

  article.appendChild(mediaBalise);
  textContainer.appendChild(h3);
  likeContainer.appendChild(p);
  likeContainer.appendChild(like);
  textContainer.appendChild(likeContainer);
  article.appendChild(textContainer);

  return article;
};

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
};

export const displayMedias = (medias) => {
  const mediaSection = document.querySelector(".media_section");
  mediaSection.innerHTML = "";

  medias.forEach((media) => {
    const mediaCardDOM = mediaFactory(media);
    mediaSection.appendChild(mediaCardDOM);
  });
};

export const displayLightBox = (photographer, media) => {
  class LightBox {
    static init() {
      const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'))
      const gallery = links.map(link => link.getAttribute('href'))  
      links.forEach((link) =>
          link.addEventListener("click", (e) => {
            e.preventDefault();
            new LightBox(e.currentTarget.getAttribute("href"), gallery);
          })
        );
    }
    
        constructor (url, images) {
          this.element = this.buildDOM(url)
          this.images = images
          this.loadImage(url)
          document.body.appendChild(this.element)
          disableScroll(this.element)
          document.addEventListener('keyup', this.onKeyUp)
        }
    
    loadImage(url) {
      this.url = null
      const img = new Image();
      const container = this.element.querySelector('lightBoxImage')
      const loader = document.createElement('div')
      loader.classList.add('lightBoxLoader')
      container.appendChild(loader);
      
      img.onload = function () {
        container.removeChild(loader)
        container.appendChild(image)
        this.url = url
      }
      img.src = url
    }

    onKeyUp (e) {
      if (e.key === 'Escape') {this.close(e)} 
      if (e.key === 'ArrowLeft') {this.prev(e)}
      if (e.key === 'ArrowRight') {this.next(e)}
    }

    close (e) {
      e.preventDefault()
      this.element.classList.add('fade')
      enableBodyScroll(this.element)
      window.setTimeout(() => {
        this.element.parentElement.removeChild(this.element)
      }, 500)
    }

    next (e) {
      e.preventDefault()
      let i = this.images.findIndex(image => image === this.url)
      this.loadImage(this.images[i + 1])
    }
    
    prev (e) {
      e.preventDefault()
      let i = this.images.findIndex(image => image === this.url)
      if (i === 0) {i = this.images.length}
      this.loadImage(this.images[i - 1])
    }

    buildDOM (url) {
      const container = document.createElement('div')
      container.classList.add('lightBox')

      const btnClose = document.createElement('button')
      btnClose.classList.add('lightBoxClose')

      const btnNext = document.createElement('button')
      btnNext.classList.add('lightBoxNext')

      const btnPrev = document.createElement('button')
      btnPrev.classList.add('lightBoxPrev')
      
      const imageContainer = document.createElement('div')
      imageContainer.classList.add('lightBoxImage')


      let mediaBalise;
      if ("video" in media) {
        mediaBalise = document.createElement("video");
        mediaBalise.controls = true;
        const mediaSource = document.createElement("source");
        mediaSource.setAttribute("src", `${media.path}${media.video}`);
        mediaBalise.appendChild(mediaSource);
        mediaBalise.setAttribute("alt", `${media.title}`);
      } else {
        mediaBalise = document.createElement("img");
        mediaBalise.setAttribute("src", `${media.path}${media.image}`);
        mediaBalise.setAttribute("alt", `${media.title}`);
      }
      
      const title = document.createElement('h2')
      title.classList.add('lightBoxMediaTitle')
      title.innerText = media.title


      container.appendChild(btnClose);
      container.appendChild(btnNext);
      container.appendChild(btnPrev);
      imageContainer.appendChild(img);
      container.appendChild(imageContainer);
      container.appendChild(title);

      container.querySelector('lightBoxClose').addEventListener('click', this.close.bind(this))
      container.querySelector('lightBoxNext').addEventListener('click', this.next.bind(this))
      container.querySelector('lightBoxPrev').addEventListener('click', this.prev.bind(this))


      return container
    }

  }
};

export const displayStats = (photographer, medias) => {
  let totalLikes = 0;

  medias.forEach((media) => {
    totalLikes += media.likes;
  });

  const likeContainer = document.createElement("div");
  likeContainer.classList.add("likeContainer");
  const total = document.createElement("p");
  total.classList.add("totalLikes");
  total.textContent = totalLikes;
  const likeIcon = document.createElement("i");
  likeIcon.classList.add("fas");
  likeIcon.classList.add("fa-heart");

  const photographModel = mediaPhotographerFactory(photographer);
  const photographerSalary = document.createElement("p");
  photographerSalary.classList.add("salary");
  photographerSalary.textContent =
    photographModel.getUserPriceDOM().innerText + `€ / jour`;

  const statSection = document.querySelector(".statistics");
  statSection.innerHTML = "";

  likeContainer.appendChild(total);
  likeContainer.appendChild(likeIcon);
  statSection.appendChild(likeContainer);
  statSection.appendChild(photographerSalary);
};

export const handleLikes = () => {
  const likeContainers = document.querySelectorAll(".likeContainer");
  const totalLikes = document.querySelector(".totalLikes");

  likeContainers.forEach((container) => {
    container.addEventListener("click", () => {
      const p = container.querySelector("p");
      const heart = container.querySelector(".fa");

      if (heart.classList.contains("fa-heart-o")) {
        totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1;
        p.innerHTML = parseInt(p.innerHTML) + 1;
        heart.classList.remove("fa-heart-o");
        heart.classList.add("fa-heart");
      } else {
        totalLikes.innerHTML = parseInt(totalLikes.innerHTML) - 1;
        p.innerHTML = parseInt(p.innerHTML) - 1;
        heart.classList.remove("fa-heart");
        heart.classList.add("fa-heart-o");
      }
    });
  });
};
