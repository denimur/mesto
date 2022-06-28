export default class FormValidator {
  constructor(config, formSelector) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._errorElementSelector = config.errorElementSelector
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formSelector = formSelector;
    this._formElement = document.querySelector(this._formSelector);
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
    this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._errorElementList = this._formElement.querySelectorAll(this._errorElementSelector);
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput = (inputList) => {
    return Array.from(inputList).some(inputElement => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
      this._submitButtonElement.setAttribute('disabled', true);
    }
    else {
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
      this._submitButtonElement.removeAttribute('disabled');
    }
  };

  resetValidation = () => {
    this._toggleButtonState()
    this._errorElementList.forEach(errorEl => errorEl.textContent = '');
    this._inputList.forEach(input => input.classList.remove(this._inputErrorClass));
  }

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._formElement, inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  };
}