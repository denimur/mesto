import Popup from './Popup.js';
import { toCamelCase } from '../utils/toCamelCase.js';
 
export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._formElement = this._popupElement.querySelector('.form')
		this._inputList = this._formElement.querySelectorAll('.form__item');
		this._handleFormSubmit = handleFormSubmit;
		this._toCamelCase = toCamelCase;
	}
	
	_getInputValues() {
		const inputValues = {}

		this._inputList.forEach(input => {
			inputValues[this._toCamelCase(input.name)] = input.value;
		})

		return inputValues
	}

	close() {
		super.close();
		this._formElement.reset()
	}

	setEventListeners() {
		super.setEventListeners();
		this._formElement.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._getInputValues()));
	}
}