const popupProfileElement = document.querySelector(".popup_profile");
const popups = document.querySelectorAll(".popup");
const popupEditButtonElement = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const formProfileName = popupProfileElement.querySelector("#name");
const formProfileDescription =
    popupProfileElement.querySelector("#description");
const popupEditForm = popupProfileElement.querySelector(".popup__form");
const popupAddCardElement = document.querySelector(".popup_add-card");
const popupAddButtonElement = document.querySelector(".profile__add-button");
const popupAddForm = popupAddCardElement.querySelector(".popup__form");
const popupNameElement = popupAddCardElement.querySelector("#title");
const popupUrlElement = popupAddCardElement.querySelector("#url");
const popupImage = document.querySelector(".popup_picture");
const popupImageElement = popupImage.querySelector(".popup__img");
const popupImageTextElement = popupImage.querySelector(".popup__text");
const listElement = document.querySelector(".elements__list");
const cardElement = document.querySelector("#cardElement").content;
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
const submitPopup = function (event) {
    event.preventDefault();
    profileName.textContent = formProfileName.value;
    profileDescription.textContent = formProfileDescription.value;
    closePopup(popupProfileElement);
};
//нажатие на кнопку редактирования открывает попап профайла с сохраненной ранее введенной информацией
popupEditButtonElement.addEventListener("click", () => {
    formProfileName.value = profileName.textContent;
    formProfileDescription.value = profileDescription.textContent;
    openPopup(popupProfileElement);
});
//нажатие на кнопку сохранения сохраняет изменения и закрывает профайл попап
popupEditForm.addEventListener("submit", submitPopup);
//константа для карточки
const startCard = function (object) {
    const gridElement = cardElement.querySelector(".element").cloneNode(true);
    const imageElement = gridElement.querySelector(".element__image");
    const titleElement = gridElement.querySelector(".element__title");
    const busketElement = gridElement.querySelector(".element__busket");
    const likeElement = gridElement.querySelector(".element__like");

    imageElement.alt = object.name;
    imageElement.src = object.link;
    titleElement.textContent = object.name;
    //нажатие на лайк меняет ее состояние
    likeElement.addEventListener("click", (event) =>
        event.target.classList.toggle("element__like_active")
    );
    //нажатие на корзину удаляет элемент
    busketElement.addEventListener("click", (event) =>
        event.target.closest(".element").remove()
    );
    //нажатие на картинку открывает картинку с ее названием
    imageElement.addEventListener("click", () => {
        popupImageElement.alt = object.name;
        popupImageElement.src = object.link;
        popupImageTextElement.textContent = object.name;
        openPopup(popupImage);
    });
    return gridElement;
};

initialCards.forEach(function (item) {
    const card = startCard(item);
    listElement.append(card);
});
//константа для добавления картинки с названием
const submitPopupAddCard = function (event) {
    event.preventDefault();
    const objectNameAndUrl = {
        name: popupNameElement.value,
        link: popupUrlElement.value,
    };
    listElement.prepend(startCard(objectNameAndUrl));
    closePopup(popupAddCardElement);
    event.target.reset();
};
//нажатие на кнопку добавления открывает попап
popupAddButtonElement.addEventListener("click", () => {
    openPopup(popupAddCardElement);
});
//нажатие на кнопку создать создает новую карточку с картинкой с введенным названием и ссылкой
popupAddForm.addEventListener("submit", submitPopupAddCard);
