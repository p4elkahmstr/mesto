import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
// index.js
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupCardDelete from "../components/PopupCardDelete.js";
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
    selectorPopupAvatar,
    selectorPopupDelete,
    formValidator,
    configInfo,
} from "../utils/constants.js";

import "./index.css";

const userInfo = new UserInfo(configInfo);

const imagePopup = new PopupWithImage(selectorPopupImage);

const popupDeleteCard = new PopupCardDelete(selectorPopupDelete, (element) => {
    element.cardRemove();
    popupDeleteCard.close();
});

function createNewCard(element) {
    const card = new Card(
        element,
        selectorTemplate,
        imagePopup.open,
        popupDeleteCard.open
    );
    return card.createCard();
}

popupEditButtonElement.addEventListener("click", () => {
    // profileDataValidator.resetForm();
    formValidator.profileForm.resetForm();
    popupProfile.setInputValue(userInfo.getUserInfo());
    popupProfile.open();
});

const section = new Section(
    {
        items: initialCards,
        renderer: (element) => {
            section.addItem(createNewCard(element));
        },
    },
    selectorListElement
);

section.addCardFromArray();

const popupProfile = new PopupWithForm(selectorPopupProfile, (data) => {
    userInfo.setUserInfo(data);
});

const popupAddCard = new PopupWithForm(selectorPopupAddCard, (data) => {
    section.addItem(createNewCard(data));
});

const avatarPopup = new PopupWithForm(selectorPopupAvatar, (data) => {
    document.querySelector(".profile__avatar").src = data.avatar;
});

imagePopup.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
avatarPopup.setEventListeners();
popupDeleteCard.setEventListeners();

Array.from(document.forms).forEach((item) => {
    const form = new FormValidator(validationConfig, item);
    const name = item.getAttribute("name");
    formValidator[name] = form;
    form.enableValidation();
});

popupAddButtonElement.addEventListener("click", () => {
    formValidator.cardForm.resetForm();
    popupAddCard.open();
});

document
    .querySelector(".profile__edit-avatar")
    .addEventListener("click", () => {
        formValidator.avatarEdit.resetForm();
        avatarPopup.open();
    });
