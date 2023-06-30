export class LightBox {
  static init() {
    const links = Array.from(
      document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
    );
    const gallery = links.map((link) => link.getAttribute("href"));
              
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const url = e.currentTarget.getAttribute("href");
        const mediaTitle = e.currentTarget.getAttribute("alt");

        new LightBox(gallery, url, mediaTitle);
      })
    );
  }

  constructor(gallery, url, mediaTitle) {
    this.gallery = gallery;
    this.url = url;
    this.mediaTitle = mediaTitle;
    this.element = this.buildDOM(url, mediaTitle);
    this.element.addEventListener("click", this.loadMedia(url, mediaTitle));
    document.body.appendChild(this.element);
    // disableScroll(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }
  ///// CHARGEMENT DE L'IMAGE/LA VIDEO
  loadMedia(url, mediaTitle) {
    this.url = null;
    const container = this.element.querySelector(".lightBoxImage");
    const loader = document.createElement("div");
    loader.classList.add("lightBoxLoader");
    container.appendChild(loader);
    if (url.search(".jpg")) { 
      const img = document.createElement("img");
      img.onload = loadImg();
      function loadImg() {
        container.removeChild(loader);
        // this.url = url;
        img.setAttribute("src", `${container.url}`);
        img.setAttribute("alt", `${container.mediaTitle}`);
        container.appendChild(img);
      };
      console.log(url);
    }
    else if (url.search(".mp4")) { 
      const vid = document.createElement("video");
      vid.controls = true;
      const vidSource = document.createElement("source");
      vid.onload = loadVid(url, mediaTitle);
      function loadVid(url, mediaTitle) {
        container.removeChild(loader);
        // this.url = url;
        vidSource.setAttribute("src", `${url}`);
        vid.appendChild(vidSource);
        vid.setAttribute("alt", `${mediaTitle}`);
        container.appendChild(vid);
      };
    }
    
    
  }
  //////DEPLACEMENT VIA LE CLAVIER
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    }
    if (e.key === "ArrowLeft") {
      this.prev(e);
    }
    if (e.key === "ArrowRight") {
      this.next(e);
    }
  }
  ///////FERMER LA LIGHTBOX
  close(e) {
    e.preventDefault();
    this.element.classList.add("fade");
    // this.element.parentElement.enableBodyScroll();
    console.log(this.element)
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
  }
  /////NAVIGATION DANS LA GALLERIE
  // TODO !!
  next(e) {
    e.preventDefault();
    let i = this.gallery.findIndex((image) => image === this.url);
    this.loadMedia(this.gallery[i + 1]);
  }
  
  prev(e) {
    e.preventDefault();
    let i = this.gallery.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.gallery.length;
    }
    this.loadMedia(this.gallery[i - 1]);
  }
  
  ////CREATION DE LA LIGHTBOX EN FONCTION DU MEDIA SELECTIONNE
  buildDOM(url) {
    
    const container = document.createElement("div");
    container.classList.add("lightBox");
    
    const btnClose = document.createElement("button");
    btnClose.classList.add("lightBoxClose");
    
    const btnNext = document.createElement("button");
    btnNext.classList.add("lightBoxNext");
    
    const btnPrev = document.createElement("button");
    btnPrev.classList.add("lightBoxPrev");
    
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("lightBoxImage");
    
    // let mediaBalise = null;
    
    // if (url.includes(".mp4")) {
    //   // modifier media
    //   mediaBalise = document.createElement("video");
    //   mediaBalise.controls = true;
    //   const mediaSource = document.createElement("source");
    //   mediaSource.setAttribute("src", `${url}`);
    //   mediaBalise.setAttribute("alt", `${this.mediaTitle}`);
    //   mediaBalise.appendChild(mediaSource);
    // } else {
    //   mediaBalise = document.createElement("img");
    //   mediaBalise.setAttribute("src", `${url}`);
    //   mediaBalise.setAttribute("alt", `${this.mediaTitle}`);
    // }
    
    const title = document.createElement("h2");
    title.classList.add("lightBoxMediaTitle");
    title.innerText = this.mediaTitle;
    
    container.appendChild(btnClose);
    container.appendChild(btnNext);
    container.appendChild(btnPrev);
    // imageContainer.appendChild(mediaBalise);
    container.appendChild(imageContainer);
    container.appendChild(title);
    
    container
    .querySelector(".lightBoxClose")
    .addEventListener("click", this.close.bind(this));
    container
    .querySelector(".lightBoxNext")
    .addEventListener("click", this.next.bind(this));
    container
    .querySelector(".lightBoxPrev")
    .addEventListener("click", this.prev.bind(this));

    return container;
  }
}
