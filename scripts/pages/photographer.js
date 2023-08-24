import {
  displayHeader,
  displayMedias,
  displayStats,
  handleLikes,
} from "../factories/medias.js";
import {
  CONTACT,
  closeModal,
  displayModal,
  verifyFirstName,
  verifyLastName,
  verifyMail,
} from "../utils/contactForm.js";
import { folderName, getData, getIdFromUrl } from "../utils/data.js";
import { lightBoxFactory } from "../factories/lightbox.js";

const handleFilter = (medias) => {
  const filterResult = document.querySelector(".filterResult p");
  const filters = document.querySelector(".filters");
  const allFilter = document.querySelectorAll(".filter");
  const icon = document.querySelector("#filterArrow");

  filterResult.addEventListener("click", () => {
    filters.classList.toggle("hidden");
    icon.classList.toggle("face_down");
  });

  for (let i = 0; i < allFilter.length; i++) {
    allFilter[i].addEventListener("click", () => {
      // UI
      icon.classList.toggle("face_down");
      filters.classList.toggle("hidden");

      // récupération de la valeure + réécriture
      const value = allFilter[i].innerHTML;
      filterResult.innerHTML = value;

      // LOGIQUE D'AFFICHAGE (SORTING)
      const clickedFilter = allFilter[i].textContent;
      let filteredMedias = [];

      switch (clickedFilter) {
        case "Popularité":
          filteredMedias = medias.sort((mediaA, mediaB) => {
            return mediaB.likes - mediaA.likes;
          });
          break;
        case "Date":
          filteredMedias = medias.sort((mediaA, mediaB) => {
            return new Date(mediaA.date) - new Date(mediaB.date);
          });
          break;
        default:
          filteredMedias = medias.sort((mediaA, mediaB) => {
            return mediaA.title > mediaB.title;
          });
          break;
      }

      displayMedias(filteredMedias);
    });
  }
};

