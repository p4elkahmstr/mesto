export default class Popup {
    constructor(selectorPopup) {
        this._popup = document.querySelector(selectorPopup);
        this._popupClose = this._popup.querySelector(".popup__close");
        this._form = this._popup.querySelector(".popup__form");
    }

    _closePopupByEsc = (e) => {
        if (e.key === "Escape") {
            this.close();
        }
    };

    _closeButton = () => {
        this.close();
    };

    _closePopupByClicklOnOverlay = (e) => {
        if (e.target === e.currentTarget) {
            this.close();
        }
    };

    setEventListeners() {
        this._popupClose.addEventListener("click", this._closeButton);
        this._popup.addEventListener(
            "click",
            this._closePopupByClicklOnOverlay
        );
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._closePopupByEsc);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._closePopupByEsc);
    }
}
