export default class Card {
	constructor(
		data,
		{ userId },
		templateSelector,
		handleCardClick,
		handleConfirmPopupOpen
	)
	{
		this._name = data.name;
		this._link = data.link;
		this._id = data._id;
		this._ownerId = data.owner._id;
		this._userId = userId;
		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
		this._handleConfirmPopupOpen = handleConfirmPopupOpen;
		// this._submitConfirmForm = submitConfirmForm;
		this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
		this._cardImage = this._cardElement.querySelector('.card__image');
		this._cardDescription = this._cardElement.querySelector('.card__description');
		this._cardLikeButton = this._cardElement.querySelector('.card__icon');
		this._cardDeleteButton = this._cardElement.querySelector('.card__delete-btn');
	}

	generateCard = () => {
		this._cardImage.src = this._link;
		this._cardImage.alt = this._name;
		this._cardDescription.textContent = this._name;
		if (this._ownerId === this._userId) {
			this._cardDeleteButton.classList.remove('card__delete-btn_disabled')
		}

		this._setEventListeners();

		return this._cardElement;
	}

	_handleImageClick = () => {
		this._handleCardClick({ name: this._name, link: this._link });
	}

	_handleLikeCard = () => {
		this._cardLikeButton.classList.toggle('card__icon_active');
	}

	_handleDeleteBtnClick = () => {
		this._handleConfirmPopupOpen(this._id, this.remove)
		// this._submitConfirmForm(this._id)
		// console.dir(this._id)
	}
	
	remove = () => {
		this._cardElement.remove();
	}

	_setEventListeners = () => {
    this._cardImage.addEventListener('click', this._handleImageClick);
		this._cardLikeButton.addEventListener('click', this._handleLikeCard);
		this._cardDeleteButton.addEventListener('click', this._handleDeleteBtnClick);
  }
}