const init = async () => {
  // modal
  const close = document.querySelector(".close");
  const contact_button = document.querySelector(".contact_button");
  close.addEventListener("click", closeModal);
  contact_button.addEventListener("click", displayModal);

  // data
  const id = parseInt(getIdFromUrl());
  const data = await getData();
  const photographers = data.photographers;
  const allMedia = data.media;

  const photographer = photographers.find((elt) => elt.id === id);
  const medias = allMedia.filter((elt) => elt.photographerId === id);
  // on rajoute le path du media dans l'objet media
  medias.forEach((media) => {
    media.path = `assets/images/${folderName(photographer.name)}/`;
  });
  // sort par popularité par default
  const filteredMedias = medias.sort((mediaA, mediaB) => {
    return mediaB.likes - mediaA.likes;
  });

  displayHeader(photographer);
  displayMedias(filteredMedias);
  displayStats(photographer, medias);
  handleFilter(medias);
  handleLikes();

  const links = Array.from(
    document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
  );
  const gallery = links.map((link) => link.getAttribute("href"));
  links.forEach((link) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // si on a cliqué sur le coeur, on ne déclenche pas la lightbox
      if (e.target.className == "likeContainer") return;

      // comportement normal
      const url = e.currentTarget.getAttribute("href");
      let mediaTitle;
      let mediaSrc;
      medias.forEach((media) => {
        if (url === `${media.path}${media.image}`) {
          mediaTitle = media.title;
          mediaSrc = `${media.path}${media.image}`;
        } else if (url === `${media.path}${media.video}`) {
          mediaTitle = media.title;
          mediaSrc = `${media.path}${media.video}`;
        }
      });
      const lightBox = lightBoxFactory(mediaTitle, mediaSrc);
      const closeBtn = lightBox.querySelector(".lightBoxClose");
      closeBtn.addEventListener("click", (event) =>
        closeLightBox(event, lightBox)
      );
      const nextBtn = lightBox.querySelector(".lightBoxNext");
      nextBtn.addEventListener("click", (event) => next(event, mediaTitle));
      const prevBtn = lightBox.querySelector(".lightBoxPrev");
      prevBtn.addEventListener("click", (event) => prev(event, mediaTitle));
      const myLightBox = document.querySelector("#myLightBox");
      myLightBox.appendChild(lightBox);
    })
  );

  const searchTitleImage = (medias, src) => {
    let result = src;
    medias.forEach((media) => {
      if (`${media.path}${media.image}` === src) result = media.title;
    });
    return result;
  };
  const searchTitleVideo = (medias, src) => {
    let result = src;
    medias.forEach((media) => {
      if (`${media.path}${media.video}` === src) result = media.title;
    });
    return result;
  };
  ///////FERMER LA LIGHTBOX
  const closeLightBox = (event, lightBox) => {
    event.preventDefault();
    lightBox.classList.add("fade");
    window.setTimeout(() => {
      const myLightBox = document.querySelector("#myLightBox");
      myLightBox.removeChild(lightBox);
    }, 500);
  };
  /////NAVIGATION DANS LA GALLERIE
  const next = (event, mediaTitle) => {
    event.preventDefault();
    let currentMedia = document.querySelector(".lightBoxImage > *");
    if (currentMedia.src === "")
      currentMedia = document.querySelector(".lightBoxImage > video > source");
    else if (currentMedia.src.search("jpg"))
      currentMedia = document.querySelector(".lightBoxImage > img");
    const lightBoxImage = document.querySelector(".lightBoxImage");
    const lightBoxTitle = document.querySelector(".lightBoxMediaTitle");
    const url = new URL(currentMedia.src);
    const path = url.pathname.substring(1);
    let i = gallery.findIndex((index) => index === path);
    if (i === gallery.length - 1) {
      i = -1;
    }
    const nextPath = gallery[i + 1];

    // IMAGE
    if (nextPath.includes(".jpg")) {
      lightBoxImage.innerHTML = "";
      lightBoxTitle.innerText = "";
      const mediaBalise = document.createElement("img");
      mediaBalise.setAttribute("src", `${nextPath}`);
      mediaTitle = searchTitleImage(medias, nextPath);
      mediaBalise.setAttribute("alt", `${searchTitleImage(medias, nextPath)}`);
      lightBoxImage.appendChild(mediaBalise);
      lightBoxTitle.innerText = searchTitleImage(medias, nextPath);
    }
    // VIDEO
    else {
      lightBoxImage.innerHTML = "";
      lightBoxTitle.innerText = "";
      const mediaBalise = document.createElement("video");
      mediaBalise.controls = true;
      const mediaSource = document.createElement("source");
      mediaSource.setAttribute("src", `${nextPath}`);
      mediaBalise.appendChild(mediaSource);
      mediaBalise.setAttribute("alt", `${searchTitleVideo(medias, nextPath)}`);
      lightBoxImage.appendChild(mediaBalise);
      lightBoxTitle.innerText = searchTitleVideo(medias, nextPath);
    }
  };

  const prev = (event, mediaTitle) => {
    event.preventDefault();
    let currentMedia = document.querySelector(".lightBoxImage > *");
    if (currentMedia.src === "")
      currentMedia = document.querySelector(".lightBoxImage > video > source");
    else if (currentMedia.src.search("jpg"))
      currentMedia = document.querySelector(".lightBoxImage > img");
    const url = new URL(currentMedia.src);
    const path = url.pathname.substring(1);
    let i = gallery.findIndex((index) => index === path);
    if (gallery.length === 1) {
      i = gallery.length;
    } else if (gallery.length !== 1 && i === 0) {
      i = gallery.length;
    }
    const prevPath = gallery[i - 1];
    const lightBoxImage = document.querySelector(".lightBoxImage");
    const lightBoxTitle = document.querySelector(".lightBoxMediaTitle");
    // IMAGE
    if (prevPath.includes(".jpg")) {
      lightBoxImage.innerHTML = "";
      lightBoxTitle.innerText = "";
      const mediaBalise = document.createElement("img");
      mediaBalise.setAttribute("src", `${prevPath}`);
      mediaBalise.setAttribute("alt", `${searchTitleImage(medias, prevPath)}`);
      lightBoxImage.appendChild(mediaBalise);
      lightBoxTitle.innerText = searchTitleImage(medias, prevPath);
    }
    // VIDEO
    else {
      lightBoxImage.innerHTML = "";
      lightBoxTitle.innerText = "";
      const mediaBalise = document.createElement("video");
      mediaBalise.controls = true;
      const mediaSource = document.createElement("source");
      mediaSource.setAttribute("src", `${prevPath}`);
      mediaBalise.appendChild(mediaSource);
      mediaBalise.setAttribute("alt", `${searchTitleImage(medias, prevPath)}`);
      lightBoxImage.appendChild(mediaBalise);
      lightBoxTitle.innerText = searchTitleVideo(medias, prevPath);
    }
  };
  document.addEventListener("keyup", (e) => {
    const lb = document.querySelector(".lightBoxClose");
    if (lb === null) console.log("Lol");
    else {
      if (e.key === "Escape") {
        closeLightBox(e, document.querySelector(".lightBoxBackground"));
      }
      if (e.key === "ArrowLeft") {
        prev(e, document.querySelector(".lightBoxMediaTitle"));
      }
      if (e.key === "ArrowRight") {
        console.log("right");
        next(e, document.querySelector(".lightBoxMediaTitle"));
      }
    }
  });

  const send_button = document.querySelector("#contact_btn");

  send_button.addEventListener("click", (event) => {
    event.preventDefault();

    // run functions to valid inputs
    const isFirstNameOK = verifyFirstName();
    const isLastNameOK = verifyLastName();
    const isMailOK = verifyMail();

    if (isFirstNameOK && isLastNameOK && isMailOK) {
      const form = document.querySelector('form')
      form.reset();
      closeModal();
    }
    console.log(CONTACT); // show in console to check if the input were correctly captured

  });
};

init();
