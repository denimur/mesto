import Popup from './Popup.js';
import { toCamelCase } from '../utils/toCamelCase.js';
 
export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._formElement = this._popupElement.querySelector('.form');
		this.inputList = this._formElement.querySelectorAll('.form__item');
		this._formButton = this._formElement.querySelector('.form__button');
		this._handleFormSubmit = handleFormSubmit;
	}

	renderLoading(isLoading) {
		if (isLoading) {
			this._formButton.textContent = 'Сохраняю...'
		}
		else {
			this._formButton.textContent = 'Сохранить'
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