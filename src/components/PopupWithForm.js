import Popup from './Popup.js';
import { toCamelCase } from '../utils/toCamelCase.js';
 
export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._formElement = this._popupElement.querySelector('.form');
		this.inputList = this._formElement.querySelectorAll('.form__item');
		this._formButton = this._formElement.querySelector('.form__button');
		this._buttonText = this._formButton.textContent;
		this._handleFormSubmit = handleFormSubmit;
	}

	_renderBtnText(text) {
		return text.slice(0, 5) + (text.length > 7 ? 'няю...' : 'ю...')
	}

	renderLoading(isLoading) {
		if (isLoading) {
			this._formButton.textContent = this._renderBtnText(this._buttonText)
		}
		else {
			this._formButton.textContent = this._buttonText;
		}
	}
	
	_getInputValues() {
		const inputValues = {};

		this.inputList.forEach(input => {
			inputValues[toCamelCase(input.name)] = input.value;
		})

		return inputValues;
	}

	close() {
		super.close();
		this._formElement.reset();
	}

	setEventListeners() {
		super.setEventListeners();
		this._formElement.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._getInputValues()));
	}
}