import { initialCards } from "./modules/cardsContent.js";

const profileElement = document.querySelector('.profile')
const editBtn = profileElement.querySelector('.profile__edit-btn');
const addBtn = profileElement.querySelector('.profile__add-btn');
const nameEl = profileElement.querySelector('.profile__name');
const activityEl = profileElement.querySelector('.profile__activity');

const popup = document.querySelectorAll('.popup');
const userPopup = document.querySelector('.popup_type_user');
const cardPopup = document.querySelector('.popup_type_card');
const imagePopup = document.querySelector('.popup_type_image');
const imageOpen = imagePopup.querySelector('.popup__image');
const imageDescription = imagePopup.querySelector('.popup__image-description');

const userFormElement = document.querySelector('.form_type_user'); 
const cardFormElement = document.querySelector('.form_type_card'); 
const userNameInput = userFormElement.querySelector('.form__item_el_user-name'); 
const userActivityInput = userFormElement.querySelector('.form__item_el_user-activity');
const cardNameInput = cardFormElement.querySelector('.form__item_el_card-name'); 
const cardLinkInput = cardFormElement.querySelector('.form__item_el_card-link');
const cardTemplate = document.querySelector('#card-template').content;

const cardsElement = document.querySelector('.cards');

const closeButtons = document.querySelectorAll('.popup__close-btn');

function createCard(card) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);	
	const imageElement = cardElement.querySelector('.card__image');
	imageElement.src = card.link;
	imageElement.alt = card.name;
	cardElement.querySelector('.card__description').textContent = card.name;
	return cardElement
}

function renderCard(card, container) {
	container.prepend(card);
}

function renderCards(cards) {
	cards.forEach(card => renderCard(createCard(card), cardsElement));
}

renderCards(initialCards);

const likeCardHandler = evt => {
	if (evt.target.classList.contains('card__icon')) {
		evt.target.classList.toggle('card__icon_active');
	}
}

function deleteCard(evt) {
	if (evt.target.classList.contains('card__delete-btn')) {
		evt.target.closest('.card').remove();
	}
}

function openPopup(popup) {
	popup.classList.add('popup_opened');
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
}

const closeBtnHandler = (evt) => {
	const popup = evt.target.closest('.popup');
	closePopup(popup)
}

const closePopupHandler = (evt) => {
	if (evt.target.classList.contains('form__button')) {
		closePopup(evt.target.closest('.popup'))
	}
	else if (evt.key === "Escape") {
		closePopup(document.querySelector('.popup_opened'))
	}
	else if (!(evt.target.classList.contains('popup__container'))) {
		closePopup(evt.target)
	}
}

const openImagePopup = (evt) => {
	if (evt.target.classList.contains('card__image')) {
		const card = evt.target.closest('.card');
		imageOpen.src = evt.target.src;
		imageDescription.textContent = card.querySelector('.card__description').textContent;
		openPopup(imagePopup);
	}
}

const openUserPopup = () => {
	userNameInput.value = nameEl.textContent;
	userActivityInput.value = activityEl.textContent;
	
	openPopup(userPopup);
}

const openCardPopup = () => {
	openPopup(cardPopup)
}

function submitUserForm(evt) {
	evt.preventDefault();
	
	nameEl.textContent = userNameInput.value;
	activityEl.textContent = userActivityInput.value;
	
	closePopupHandler(evt);
}

function createNewCard(evt) {
	evt.preventDefault();

	const newCard = {
		name: cardNameInput.value,
		link: cardLinkInput.value
	}

	if (newCard.link !== '' && newCard.name !== '') {
		renderCard(createCard(newCard), cardsElement);
	}

	cardNameInput.value = '';
	cardLinkInput.value = '';
	closePopupHandler(evt);
}

editBtn.addEventListener('click', openUserPopup);
addBtn.addEventListener('click', openCardPopup);
closeButtons.forEach(btn => btn.addEventListener('click', closeBtnHandler));
popup.forEach(p => p.addEventListener('click', closePopupHandler))
document.addEventListener('keydown', closePopupHandler)
userFormElement.addEventListener('submit', submitUserForm);
cardFormElement.addEventListener('submit', createNewCard);
cardsElement.addEventListener('click', likeCardHandler);
cardsElement.addEventListener('click', deleteCard);
cardsElement.addEventListener('click', openImagePopup);