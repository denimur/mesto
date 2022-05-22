const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileElement = document.querySelector('.profile')
const editBtn = profileElement.querySelector('.profile__edit-btn');
const addBtn = profileElement.querySelector('.profile__add-btn');
const nameEl = profileElement.querySelector('.profile__name');
const activityEl = profileElement.querySelector('.profile__activity');

const userPopup = document.querySelector('.popup_type_user');
const cardPopup = document.querySelector('.popup_type_card');
const imagePopup = document.querySelector('.popup_type_image');
const imageOpen = imagePopup.querySelector('.popup__image');
let imageDescription = imagePopup.querySelector('.popup__image-description');

const userFormElement = document.querySelector('.form_type_user'); 
const cardFormElement = document.querySelector('.form_type_card'); 
const userNameInput = userFormElement.querySelector('.form__item_el_user-name'); 
const userActivityInput = userFormElement.querySelector('.form__item_el_user-activity');
const cardNameInput = cardFormElement.querySelector('.form__item_el_card-name'); 
const cardLinkInput = cardFormElement.querySelector('.form__item_el_card-link');

const cardsElement = document.querySelector('.cards');

function cardDelete(evt) {
	if (evt.target.classList.contains('card__delete-btn')) {
		evt.target.closest('.card').remove()
	}
}

function cardsRender(cards) {
	cards.forEach(card => cardRender(card));
}

function cardRender(card) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	cardElement.querySelector('.card__image').src = card.link;
	cardElement.querySelector('.card__description').textContent = card.name;
	cardsElement.prepend(cardElement);
}

cardsRender(initialCards);

const cardLikeHandler = evt => {
	if (evt.target.classList.contains('card__icon')) {
		evt.target.classList.toggle('card__icon_active');
	}
}

const imagePopupOpen = (evt) => {
	if (evt.target.classList.contains('card__image')) {
		const card = evt.target.closest('.card')
		imageOpen.src = evt.target.src;
		imageDescription.textContent = card.querySelector('.card__description').textContent;
		imagePopup.classList.add('popup_opened');
	}
}

const userPopupOpen = () => {
	userPopup.classList.add('popup_opened');
	
	userNameInput.value = nameEl.textContent;
	userActivityInput.value = activityEl.textContent;
}

const cardPopupOpen = () => {
	cardPopup.classList.add('popup_opened')
}

const popupClose = (evt) => {
	if (evt.target.classList.contains('popup__close-btn')
		|| evt.target.classList.contains('form__button')) {
		const popup = evt.target.closest('.popup');
		popup.classList.remove('popup_opened');
	}
}

function userFormSubmitHandler(evt) {
	evt.preventDefault();
	
	nameEl.textContent = userNameInput.value;
	activityEl.textContent = userActivityInput.value;
	
	popupClose(evt);
}

function cardCreateHandler(evt) {
	evt.preventDefault();

	let newCard = {
		name: cardNameInput.value,
		link: cardLinkInput.value
	}
	if (newCard.link !== '' && newCard.name !== '') {
		cardRender(newCard);
	}
	else {
		cardNameInput.value = '';
		cardLinkInput.value = '';
		return
	}

	cardNameInput.value = '';
	cardLinkInput.value = '';
	popupClose(evt);
}

editBtn.addEventListener('click', userPopupOpen);
addBtn.addEventListener('click', cardPopupOpen);
document.addEventListener('click', popupClose);
userFormElement.addEventListener('submit', userFormSubmitHandler);
cardFormElement.addEventListener('submit', cardCreateHandler);
cardsElement.addEventListener('click', cardLikeHandler);
cardsElement.addEventListener('click', cardDelete);
cardsElement.addEventListener('click', imagePopupOpen);