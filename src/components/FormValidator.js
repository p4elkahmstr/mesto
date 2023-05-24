class FormValidator {
    constructor(config, form) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._activeButtonClass = config.activeButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._form = form;
        this._button = form.querySelector(this._submitButtonSelector);
        this._inputList = form.querySelectorAll(this._inputSelector);
    }

    _showError() {
        this._input.classList.add(this._errorClass);
        this._currentInputErrorContainer.textContent =
            this._input.validationMessage;
    }

    _hideError() {
        this._input.classList.remove(this._errorClass);
        this._currentInputErrorContainer.textContent = "";
    }

    _enableButton() {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.disabled = false;
    }

    _disableButton() {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.disabled = true;
    }

    _hasInvalidInput() {
        return Array.from(this._inputList).some(
            (input) => !input.validity.valid
        );
    }

    _toggleButtonState() {
        this._hasInvalidInput() ? this._disableButton() : this._enableButton();
    }

    _checkInputValidity() {
        this._currentInputErrorContainer = this._form.querySelector(
            `#${this._input.name}-error`
        );
        this._input.validity.valid ? this._hideError() : this._showError();
    }

    _setEventListeners() {
        this._inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._input = input;
                this._checkInputValidity();
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }

    resetForm() {
        this._inputList.forEach((input) => {
            this._input = input;
            this._currentInputErrorContainer = this._form.querySelector(
                `#${this._input.name}-error`
            );
            if (!input.validity.valid) {
                this._hideError();
            }
        });
        this._disableButton();
    }
}

export default FormValidator;
