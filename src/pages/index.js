import {
	initialCards,
	config,
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
} from "../utils/constants.js";
import { toCamelCase } from "../utils/toCamelCase.js";
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js";
import './index.css';

const options = {
	cohortId: 'cohort-46', token: 'a7c510e0-05ad-459e-a0d1-31a92d4ef951'
};

const api = new Api(options);

const userFormValidator = new FormValidator(config, userFormSelector);
userFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, cardFormSelector);
cardFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(imagePopupSelector);
popupWithImage.setEventListeners();

const handleCardClick = ({ name, link }) => {
	popupWithImage.open({ name, link });
}

const createCard = (cardItem) => {
	const card = new Card(cardItem, templateSelector, handleCardClick);
	return card.generateCard();
}

function renderCards() {
	const cardListElement = new Section(item => {
			const cardElement = createCard(item);
			cardListElement.addItem(cardElement);
	}, cardListSelector);
	
	api.getInitialCards()
		.then(res => res.ok ? res.json() : Promise.reject(res.status))
		.then(result => cardListElement.renderItems(result))
		.catch(err => console.log(`Error ${err}`))
}
renderCards()


// cardListElement.renderItems(initialCards);

const userPopupWithForm = new PopupWithForm(userPopupSelector, submitUserForm);
userPopupWithForm.setEventListeners();
const userInfo = new UserInfo('.profile');

function renderUserInfo() {
	api.getUserInfo()
		.then(res => res.ok ? res.json() : Promise.reject(res.status))
		.then(data => userInfo.setUserInfo(data))
}
renderUserInfo();

function editUserInfo({name, about}) {
	api.editUserInfo({name, about})
		// .then(res => res.ok ? res.json() : Promise.reject(res.status))
		// .then(user => console.log(user))
}


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

function submitUserForm(evt, {userName: name, userActivity: about }) {
	evt.preventDefault();

	editUserInfo({name, about})
	userInfo.setUserInfo({ name, about });
	userPopupWithForm.close();
}

function submitCardForm(evt, {cardName: name, cardLink: link}) {
	evt.preventDefault();

	const cardElement = createCard({ name, link });
	cardListElement.prependItem(cardElement);
	cardPopupWithForm.close();
}

editBtn.addEventListener('click', openUserPopup);
addBtn.addEventListener('click', openCardPopup);