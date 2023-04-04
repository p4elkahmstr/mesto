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

const popupAddCardElement = document.querySelector(".popup_add-card");
const popupAddButtonElement = document.querySelector(".profile__add-button");
const popupAddCardCloseButtonElement = popupAddCardElement.querySelector(
    ".popup__close_add-card"
);
const popupAddForm = popupAddCardElement.querySelector(".popup__form");
const popupNameElement = popupAddCardElement.querySelector("#title");
const popupUrlElement = popupAddCardElement.querySelector("#url");
const popupImage = document.querySelector(".popup_picture");
const popupImageElement = popupImage.querySelector(".popup__img");
const popupImageTextElement = popupImage.querySelector(".popup__text");
const listElement = document.querySelector(".elements__list");
const cardElement = document.querySelector("#cardElement").content;
const popupClosePicture = popupImage.querySelector(".popup__close_picture");
const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

const openPopupAddCard = function () {
    popupAddCardElement.classList.add("popup_opened");
    console.log("Open popup add card clicked");
};

const closePopupAddCard = function () {
    popupAddCardElement.classList.remove("popup_opened");
};

const closePopupAddCardByClickOnOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopupAddCard();
};

const startCard = function (object) {
    const gridElement = cardElement.querySelector(".element").cloneNode(true);
    const imageElement = gridElement.querySelector(".element__image");
    const titleElement = gridElement.querySelector(".element__title");
    const busketElement = gridElement.querySelector(".element__busket");
    const likeElement = gridElement.querySelector(".element__like");

    imageElement.alt = object.name;
    imageElement.src = object.link;
    titleElement.textContent = object.name;

    likeElement.addEventListener("click", (event) =>
        event.target.classList.toggle("element__like_active")
    );
    busketElement.addEventListener("click", (event) =>
        event.target.closest(".element").remove()
    );

    const openPopupImage = function () {
        popupImage.classList.add("popup_opened");
    };
    imageElement.addEventListener("click", () => {
        popupImageElement.alt = object.name;
        popupImageElement.src = object.link;
        popupImageTextElement.textContent = object.title;
        openPopupImage();
    });

    const closePopupImage = function () {
        popupImage.classList.remove("popup_opened");
    };

    const closePopupImageByClickOnOverlay = function (event) {
        if (event.target !== event.currentTarget) {
            return;
        }
        closePopupImage();
    };

    popupClosePicture.addEventListener("click", closePopupImage);
    popupImage.addEventListener("click", closePopupImageByClickOnOverlay);

    return gridElement;
};

initialCards.forEach(function (item) {
    const card = startCard(item);
    listElement.append(card);
});

const submitPopupAddCard = function (event) {
    event.preventDefault();
    const objectNameAndUrl = {
        name: popupNameElement.value,
        link: popupUrlElement.value,
    };
    listElement.prepend(startCard(objectNameAndUrl));
    closePopupAddCard();
    event.target.reset();
};

const likeCard = function (event) {
    event.target.classList.toggle("element__like_active");
};

popupAddButtonElement.addEventListener("click", openPopupAddCard);
popupAddCardCloseButtonElement.addEventListener("click", closePopupAddCard);
popupAddCardElement.addEventListener(
    "click",
    closePopupAddCardByClickOnOverlay
);
popupAddForm.addEventListener("submit", submitPopupAddCard);
