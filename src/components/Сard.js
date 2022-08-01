export default class Card {
	constructor(
		data,
		userId,
		templateSelector,
		handleCardClick,
		handleConfirmPopupOpen,
		handlePutLike,
		handleDeleteLike,
		likesCount
	)
	{
		this._name = data.name;
		this._link = data.link;
		this._id = data._id;
		this._ownerId = data.owner._id;
		this._userId = userId;
		this._likes = data.likes;
		this._templateSelector = templateSelector;
		this._handlePutLike = handlePutLike;
		this._handleDeleteLike = handleDeleteLike;
		this._likesCount = likesCount;
		this._handleCardClick = handleCardClick;
		this._handleConfirmPopupOpen = handleConfirmPopupOpen;
		this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
		this._cardImage = this._cardElement.querySelector('.card__image');
		this._cardDescription = this._cardElement.querySelector('.card__description');
		this._cardLikeButton = this._cardElement.querySelector('.like-group__icon');
		this._cardLikeCount = this._cardElement.querySelector('.like-group__count')
		this._cardDeleteButton = this._cardElement.querySelector('.card__delete-btn');
	}

	generateCard = () => {
		this._cardImage.src = this._link;
		this._cardImage.alt = this._name;
		this._cardDescription.textContent = this._name;
		this._cardLikeCount.textContent = this._likes.length;
		if (this._ownerId === this._userId) {
			this._cardDeleteButton.classList.remove('card__delete-btn_disabled')
		}

		for (let user of this._likes) {
			if (user._id === this._userId) {
				this._cardLikeButton.classList.add('like-group__icon_active');
			}
		}

		this._setEventListeners();

		return this._cardElement;
	}

	_handleImageClick = () => {
		this._handleCardClick({ name: this._name, link: this._link });
	}
	
	_renderLike = (card) => {
		this._cardLikeCount.textContent = card.likes.length
		this._cardLikeButton.classList.toggle('like-group__icon_active')
	}

	_handleLikeCard = () => {
		if (!this._isLiked()) {
			this._handlePutLike(this._id)
				.then(card => this._renderLike(card))
		}
		else {
			this._handleDeleteLike(this._id)
				.then(card => this._renderLike(card))
		}
	}

	_isLiked = () => {
		return this._cardLikeButton.classList.contains('like-group__icon_active') ? true : false;
	}

	_handleDeleteBtnClick = () => {
		this._handleConfirmPopupOpen(this._id, this.remove);
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