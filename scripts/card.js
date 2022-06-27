export default class Card {
	constructor(data, templateSelector, handleOpenImagePopup) {
		this._name = data.name
		this._link = data.link;
		this._templateSelector = templateSelector;
		this._handleOpenImagePopup = handleOpenImagePopup;
	}

	_getTemplate() {
		const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
		return cardElement;
	}

	generateCard() {
		this._element = this._getTemplate();

		const cardImage = this._element.querySelector('.card__image');
		cardImage.src = this._link;
		cardImage.alt = this._name;
		this._element.querySelector('.card__description').textContent = this._name;

		this._setEventListeners()

		return this._element;
	}

	_handleImageClick = () => {
		this._handleOpenImagePopup({name: this._name, link: this._link})
	}

	_handleLikeCard = () => {
		this._element.querySelector('.card__icon').classList.toggle('card__icon_active')
	}

	_handleDeleteCard = () => {
		this._element.remove()
	}

	_setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', this._handleImageClick);
		this._element.querySelector('.card__icon').addEventListener('click', this._handleLikeCard);
		this._element.querySelector('.card__delete-btn').addEventListener('click', this._handleDeleteCard);
  }
}