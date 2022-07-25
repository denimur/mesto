import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);
		this._formElement = this._popupElement.querySelector('.form');
		this._handleFormSubmit = handleFormSubmit;
	}

	_handleConfirm = () => {

	}

	setEventListeners() {
		super.setEventListeners()
		this._formElement.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._id))
	}
}