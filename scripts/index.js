import initialCards from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupProfileElement = document.querySelector(".popup_profile");
const popups = document.querySelectorAll(".popup");
const popupEditButtonElement = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const formProfileName = popupProfileElement.querySelector("#name");
const formProfileDescription =
    popupProfileElement.querySelector("#description");
const profileForm = document.forms["profile-form"];
const cardFrom = document.forms["card-form"];
const popupAddCardElement = document.querySelector(".popup_add-card");
const popupAddButtonElement = document.querySelector(".profile__add-button");
const popupAddForm = popupAddCardElement.querySelector(".popup__form");
const popupNameElement = popupAddCardElement.querySelector("#title");
const popupUrlElement = popupAddCardElement.querySelector("#url");
const popupImage = document.querySelector(".popup_picture");
const popupImageElement = popupImage.querySelector(".popup__img");
const popupImageTextElement = popupImage.querySelector(".popup__text");
const listElement = document.querySelector(".elements__list");
const selectorTemplate = "#cardElement";

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_invalid",
    activeButtonClass: "popup__submit_valid",
    inputErrorClass: "popup__input_valid",
    errorClass: "popup__input_invalid",
};

//общая функция открытия попапа
function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupByEsc);
}
//общая функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(event) {
    if (event.key === "Escape") {
        const popupOpened = document.querySelector(".popup_opened");
        closePopup(popupOpened);
    }
}

//закрытие любого попапа по крестику и по нажатию на оверлей
popups.forEach((popup) => {
    popup.addEventListener("mousedown", (event) => {
        if (event.target.classList.contains("popup_opened")) {
            closePopup(popup);
        }
        if (event.target.classList.contains("popup__close")) {
            closePopup(popup);
        }
    });
});
//константа для сохранения введеных изменений в попап профайла
const handleProfileFormSubmit = function (event) {
    event.preventDefault();
    profileName.textContent = formProfileName.value;
    profileDescription.textContent = formProfileDescription.value;
    closePopup(popupProfileElement);
};
//нажатие на кнопку редактирования открывает попап профайла с сохраненной ранее введенной информацией
popupEditButtonElement.addEventListener("click", () => {
    profileDataValidator.resetForm();
    formProfileName.value = profileName.textContent;
    formProfileDescription.value = profileDescription.textContent;
    openPopup(popupProfileElement);
});
//нажатие на кнопку сохранения сохраняет изменения и закрывает профайл попап
profileForm.addEventListener("submit", handleProfileFormSubmit);
//константа для карточки

const openPopupImage = (data) => {
    popupImageElement.alt = data.name;
    popupImageElement.src = data.link;
    popupImageTextElement.textContent = data.name;
    openPopup(popupImage);
};

function createNewCard(e) {
    const card = new Card(e, selectorTemplate, openPopupImage);
    const cardElement = card.createCard();
    return cardElement;
}

function addCard(container, card) {
    container.prepend(card);
}

initialCards.forEach((e) => {
    addCard(listElement, createNewCard(e));
});

const profileDataValidator = new FormValidator(
    validationConfig,
    popupProfileElement
);
profileDataValidator.enableValidation();

const addCardValidator = new FormValidator(
    validationConfig,
    popupAddCardElement
);
addCardValidator.enableValidation();

//константа для добавления картинки с названием
const submitPopupAddCard = function (event) {
    event.preventDefault();
    const objectNameAndUrl = {
        name: popupNameElement.value,
        link: popupUrlElement.value,
    };
    addCard(listElement, createNewCard(objectNameAndUrl));
    closePopup(popupAddCardElement);
    event.target.reset();
};
//нажатие на кнопку добавления открывает попап
popupAddButtonElement.addEventListener("click", () => {
    addCardValidator.resetForm();
    openPopup(popupAddCardElement);
});
//нажатие на кнопку создать создает новую карточку с картинкой с введенным названием и ссылкой
popupAddForm.addEventListener("submit", submitPopupAddCard);
