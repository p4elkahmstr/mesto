import Popup from "./Popup.js";

export default class PopupCardDelete extends Popup {
    constructor(selectorPopup, functionSubmit) {
        super(selectorPopup);
        this._functionSubmit = functionSubmit;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            this._functionSubmit(this._element);
        });
    }
    open = (element) => {
        super.open();
        this._element = element;
    };
}
