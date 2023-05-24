import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._popupImage = this._popup.querySelector(".popup__img");
        this._popupImageCaption = this._popup.querySelector(".popup__text");
    }

    open = (data) => {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.title;
        this._popupImageCaption.textContent = data.title;
        super.open();
    };
}
