import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(data, popupSelector) {
		super(popupSelector);
		this._name = data.name;
		this._link = data.link;
		this._popupElement = document.querySelector(popupSelector);
		this._popupImage = this._popupElement.querySelector('.popup__image');
		this._popupCaption = this._popupElement.querySelector('.popup__image-description');
	}

	open() {
		super.open();
		this._popupImage.src = this._link;
		this._popupImage.alt = this._name;
		this._popupCaption.textContent = this._name;
	}
}