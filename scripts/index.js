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
	document.addEventListener('keydown', closePopupByEsc)
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closePopupByEsc)
}

const closePopupByEsc = (evt) => {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_opened') 
		closePopup(openedPopup)
  }
}

const openImagePopup = (evt) => {
	const card = evt.target.closest('.card');
	imageOpen.src = evt.target.src;
	imageDescription.textContent = card.querySelector('.card__description').textContent;
	imageOpen.alt = imageDescription.textContent;
	openPopup(imagePopup);
}

function createCard(card) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const imageElement = cardElement.querySelector('.card__image');

	imageElement.src = card.link;
	imageElement.alt = card.name;
	cardElement.querySelector('.card__description').textContent = card.name;

	imageElement.addEventListener('click', openImagePopup)
	cardElement.addEventListener('click', deleteCard)
	cardElement.addEventListener('click', likeCardHandler)

	return cardElement
}

function renderCard(card, container) {
	container.prepend(card);
}

function renderCards(cards) {
	cards.forEach(card => renderCard(createCard(card), cardsElement));
}

renderCards(initialCards);

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
	
	closePopup(userPopup)
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
	closePopup(cardPopup);
}

editBtn.addEventListener('click', openUserPopup);
addBtn.addEventListener('click', openCardPopup);
userForm.addEventListener('submit', submitUserForm);
cardForm.addEventListener('submit', createNewCard);
popupList.forEach(popup => popup.addEventListener('mousedown', (evt) => {
	if (evt.target.classList.contains('popup_opened')) {
		closePopup(popup)
	}
	if (evt.target.classList.contains('popup__close-btn')) {
		closePopup(popup)
	}
}));