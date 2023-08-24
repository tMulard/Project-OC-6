// import {enableBodyScroll, disableBodyScroll} from './body-scroll-lock.js';

// export class LightBox {
//   static init(medias) {
//     const links = Array.from(
//       document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
//       );
//       const gallery = links.map((link) => link.getAttribute("href"));
      
//       links.forEach((link) =>
//       link.addEventListener("click", (e) => {
//         e.preventDefault();
//         const url = e.currentTarget.getAttribute("href");
//         let mediaTitle;
//         let mediaSrc;
//         medias.forEach((media) => {
//           if (url === `${media.path}${media.image}`) {
//             mediaTitle = media.title;
//             mediaSrc = `${media.path}${media.image}`;
//           }
//           else if (url === `${media.path}${media.video}`) {
//             mediaTitle = media.title;
//             mediaSrc = `${media.path}${media.video}`;
//           }
//         })
//         new LightBox(url, gallery, mediaTitle, mediaSrc);
//       })
//       );
//     }
    
//     constructor(url, gallery, mediaTitle, mediaSrc) {
//       this.gallery = gallery;
//       this.url = url;
//       this.element = this.buildDOM(this.url, mediaSrc, mediaTitle);
//       //this.loadMedia(url, mediaTitle, mediaSrc);
//       document.body.appendChild(this.element);
//       disableBodyScroll(this.element)
//       //debugger
//     //console.log(this.element);
//     document.addEventListener("keyup", this.onKeyUp);
//   }
//   ///// CHARGEMENT DE L'IMAGE/LA VIDEO
//   // loadMedia(url, mediaTitle, mediaSrc) {
//   //   this.url = url;
//   //   const title = mediaTitle;
//   //   const src = mediaSrc;
//   //   // this.url = null;
//   //   const container = this.element.querySelector(".lightBox .lightBoxImage");
//   //   console.log(container);
//   //   //const loader = document.createElement("div");
//   //   //loader.classList.add("lightBoxLoader");
//   //   //container.appendChild(loader);
//   //   if (url.search(".jpg")) { 
//   //     const img = document.createElement("img");
//   //     // img.onload = loadImg(src);
//   //     // function loadImg(src) {
//   //       //container.removeChild(loader);
//   //       img.setAttribute("src", `${src}`);
//   //       img.setAttribute("alt", `${title}`);
//   //       container.appendChild(img);
//   //       return container
//   //     // };
//   //   }
//   //   else if (url.search(".mp4")) { 
//   //     const vid = document.createElement("video");
//   //     vid.controls = true;
//   //     const vidSource = document.createElement("source");
//   //     // vid.onload = loadVid(src);
//   //     // function loadVid(src) {
//   //       //container.removeChild(loader);
//   //       vidSource.setAttribute("src", `${src}`);
//   //       vid.appendChild(vidSource);
//   //       vid.setAttribute("alt", `${title}`);
//   //       container.appendChild(vid);
//   //       return container
//   //     // };
//   //   }
//   // }
//   //////DEPLACEMENT VIA LE CLAVIER
//   onKeyUp(e) {
//     if (e.key === "Escape") {
//       this.close(e);
//     }
//     if (e.key === "ArrowLeft") {
//       this.prev(e);
//     }
//     if (e.key === "ArrowRight") {
//       this.next(e);
//     }
//   }
//   ///////FERMER LA LIGHTBOX
//   close(e) {
//     e.preventDefault();
//     this.element.classList.add("fade");
//     enableBodyScroll(this.element);
//     window.setTimeout(() => {
//       this.element.parentElement.removeChild(this.element);
//     }, 500);
//   }
//   /////NAVIGATION DANS LA GALLERIE
//   // TODO !!
//   next(e) {
//     e.preventDefault();
//     let i = this.gallery.findIndex((url) => url === this.url);
//     this.loadMedia(this.gallery[i + 1], this.gallery[i + 1].mediaTitle, this.gallery[i + 1].mediaSrc);
//   }
  
//   prev(e) {
//     e.preventDefault();
//     let i = this.gallery.findIndex((url) => url === this.url);
//     if (this.gallery.length === 1) {
//       i = this.gallery.length;
//     }
//     this.loadMedia(this.gallery[i - 1], this.gallery[i - 1].mediaTitle, this.gallery[i - 1].mediaSrc);
//   }
  
