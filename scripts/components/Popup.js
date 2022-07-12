export default class Popup {
	constructor(popupSelector) {
		this._popupSelector = popupSelector;
		this._popupElement = document.querySelector(popupSelector);
	}

	open() {
		this._popupElement.classList.add('popup_opened');
		document.addEventListener('keydown', this._handleEscClose);
	}
	
	close() {
		this._popupElement.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handleEscClose);
	}

	_handleEscClose = (evt) => {
		if (this._popupElement.classList.contains('popup_opened')
			&& evt.key === 'Escape') {
			this.close()
		}
	}

	setEventListeners() {
		this._popupElement.addEventListener('mousedown', (evt) => {
			if (evt.target.classList.contains('popup_opened')) {
				this.close()
			}
			if (evt.target.classList.contains('popup__close-btn')) {
				this.close()
			}
		})
	}
}