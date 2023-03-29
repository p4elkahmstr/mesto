const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupEditButtonElement = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const formProfileName = popupElement.querySelector("#name");
const formProfileDescription = popupElement.querySelector("#description");
const popupEditForm = popupElement.querySelector(".popup__form");
const popupSubmit = popupElement.querySelector(".popup__submit");

const openPopup = function () {
    popupElement.classList.add("popup_opened");
    formProfileName.value = profileName.textContent;
    formProfileDescription.value = profileDescription.textContent;
    console.log("Open popup clicked");
};

const closePopup = function () {
    popupElement.classList.remove("popup_opened");
};

const closePopupByClickOnOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup();
};

const submitPopup = function (event) {
    event.preventDefault();
    profileName.textContent = formProfileName.value;
    profileDescription.textContent = formProfileDescription.value;
    closePopup();
};

popupEditButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
popupElement.addEventListener("click", closePopupByClickOnOverlay);
popupEditForm.addEventListener("submit", submitPopup);