//   ////CREATION DE LA LIGHTBOX EN FONCTION DU MEDIA SELECTIONNE
//   buildDOM(url, mediaSrc, mediaTitle) {
//     const path = url;
//     const container = document.createElement("div");
//     container.classList.add("lightBox");
    
//     const btnClose = document.createElement("button");
//     btnClose.classList.add("lightBoxClose");
    
//     const btnNext = document.createElement("button");
//     btnNext.classList.add("lightBoxNext");
    
//     const btnPrev = document.createElement("button");
//     btnPrev.classList.add("lightBoxPrev");
    
//     const imageContainer = document.createElement("div");
//     imageContainer.classList.add("lightBoxImage");
    
//     let mediaBalise = null;
    
//     if (path.includes(".mp4")) {
//         mediaBalise = document.createElement("video");
//         mediaBalise.controls = true;
//         const mediaSource = document.createElement("source");
//         mediaSource.setAttribute("src", `${this.gallery.findIndex((title) => title === mediaTitle)}`);
//         mediaBalise.setAttribute("alt", `${mediaTitle}`);
//         mediaBalise.appendChild(mediaSource);
//       } else if (path.includes(".jpg")) {
//           mediaBalise = document.createElement("img");
//           mediaBalise.setAttribute("src", `${mediaSrc}`);
//           mediaBalise.setAttribute("alt", `${mediaTitle}`);
//         }
        
//         const title = document.createElement("h2");
//         title.classList.add("lightBoxMediaTitle");
//         title.innerText = mediaTitle;
        
//         container.appendChild(btnClose);
//         container.appendChild(btnNext);
//         container.appendChild(btnPrev);
//         imageContainer.appendChild(mediaBalise);
//         container.appendChild(imageContainer);
//         container.appendChild(title);
        
//     container
//     .querySelector(".lightBoxClose")
//     .addEventListener("click", this.close.bind(this));
//     container
//     .querySelector(".lightBoxNext")
//     .addEventListener("click", this.next.bind(this));
//     container
//     .querySelector(".lightBoxPrev")
//     .addEventListener("click", this.prev.bind(this));
    
//     // container
//     // .querySelector(".lightBoxImage")
//     // .addEventListener("click", loadMedia(url, mediaTitle, mediaSrc));

//     return container;

//   }

// }

export const lightBoxFactory = (mediaTitle, mediaSrc) => {
  const background = document.createElement("div");
  background.classList.add("lightBoxBackground");

  const container = document.createElement("div");
  container.classList.add("lightBox");
  container.setAttribute("aria-label", "Image closeup view")
  
  const btnClose = document.createElement("button");
  btnClose.classList.add("lightBoxClose");
  btnClose.setAttribute("aria-label", "Close Lightbox")
  
  const btnNext = document.createElement("button");
  btnNext.classList.add("lightBoxNext");
  btnNext.setAttribute("aria-label", "Next Image")
  
  const btnPrev = document.createElement("button");
  btnPrev.classList.add("lightBoxPrev");
  btnPrev.setAttribute("aria-label", "Previous Image")
  
  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add("lightBoxMedia");
  
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("lightBoxImage");
  imageContainer.setAttribute("aria-label", `${mediaTitle}`)
  let mediaBalise = null;
    
  if (mediaSrc.includes(".mp4")) {
    mediaBalise = document.createElement("video");
    mediaBalise.controls = true;
    const mediaSource = document.createElement("source");
    mediaSource.setAttribute("src", `${mediaSrc}`);
    mediaBalise.setAttribute("alt", `${mediaTitle}`);
    mediaBalise.appendChild(mediaSource);
  } else {
    mediaBalise = document.createElement("img");
    mediaBalise.setAttribute("src", `${mediaSrc}`);
    mediaBalise.setAttribute("alt", `${mediaTitle}`);
  }
  
  const title = document.createElement("h2");
  title.classList.add("lightBoxMediaTitle");
  title.innerText = mediaTitle;
  
  container.appendChild(btnClose);
  container.appendChild(btnNext);
  container.appendChild(btnPrev);
  imageContainer.appendChild(mediaBalise);
  mediaContainer.appendChild(imageContainer);
  mediaContainer.appendChild(title);
  container.appendChild(mediaContainer)
  background.appendChild(container);
  
  return background
}

