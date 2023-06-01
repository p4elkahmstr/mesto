export default class Card {
    constructor(data, selectorTemplate, openPopupImage, openPopupDelete) {
        this._data = data;
        this._selectorTemplate = selectorTemplate;
        this._openPopupImage = openPopupImage;
        this._openPopupDelete = openPopupDelete;
    }
    _getTemplateClone() {
        return document
            .querySelector(this._selectorTemplate)
            .content.querySelector(".element")
            .cloneNode(true);
    }

    _handleLike = () => {
        this._likeElement.classList.toggle("element__like_active");
    };

    _handleDelete = () => {
        this._openPopupDelete(this);
    };

    _handleOpenImageInPopupImage = () => {
        this._openPopupImage(this._data);
    };

    _setEventListeners() {
        this._likeElement.addEventListener("click", this._handleLike);
        this._busketElement.addEventListener("click", this._handleDelete);
        this._imageElement.addEventListener(
            "click",
            this._handleOpenImageInPopupImage
        );
    }

    cardRemove() {
        this._cloneElement.remove();
        this._cloneElement = null;
        this._likeElement = null;
        this._imageElement = null;
        this._titleElement = null;
    }

    createCard() {
        this._cloneElement = this._getTemplateClone();
        this._imageElement =
            this._cloneElement.querySelector(".element__image");
        this._titleElement =
            this._cloneElement.querySelector(".element__title");
        this._busketElement =
            this._cloneElement.querySelector(".element__busket");
        this._likeElement = this._cloneElement.querySelector(".element__like");
        this._imageElement.src = this._data.link;
        this._imageElement.alt = this._data.title;
        this._titleElement.textContent = this._data.title;
        this._setEventListeners();
        return this._cloneElement;
    }
}
