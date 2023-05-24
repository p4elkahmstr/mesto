import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, functionSubmit) {
        super(selectorPopup);
        this._functionSubmit = functionSubmit;
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = this._form.querySelectorAll(".popup__input");
    }

    _getInputValue() {
        this._value = {};
        this._inputList.forEach((input) => {
            this._value[input.name] = input.value;
        });
        return this._value;
    }

    setInputValue(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            this._functionSubmit(this._getInputValue());
            this.close();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
