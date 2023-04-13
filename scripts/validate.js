const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_invalid",
    activeButtonClass: "popup__submit_valid",
    inputErrorClass: "popup__input_valid",
    errorClass: "popup__input_invalid",
};
const enableValidation = ({ formSelector, ...rest }) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((form) => {
        form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form, rest);
    });
};

const setEventListeners = (
    formToValidate,
    { inputSelector, submitButtonSelector, ...rest }
) => {
    const formInputs = Array.from(
        formToValidate.querySelectorAll(inputSelector)
    );
    const formButton = formToValidate.querySelector(submitButtonSelector);

    formInputs.forEach((input) => {
        input.addEventListener("input", () => {
            checkInputValidity(input);
            if (hasInvalidInput(formInputs)) {
                disableButton(formButton, rest);
            } else {
                enableButton(formButton, rest);
            }
        });
    });
};

const checkInputValidity = (input) => {
    const currentInputErrorContainer = document.querySelector(
        `#${input.id}-error`
    );
    if (input.checkValidity()) {
        currentInputErrorContainer.textContent = "";
    } else {
        currentInputErrorContainer.textContent = input.validationMessage;
    }
};

const hasInvalidInput = (formInputs) => {
    return formInputs.some((item) => !item.validity.valid);
};

const enableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
    button.classList.remove(inactiveButtonClass);
    button.classList.add(activeButtonClass);
    button.removeAttribute("disabled");
};

const disableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
    button.classList.add(inactiveButtonClass);
    button.classList.remove(activeButtonClass);
    button.setAttribute("disabled", true);
};

enableValidation(validationConfig);
