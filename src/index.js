import Card from "./scripts/components/Card.js";
import FormValidator from "./scripts/components/FormValidator.js";
// index.js
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/utils/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import {
    initialCards,
    validationConfig,
    popupEditButtonElement,
    popupAddButtonElement,
    selectorTemplate,
    selectorPopupProfile,
    selectorPopupAddCard,
    selectorPopupImage,
    selectorListElement,
    formValidator,
    configInfo,
} from "./scripts/utils/constants.js";

import "./pages/index.css"; // добавьте импорт главного файла стилей

// const popups = document.querySelectorAll(".popup");

// const profileName = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__subtitle");
// const formProfileName = popupProfileElement.querySelector("#name");
// const formProfileDescription =
//     popupProfileElement.querySelector("#description");
// const profileForm = document.forms["profile-form"];
// const cardFrom = document.forms["card-form"];
// const popupAddCardElement = document.querySelector(".popup_add-card");
// const popupAddForm = popupAddCardElement.querySelector(".popup__form");
// const popupNameElement = popupAddCardElement.querySelector("#title");
// const popupUrlElement = popupAddCardElement.querySelector("#url");
// const popupImage = document.querySelector(".popup_picture");
// const popupImageElement = popupImage.querySelector(".popup__img");
// const popupImageTextElement = popupImage.querySelector(".popup__text");
// const listElement = document.querySelector(".elements__list");

const userInfo = new UserInfo(configInfo);

const imagePopup = new PopupWithImage(selectorPopupImage);

// //общая функция открытия попапа
// function openPopup(popup) {
//     popup.classList.add("popup_opened");
//     document.addEventListener("keydown", closePopupByEsc);
// }
// //общая функция закрытия попапа
// function closePopup(popup) {
//     popup.classList.remove("popup_opened");
//     document.removeEventListener("keydown", closePopupByEsc);
// }

// function closePopupByEsc(event) {
//     if (event.key === "Escape") {
//         const popupOpened = document.querySelector(".popup_opened");
//         closePopup(popupOpened);
//     }
// }

// //закрытие любого попапа по крестику и по нажатию на оверлей
// popups.forEach((popup) => {
//     popup.addEventListener("mousedown", (event) => {
//         if (
//             event.target.classList.contains("popup_opened") ||
//             event.target.classList.contains("popup__close")
//         )
//             closePopup(popup);
//     });
// });

//константа для сохранения введеных изменений в попап профайла
// const handleProfileFormSubmit = function (event) {
//     event.preventDefault();
//     profileName.textContent = formProfileName.value;
//     profileDescription.textContent = formProfileDescription.value;
//     closePopup(popupProfileElement);
// };
//нажатие на кнопку редактирования открывает попап профайла с сохраненной ранее введенной информацией
popupEditButtonElement.addEventListener("click", () => {
    // profileDataValidator.resetForm();
    formValidator.profileForm.resetForm();
    popupProfile.setInputValue(userInfo.getUserInfo());
    popupProfile.open();
});
//нажатие на кнопку сохранения сохраняет изменения и закрывает профайл попап
// profileForm.addEventListener("submit", handleProfileFormSubmit);
//константа для карточки

// const openPopupImage = (data) => {
//     popupImageElement.alt = data.name;
//     popupImageElement.src = data.link;
//     popupImageTextElement.textContent = data.name;
//     openPopup(popupImage);
// };

// function createNewCard(e) {
//     const card = new Card(e, selectorTemplate, imagePopup.open);
//     return card.createCard();
// }

const section = new Section(
    {
        items: initialCards,
        renderer: (element) => {
            const card = new Card(element, selectorTemplate, imagePopup.open);
            return card.createCard();
        },
    },
    selectorListElement
);

section.addCardFromArray();

const popupProfile = new PopupWithForm(selectorPopupProfile, (data) => {
    userInfo.setUserInfo(data);
});

const popupAddCard = new PopupWithForm(selectorPopupAddCard, (data) => {
    section.addItem(data);
});

// function addCard(container, card) {
//     container.prepend(card);
// }

// initialCards.forEach((e) => {
//     addCard(listElement, createNewCard(e));
// });

imagePopup.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();

// const profileDataValidator = new FormValidator(
//     validationConfig,
//     popupProfileElement
// );
// profileDataValidator.enableValidation();

// const addCardValidator = new FormValidator(
//     validationConfig,
//     popupAddCardElement
// );
// addCardValidator.enableValidation();

Array.from(document.forms).forEach((item) => {
    const form = new FormValidator(validationConfig, item);
    const name = item.getAttribute("name");
    formValidator[name] = form;
    form.enableValidation();
});

console.log(document.forms.cardForm);
console.log(document.forms.cardForm.name);
console.log(document.forms.cardForm.getAttribute("name"));
console.log(formValidator);
console.log(document.forms.profileForm);
console.log(document.forms.profileForm.name);
console.log(document.forms.profileForm.getAttribute("name"));

//константа для добавления картинки с названием
// const submitPopupAddCard = function (event) {
//     event.preventDefault();
//     const objectNameAndUrl = {
//         name: popupNameElement.value,
//         link: popupUrlElement.value,
//     };
//     addCard(listElement, createNewCard(objectNameAndUrl));
//     closePopup(popupAddCardElement);
//     event.target.reset();
// };
//нажатие на кнопку добавления открывает попап
popupAddButtonElement.addEventListener("click", () => {
    // addCardValidator.resetForm();
    formValidator.cardForm.resetForm();
    popupAddCard.open();
});
// //нажатие на кнопку создать создает новую карточку с картинкой с введенным названием и ссылкой
// popupAddForm.addEventListener("submit", submitPopupAddCard);
