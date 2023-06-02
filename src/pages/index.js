import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
// index.js
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupCardDelete from "../components/PopupCardDelete.js";
import Api from "../components/Api.js";
import {
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

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
    headers: {
        authorization: "03065fbb-dcfa-4975-a9cf-14ec6e4c94d3",
        "Content-Type": "application/json",
    },
});

const popupDeleteCard = new PopupCardDelete(
    selectorPopupDelete,
    ({ card, cardId }) => {
        api.deleteCard(cardId)
            .then(() => {
                card.cardRemove();
                popupDeleteCard.close();
            })
            .catch((error) =>
                console.error(`Произошла ошибка при удалении карточки ${error}`)
            )
            .finally();
    }
);

function createNewCard(element) {
    const card = new Card(
        element,
        selectorTemplate,
        imagePopup.open,
        popupDeleteCard.open,
        (likeIconElement, dataId) => {
            if (likeIconElement.classList.contains("element__like_active")) {
                api.deleteLike(dataId)
                    .then((res) => {
                        console.log(res);
                        card.toggleLike(res.likes);
                    })
                    .catch((error) => {
                        console.error(
                            `Произошла ошибка при снятии лайка ${error}`
                        );
                    });
            } else {
                api.addLike(dataId)
                    .then((res) => {
                        console.log(res);

                        card.toggleLike(res.likes);
                    })
                    .catch((error) =>
                        console.error(
                            `Произошла ошибка при добавлении лайка ${error}`
                        )
                    );
            }
        }
    );
    return card.createCard();
}

popupEditButtonElement.addEventListener("click", () => {
    // profileDataValidator.resetForm();
    formValidator.profileForm.resetForm();
    popupProfile.setInputValue(userInfo.getUserInfo());
    popupProfile.open();
});

const section = new Section((element) => {
    section.addItemAppend(createNewCard(element));
}, selectorListElement);

const popupProfile = new PopupWithForm(selectorPopupProfile, (data) => {
    api.setUserInfo(data)
        .then((res) => {
            userInfo.setUserInfo({
                username: res.name,
                description: res.about,
                avatar: res.avatar,
            });
            popupProfile.close();
        })
        .catch((error) =>
            console.error(`Произошла ошибка редактирования профиля ${error}`)
        )
        .finally(() => {
            popupProfile.setupDefaultTextBtn();
        });
});

const popupAddCard = new PopupWithForm(selectorPopupAddCard, (data) => {
    Promise.all([api.getInfo(), api.addCard(data)])
        .then(([dataUser, dataCard]) => {
            dataCard.myid = dataUser._id;
            section.addItemPrepend(createNewCard(dataCard));
            popupAddCard.close();
        })
        .catch((error) =>
            console.error(
                `Произошла ошибка при создании новой карточки ${error}`
            )
        )
        .finally(() => {
            popupAddCard.setupDefaultTextBtn();
        });
});

const avatarPopup = new PopupWithForm(selectorPopupAvatar, (data) => {
    api.setNewAvatar(data)
        .then((res) => {
            userInfo.setUserInfo({
                username: res.name,
                description: res.about,
                avatar: res.avatar,
            });
            avatarPopup.close();
        })
        .catch((error) =>
            console.error(`Произошла ошибка при обновлении аватара ${error}`)
        )
        .finally(() => {
            avatarPopup.setupDefaultTextBtn();
        });
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

Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, dataCard]) => {
        dataCard.forEach((element) => (element.myid = dataUser._id));

        userInfo.setUserInfo({
            username: dataUser.name,
            description: dataUser.about,
            avatar: dataUser.avatar,
        });
        section.addCardFromArray(dataCard);
    })
    .catch((error) =>
        console.error(
            `Произошла ошибка при создании начальных данных страницы ${error}`
        )
    );
