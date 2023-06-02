import Popup from "./Popup.js";

export default class PopupCardDelete extends Popup {
    constructor(selectorPopup, functionSubmit) {
        super(selectorPopup);
        this._functionSubmit = functionSubmit;
        this._form = this._popup.querySelector(".popup__form");
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            this._functionSubmit({ card: this._element, cardId: this._cardId });
        });
    }
    open = ({ card, cardId }) => {
        super.open();
        this._element = card;
        this._cardId = cardId;
    };
}
