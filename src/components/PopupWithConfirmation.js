import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._formElement = this._popupElement.querySelector('.form');
		this._formButton = this._formElement.querySelector('.form__button');
		this._text = this._formButton.textContent; 
		this._handleFormSubmit = handleFormSubmit;
	}

	renderLoading(isLoading) {
		isLoading ? this._formButton.textContent = 'Удаляю...' : this._formButton.textContent = this._text;
	}

	setEventListeners() {
		super.setEventListeners()
		this._formElement.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._id))
	}
}