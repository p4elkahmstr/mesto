export default class Card {
    constructor(
        data,
        selectorTemplate,
        openPopupImage,
        openPopupDelete,
        changeLike
    ) {
        // console.log(data);
        this._data = data;
        this._dataId = data._id;
        this._selectorTemplate = selectorTemplate;
        this._openPopupImage = openPopupImage;
        this._openPopupDelete = openPopupDelete;
        this._changeLike = changeLike;
        this._cloneElement = this._getTemplateClone();
        this._imageElement =
            this._cloneElement.querySelector(".element__image");
        this._titleElement =
            this._cloneElement.querySelector(".element__title");
        this._busketElement =
            this._cloneElement.querySelector(".element__busket");
        this._likeElement = this._cloneElement.querySelector(".element__like");
        this._counter = this._cloneElement.querySelector(".element__likes");
    }
    _getTemplateClone() {
        return document
            .querySelector(this._selectorTemplate)
            .content.querySelector(".element")
            .cloneNode(true);
    }

    _handleLike = () => {
        this._changeLike(this._likeElement, this._dataId);
    };

    _handleDelete = () => {
        this._openPopupDelete({ card: this, cardId: this._data._id });
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

    _checkStatusLike() {
        this._data.likes.forEach((item) => {
            if (item._id === this._data.myid) {
                this._likeElement.classList.toggle("element__like_active");
                return;
            }
        });
        this._counter.textContent = this._data.likes.length;
    }

    toggleLike(likes) {
        this._likeElement.classList.toggle("element__like_active");
        this._counter.textContent = likes.length;
    }

    _changeVisibleForTrushBtn() {
        this._data.myid === this._data.owner._id
            ? (this._busketElement.style.display = "block")
            : (this._busketElement.style.display = "none");
    }

    cardRemove() {
        this._cloneElement.remove();
        this._cloneElement = null;
        this._likeElement = null;
        this._imageElement = null;
        this._titleElement = null;
    }

    createCard() {
        this._imageElement.src = this._data.link;
        this._imageElement.alt = this._data.name;
        this._titleElement.textContent = this._data.name;
        this._checkStatusLike();
        this._changeVisibleForTrushBtn();
        this._setEventListeners();
        return this._cloneElement;
    }
}
