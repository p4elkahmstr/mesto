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

    _showError(currentInputErrorContainer, input) {
        input.classList.add(this._errorClass);
        currentInputErrorContainer.textContent = input.validationMessage;
    }

    _hideError(currentInputErrorContainer, input) {
        input.classList.remove(this._errorClass);
        currentInputErrorContainer.textContent = "";
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

    _checkInputValidity(input) {
        const currentInputErrorContainer = this._form.querySelector(
            `#${input.id}-error`
        );
        input.validity.valid
            ? this._hideError(currentInputErrorContainer, input)
            : this._showError(currentInputErrorContainer, input);
    }

    _setEventListeners() {
        this._inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }

    resetForm() {
        this._inputList.forEach((input) => {
            const currentInputErrorContainer = this._form.querySelector(
                `#${input.id}-error`
            );
            if (!input.validity.valid) {
                this._hideError(currentInputErrorContainer, input);
            }
        });
        this._disableButton();
    }
}

export default FormValidator;
