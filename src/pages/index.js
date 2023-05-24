import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
// index.js
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
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
} from "../utils/constants.js";

import "./index.css";

const userInfo = new UserInfo(configInfo);

const imagePopup = new PopupWithImage(selectorPopupImage);

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

imagePopup.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();

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
