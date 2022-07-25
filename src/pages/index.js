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
import PopupConfirm from './../components/PopupConfirm.js';
import Api from "../components/Api.js";
import './index.css';

const options = {
	cohortId: 'cohort-46',
	token: 'a7c510e0-05ad-459e-a0d1-31a92d4ef951',
};

// console.log(options)

const api = new Api(options);

const userFormValidator = new FormValidator(config, userFormSelector);
userFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, cardFormSelector);
cardFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(imagePopupSelector);
popupWithImage.setEventListeners();

const userPopupWithForm = new PopupWithForm(userPopupSelector, submitUserForm);
userPopupWithForm.setEventListeners();
const userInfo = new UserInfo('.profile');


function renderUserInfo() {
	api.getUserInfo()
		.then(data => {
			userInfo.setUserInfo(data);
			console.log(data)
		})
}
renderUserInfo();

const handleCardClick = ({ name, link }) => {
	popupWithImage.open({ name, link });
}

function createCard(cardItem) {
	const card = new Card(cardItem, {userId: options.userId}, cardTemplateSelector, handleCardClick, handleConfirmPopupOpen);
	return card.generateCard();
}

const cardListElement = new Section(item => {
	const cardElement = createCard(item);
	cardListElement.addItem(cardElement);
}, cardListSelector);

function renderCards() {
	Promise.all([api.getUserInfo(), api.getInitialCards()])
		.then(responses => {
			options.userId = responses[0]._id;
			cardListElement.renderItems(responses[1]);
		})
		.catch(err => console.log(`Error ${err}`))
}
renderCards()

// cardListElement.renderItems(initialCards);

const popupTypeConfirm = new PopupConfirm('.popup_type_confirm', submitConfirmForm);
popupTypeConfirm.setEventListeners()

function handleConfirmPopupOpen(id, remove) {
// записываем данные в поля класса popupTypeConfirm
	popupTypeConfirm._id = id;
// ссылка на метод удаления карточки из DOM
	popupTypeConfirm.remove = remove;
	popupTypeConfirm.open();
}


function submitConfirmForm(evt, cardId) {
	evt.preventDefault();

	api.deleteCard(cardId)
		.then(popupTypeConfirm.remove())
		.catch(err => console.log(err))
	popupTypeConfirm.close()
}

const popupTypeAvatar = new PopupWithForm('.popup_type_avatar', submitAvatarForm)
popupTypeAvatar.setEventListeners();

function openAvatarPopup() {
	// console.log(popupTypeAvatar._getInputValues())
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

function submitAvatarForm(evt, {avatarLink: avatar}) {
	evt.preventDefault()

	api.editUserAvatar({ avatar })
		.then(user => userInfo.setUserAvatar(user.avatar))
		.catch(err => console.log(err))
	console.log(avatar);
	console.log(userInfo.getUserInfo())

	popupTypeAvatar.close();
}

function submitUserForm(evt, {userName: name, userActivity: about }) {
	evt.preventDefault();

	api.editUserInfo({name, about})
	userInfo.setUserInfo({ name, about });
	userPopupWithForm.close();
}

function submitCardForm(evt, {cardName: name, cardLink: link}) {
	evt.preventDefault();
	const card = {name, link} 

	api.addCard(card)
		.then(card => cardListElement.prependItem(createCard(card)))
	
	cardPopupWithForm.close();
}

editUserInfoBtn.addEventListener('click', openUserPopup);
editUserAvatarBtn.addEventListener('click', openAvatarPopup);
addBtn.addEventListener('click', openCardPopup);