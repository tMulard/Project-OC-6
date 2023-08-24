export const displayModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
};

export const closeModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
};

////////////////////////////CONTACT FUNCTIONS

export const CONTACT = {
  firstname: null,
  lastname: null,
  mail: null,
};

// ====================
//    🏗️ FONCTIONS
// ====================

//Functions to check input
export const verifyFirstName = () => {
  //value in input field recieved by the CONTACT object emptied before operation
  CONTACT.firstname = null;

  const formDataFirst = document.querySelector(".formData-username");
  formDataFirst.setAttribute("data-error-visible", false);
  //regular expression = letters + special letters
  const regex = /[a-zA-Z\-éèàïêçôù]+/gm;

  if (inputUserName.value.length > 2) {
    const result = inputUserName.value.match(regex);
    if (result) {
      // if the result is valid, then add the input value to the corresponding CONTACT variable
      CONTACT.firstname = result.join(" ");
      return true;
    } else {
      //or else, send error message
      formDataFirst.setAttribute("data-error-visible", true);
      formDataFirst.setAttribute("data-error", "Uniquement des lettres svp");
    }
  } else {
    formDataFirst.setAttribute("data-error-visible", true);
    formDataFirst.setAttribute(
      "data-error",
      "Veuillez entrer plus de deux caractères pour le champ du nom."
    );
  }
  return false;
};

export const verifyLastName = () => {
  CONTACT.lastname = null;

  const formDataLast = document.querySelector(".formData-userlastname");
  formDataLast.setAttribute("data-error-visible", false);
  //regular expression = letters + special letters
  const regex = /[a-zA-Z\-éèàïêçôù]+/gm;

  if (inputUserLastName.value.length >= 2) {
    const result = inputUserLastName.value.match(regex);
    if (result) {
      // if the result is valid, then add the input value to the corresponding CONTACT variable
      CONTACT.lastname = result.join(" ");
      return true;
    } else {
      formDataLast.setAttribute("data-error-visible", true);
      formDataLast.setAttribute("data-error", "Uniquement des lettres svp");
    }
  } else {
    formDataLast.setAttribute("data-error-visible", true);
    formDataLast.setAttribute(
      "data-error",
      "Veuillez entrer plus d'un caractère pour le champ du nom."
    );
  }
  return false;
};

export const verifyMail = () => {
  CONTACT.mail = null;

  const formDataMail = document.querySelector(".formData-usermail");
  formDataMail.setAttribute("data-error-visible", false);
  //regular expression = letters (+ "." + letters) + "@" + letters + "." + letters (+ "." + letters)
  const regexMail = /^[\.A-Za-z]+@[A-Za-z]+\.[\.A-Za-z]+$/gm;

  if (inputUserMail.value.length > 3) {
    const result = inputUserMail.value.match(regexMail);

    if (result) {
      // if the result is valid, then add the input value to the corresponding CONTACT variable
      CONTACT.mail = result.join(", ");
      return true;
    } else {
      formDataMail.setAttribute("data-error-visible", true);
      formDataMail.setAttribute(
        "data-error",
        "Entrez une adresse mail correcte."
      );
    }
  } else {
    formDataMail.setAttribute("data-error-visible", true);
    formDataMail.setAttribute(
      "data-error",
      "Entrez une adresse mail correcte."
    );
  }
  return false;
};

//inputs
const inputUserName = document.querySelector("#first");
const inputUserLastName = document.querySelector("#last");
const inputUserMail = document.querySelector("#email");
