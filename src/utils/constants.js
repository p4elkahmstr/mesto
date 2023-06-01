const initialCards = [
    {
        title: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        title: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        title: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        title: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        title: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        title: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

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
};

export {
    initialCards,
    validationConfig,
    popupEditButtonElement,
    popupAddButtonElement,
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
