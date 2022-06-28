import { initialCards } from "./modules/cardsContent.js";
import Card from "./Сard.js";
import FormValidator from "./FormValidator.js";
	
const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
	submitButtonSelector: '.form__button',
	errorElementSelector: '.form__item-error',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

const userFormValidator = new FormValidator(config, '.form_type_user');
userFormValidator.enableValidation();
const cardFormValidator = new FormValidator(config, '.form_type_card');
cardFormValidator.enableValidation();

const profileElement = document.querySelector('.profile')
const editBtn = profileElement.querySelector('.profile__edit-btn');
const addBtn = profileElement.querySelector('.profile__add-btn');
const nameEl = profileElement.querySelector('.profile__name');
const activityEl = profileElement.querySelector('.profile__activity');

const popupList = document.querySelectorAll('.popup');
const userPopup = document.querySelector('.popup_type_user');
const cardPopup = document.querySelector('.popup_type_card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__image-description');

const userForm = document.querySelector('.form_type_user'); 
const cardForm = document.querySelector('.form_type_card'); 

const userNameInput = userForm.querySelector('.form__item_el_user-name'); 
const userActivityInput = userForm.querySelector('.form__item_el_user-activity');
const cardNameInput = cardForm.querySelector('.form__item_el_card-name'); 
const cardLinkInput = cardForm.querySelector('.form__item_el_card-link');

const cardsElement = document.querySelector('.cards');

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

const handleOpenImagePopup = ({name, link}) => {
	popupImage.src = link;
	popupImage.alt = name;
	popupCaption.textContent = name;
	openPopup(popupTypeImage)
}

const createCard = (item) => {
	const card = new Card(item, '#card-template', handleOpenImagePopup);
	return card.generateCard();
}

const renderCards = (cards) => {
	cards.forEach(item => {
		const cardElement = createCard(item) 
		cardsElement.append(cardElement)
	})
}
renderCards(initialCards);

const openUserPopup = () => {
	userNameInput.value = nameEl.textContent;
	userActivityInput.value = activityEl.textContent;

	userFormValidator.resetValidation();
	openPopup(userPopup);
}

const openCardPopup = () => {
	cardForm.reset();
	cardFormValidator.resetValidation();
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

	const cardElement = createCard(newCard);

	if (newCard.link !== '' && newCard.name !== '') {
		cardsElement.prepend(cardElement);
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