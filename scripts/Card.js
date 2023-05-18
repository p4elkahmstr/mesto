export default class Card {
    constructor(data, selectorTemplate, openPopupImage) {
        this._data = data;
        this._link = data.link;
        this._name = data.name;
        this._selectorTemplate = selectorTemplate;
        this._openPopupImage = openPopupImage;
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
        this._cloneElement.remove();
        this._cloneElement = null;
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

    createCard() {
        this._cloneElement = this._getTemplateClone();
        this._imageElement =
            this._cloneElement.querySelector(".element__image");
        this._titleElement =
            this._cloneElement.querySelector(".element__title");
        this._busketElement =
            this._cloneElement.querySelector(".element__busket");
        this._likeElement = this._cloneElement.querySelector(".element__like");
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._titleElement.textContent = this._name;
        this._setEventListeners();
        return this._cloneElement;
    }
}
