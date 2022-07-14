import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImage = this._popupElement.querySelector('.popup__image');
		this._popupCaption = this._popupElement.querySelector('.popup__image-description');
	}

	open(image) {
		super.open();
		this._popupImage.src = image.link;
		this._popupImage.alt = image.name;
		this._popupCaption.textContent = image.name;
	}
}