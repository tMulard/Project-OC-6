// export const fetchMediaFromMedia = (medias) => {
//   let obj = null;
//   const links = Array.from(
//     document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
//   );
//   links.forEach((link) =>
//     link.addEventListener("click", (e) => {
//       const url = e.currentTarget.getAttribute("href");

//       medias.forEach((media) => {
//         if (url.search(".mp4") && media.path === url) {
//           // modifier media
//           obj = media.video;
//         } else if (url.search(".jpg") && media.path === url) {
//           obj = media.image;
//         } else console.log(link);
//       });
//     })
//   );
//   return obj;
// };

// export const fetchTitleFromMedia = (medias) => {
//   let obj = null;
//   const links = Array.from(
//     document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
//   );
//   links.forEach((link) =>
//     link.addEventListener("click", (e) => {
  
  //       medias.forEach((media) => {
    //         if (media.path === url) {
      //           obj = media.title;
      //         }
      //       });
      //     })
      //   );
      //   return obj;
// };

export class LightBox {
  static init() {
    const links = Array.from(
      document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
      );
      const medias = Array.from(
        document.querySelectorAll('article')
      );
      const gallery = links.map((link) => link.getAttribute("href"));
      
      links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const url = e.currentTarget.getAttribute("href");
        const mediaTitle = e.currentTarget.getAttribute("alt")
        let mediaType;
        medias.forEach((media) => {
            if (media.getElementsByTagName("video")){
              mediaType = media.video;
            }
            else if (media.getElementsByTagName("image")){
              mediaType = media.image;
            }
        });
        new LightBox(e.currentTarget.getAttribute("href"), gallery, url, mediaTitle, mediaType);
      })
    );
  }

  constructor(gallery, url) {
    this.gallery = gallery;
    this.url = url;
    this.element = buildDOM(url);
    this.loadMedia(url);
    document.body.appendChild(this.element);
    disableScroll(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  loadMedia(url) {
    this.url = null;
    const container = this.element.querySelector("lightBoxImage");
    const loader = document.createElement("div");
    loader.classList.add("lightBoxLoader");
    container.appendChild(loader);
    
    if (url.search(".jpg")) { 
      const img = new Image();
      img.onload = function () {
        container.removeChild(loader);
        container.appendChild(img);
        this.url = url;
        img.src = url;
      };
    }
    else if (url.search(".mp4")) { 
      const vid = new Video();
      img.onload = function () {
        container.removeChild(loader);
        container.appendChild(vid);
        this.url = url;
        vid.src = url;
      };
    }

    
  }

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

  close(e) {
    e.preventDefault();
    this.element.classList.add("fade");
    enableBodyScroll(this.element);
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
  }

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

    
    let mediaBalise = null;
    
    if (url.search(".mp4")) {
      // modifier media
      mediaBalise = document.createElement("video");
      mediaBalise.controls = true;
      const mediaSource = document.createElement("source");
      mediaSource.setAttribute("src", `${url}`);
      mediaBalise.setAttribute("alt", `${mediaTitle}${mediaType}`);
      mediaBalise.appendChild(mediaSource);
    } else if (url.search(".jpg")){
      mediaBalise = document.createElement("img");
      mediaBalise.setAttribute("src", `${url}`);
      mediaBalise.setAttribute("alt", `${mediaTitle}${mediaType}`);
    }

    const title = document.createElement("h2");
    title.classList.add("lightBoxMediaTitle");
    title.innerText = mediaTitle;
    
    container.appendChild(btnClose);
    container.appendChild(btnNext);
    container.appendChild(btnPrev);
    imageContainer.appendChild(mediaBalise);
    container.appendChild(imageContainer);
    container.appendChild(title);

    container
      .querySelector("lightBoxClose")
      .addEventListener("click", this.close.bind(this));
    container
      .querySelector("lightBoxNext")
      .addEventListener("click", this.next.bind(this));
    container
      .querySelector("lightBoxPrev")
      .addEventListener("click", this.prev.bind(this));

    return container;
  }
}
