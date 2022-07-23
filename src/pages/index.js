import {
	config,
	cardListSelector,
	cardTemplateSelector,
	cardFormSelector,
	userFormSelector,
	imagePopupSelector,
	userPopupSelector,
	cardPopupSelector,
	profileNameSelector,
	profileActivitySelectior,
	editUserInfoBtn,
	addBtn,
	cardDeleteBtn,
	editUserAvatarBtn
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
	cohortId: 'cohort-46',
	token: 'a7c510e0-05ad-459e-a0d1-31a92d4ef951',
	userId: ''
};

console.log(options)

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

function createCard(cardItem) {
	const card = new Card(cardItem, options, cardTemplateSelector, handleCardClick);
	return card.generateCard();
}

const cardListElement = new Section(item => {
	const cardElement = createCard(item);
	cardListElement.addItem(cardElement);
}, cardListSelector);

function renderCards() {
	api.getInitialCards()
		.then(res => res.ok ? res.json() : Promise.reject(res.status))
		.then(cards => { cardListElement.renderItems(cards); console.log(cards)})
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
		.then(data => {
			userInfo.setUserInfo(data);
			options.userId = data._id;
		})
}
renderUserInfo();

function editUserInfo({name, about}) {
	api.editUserInfo({name, about})
		// .then(res => res.ok ? res.json() : Promise.reject(res.status))
		// .then(user => console.log(user))
}

const popupTypeConfirm = new PopupWithForm('.popup_type_confirm', submitConfirmForm);
popupTypeConfirm.setEventListeners()

function openConfirmPopup() {
	popupTypeConfirm.open();
}

function submitConfirmForm(evt) {
	evt.preventDefault();
	console.log('Confirm')
}

const popupTypeAvatar = new PopupWithForm('.popup_type_avatar', submitAvatarForm)
popupTypeAvatar.setEventListeners();

function openAvatarPopup(evt) {
	console.log(evt.target.children[0])
	popupTypeAvatar.open()
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

function submitAvatarForm(evt) {
	evt.preventDefault()
	console.log("submit avatar");
}

function submitUserForm(evt, {userName: name, userActivity: about }) {
	evt.preventDefault();

	editUserInfo({name, about})
	userInfo.setUserInfo({ name, about });
	userPopupWithForm.close();
}

function submitCardForm(evt, {cardName: name, cardLink: link}) {
	evt.preventDefault();
	const card = {name, link} 

	api.addCard(card)
		.then(res => res.ok ? res.json() : Promise.reject(res.status))
		.then(card => cardListElement.prependItem(createCard(card)))
	
	cardPopupWithForm.close();
}

editUserInfoBtn.addEventListener('click', openUserPopup);
editUserAvatarBtn.addEventListener('click', openAvatarPopup);
addBtn.addEventListener('click', openCardPopup);