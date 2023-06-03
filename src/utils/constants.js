const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_invalid",
    activeButtonClass: "popup__submit_valid",
    inputErrorClass: "popup__input_valid",
    errorClass: "popup__input_invalid",
};

const popupEditButtonElement = document.querySelector(".profile__edit-button");
const popupAddButtonElement = document.querySelector(".profile__add-button");
const popupEditProfileAvatar = document.querySelector(".profile__edit-avatar");

const selectorTemplate = "#cardElement";
const selectorPopupProfile = ".popup_profile";
const selectorPopupAddCard = ".popup_add-card";
const selectorPopupImage = ".popup_picture";
const selectorListElement = ".elements__list";
const selectorPopupAvatar = ".popup_avatar";
const selectorPopupDelete = ".popup_delete";

const formValidator = {};

const configInfo = {
    selectorProfileName: ".profile__title",
    selectorProfileDescription: ".profile__subtitle",
    selectorProfileAvatar: ".profile__avatar",
};

export {
    validationConfig,
    popupEditButtonElement,
    popupAddButtonElement,
    popupEditProfileAvatar,
    selectorTemplate,
    selectorPopupProfile,
    selectorPopupAddCard,
    selectorPopupImage,
    selectorListElement,
    selectorPopupAvatar,
    selectorPopupDelete,
    formValidator,
    configInfo,
};
