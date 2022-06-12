import { initialCards } from "./modules/cardsContent.js";
import { toggleButtonState } from "./validate.js";

const profileElement = document.querySelector('.profile')
const editBtn = profileElement.querySelector('.profile__edit-btn');
const addBtn = profileElement.querySelector('.profile__add-btn');
const nameEl = profileElement.querySelector('.profile__name');
const activityEl = profileElement.querySelector('.profile__activity');

const popupList = document.querySelectorAll('.popup');
const userPopup = document.querySelector('.popup_type_user');
const cardPopup = document.querySelector('.popup_type_card');
const imagePopup = document.querySelector('.popup_type_image');
const imageOpen = imagePopup.querySelector('.popup__image');
const imageDescription = imagePopup.querySelector('.popup__image-description');

const userForm = document.querySelector('.form_type_user'); 
const cardForm = document.querySelector('.form_type_card'); 
const userSubmitBtn = userForm.querySelector('.form__button');
const userNameInput = userForm.querySelector('.form__item_el_user-name'); 
const userActivityInput = userForm.querySelector('.form__item_el_user-activity');
const cardSubmitBtn = cardForm.querySelector('.form__button');
const cardNameInput = cardForm.querySelector('.form__item_el_card-name'); 
const cardLinkInput = cardForm.querySelector('.form__item_el_card-link');
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
	document.addEventListener('keydown', closePopupHandler, {once: true})
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
}

const closePopupHandler = (evt) => {
	const popupOpened = document.querySelector('.popup_opened');

	if (evt.target.classList.contains('form__button')) {
		closePopup(evt.target.closest('.popup'))
	}
	else if (evt.target.classList.contains('popup__close-btn')) {
		closePopup(evt.target.closest('.popup'))
	}
	else if (popupOpened && evt.key === "Escape") {
		closePopup(popupOpened)
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

const resetErrorFields = (form) => {
	const errorElList = form.querySelectorAll('.form__item-error');
	const inputList = form.querySelectorAll('.form__item');
	errorElList.forEach(errorEl => errorEl.textContent = '');
	inputList.forEach(input => input.style.borderBottom = '1px solid rgba(0, 0, 0, .2)');
}

const openUserPopup = () => {
	userNameInput.value = nameEl.textContent;
	userActivityInput.value = activityEl.textContent;

	resetErrorFields(userForm)
	toggleButtonState(userForm, userSubmitBtn);
	openPopup(userPopup);
}

const openCardPopup = () => {
	toggleButtonState(cardForm, cardSubmitBtn);
	resetErrorFields(cardForm);

	cardForm.reset();
	openPopup(cardPopup);
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

	evt.target.reset();
	closePopupHandler(evt);
}

editBtn.addEventListener('click', openUserPopup);
addBtn.addEventListener('click', openCardPopup);
closeButtons.forEach(btn => btn.addEventListener('click', closePopupHandler));
popupList.forEach(p => p.addEventListener('mousedown', closePopupHandler));
userForm.addEventListener('submit', submitUserForm);
cardForm.addEventListener('submit', createNewCard);
cardsElement.addEventListener('click', likeCardHandler);
cardsElement.addEventListener('click', deleteCard);
cardsElement.addEventListener('click', openImagePopup);