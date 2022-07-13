import {
	initialCards,
	config,
	cardsElement,
	cardListSelector,
	templateSelector,
	cardFormSelector,
	userFormSelector,
	imagePopupSelector,
	userPopupSelector,
	cardPopupSelector,
	profileNameSelector,
	profileActivitySelectior,
	editBtn,
	addBtn
} from "./utils/constants.js";
import { toCamelCase } from "./utils/toCamelCase.js";
import Card from "./components/Сard.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import '../pages/index.css';


const userFormValidator = new FormValidator(config, userFormSelector);
userFormValidator.enableValidation();
const cardFormValidator = new FormValidator(config, cardFormSelector);
cardFormValidator.enableValidation();

const handleCardClick = ({name, link}) => {
	const popupWithImage = new PopupWithImage({ name, link }, imagePopupSelector);
	popupWithImage.setEventListeners();
	popupWithImage.open();
}

const createCard = (cardItem) => {
	const card = new Card(cardItem, templateSelector, handleCardClick);
	return card.generateCard();
}

const cardListElement = new Section({
	items: initialCards, renderer: (item) => {
		const cardElement = createCard(item);

		cardListElement.addItem(cardElement);
	}
}, cardListSelector);

cardListElement.renderItems();

const userPopupWithForm = new PopupWithForm(userPopupSelector, submitUserForm);
userPopupWithForm.setEventListeners();
const userInfo = new UserInfo(profileNameSelector, profileActivitySelectior);

const openUserPopup = () => {
	const user = userInfo.getUserInfo();
	userPopupWithForm.inputList.forEach(input => {
		input.value = user[toCamelCase(input.name)];
	});

	userFormValidator.resetValidation();
	userPopupWithForm.open();
}

const cardPopupWithForm = new PopupWithForm(cardPopupSelector, submitCardForm);
cardPopupWithForm.setEventListeners();

const openCardPopup = () => {
	cardFormValidator.resetValidation();
	cardPopupWithForm.open();
}

function submitUserForm(evt, {userName: name, userActivity: activity}) {
	evt.preventDefault();

	userInfo.setUserInfo({ name, activity });
	userPopupWithForm.close();
}

function submitCardForm(evt, {cardName: name, cardLink: link}) {
	evt.preventDefault();

	const cardElement = createCard({ name, link });
	
	if (name !== '' && link !== '') {
		cardsElement.prepend(cardElement);
	}

	cardPopupWithForm.close();
}

editBtn.addEventListener('click', openUserPopup);
addBtn.addEventListener('click', openCardPopup);