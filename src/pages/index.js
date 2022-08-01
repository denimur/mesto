import {
	config,
	options,
	cardListSelector,
	cardTemplateSelector,
	cardFormSelector,
	profileSelector,
	userFormSelector,
	avatarFormSelector,
	avatarPopupSelector,
	confirmPopupSelector,
	imagePopupSelector,
	userPopupSelector,
	cardPopupSelector,
} from "../utils/constants.js";
import { toCamelCase } from "../utils/toCamelCase.js";
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from "../components/Api.js";
import './index.css';

const api = new Api(options);

const userFormValidator = new FormValidator(config, userFormSelector);
userFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, cardFormSelector);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, avatarFormSelector);
avatarFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(imagePopupSelector);
popupWithImage.setEventListeners();

const userPopupWithForm = new PopupWithForm(userPopupSelector, submitUserForm);
userPopupWithForm.setEventListeners();

const popupTypeAvatar = new PopupWithForm(avatarPopupSelector, submitAvatarForm)
popupTypeAvatar.setEventListeners();

const popupTypeConfirm = new PopupWithConfirmation(confirmPopupSelector, submitConfirmForm);
popupTypeConfirm.setEventListeners()

const cardPopupWithForm = new PopupWithForm(cardPopupSelector, submitCardForm);
cardPopupWithForm.setEventListeners();

const userInfo = new UserInfo(profileSelector, openCardPopup, openAvatarPopup, openUserPopup);
userInfo.setEventListeners();

function createCard(cardItem) {
	const card = new Card(cardItem, options.userId, cardTemplateSelector, handleCardClick, handleConfirmPopupOpen, handlePutLike, handleDeleteLike);
	return card.generateCard();
}

const cardListElement = new Section(item => {
	const cardElement = createCard(item);
	cardListElement.addItem(cardElement);
}, cardListSelector);

function renderCards() {
	Promise.all([api.getUserInfo(), api.getInitialCards()])
		.then(([user, initialCards]) => {
			userInfo.setUserInfo(user);
			userInfo.setUserAvatar(user.avatar);
			options.userId = user._id;
			cardListElement.renderItems(initialCards);
		})
		.catch(err => console.log(err))
}
renderCards()

const handleCardClick = ({ name, link }) => {
	popupWithImage.open({ name, link });
}

function handleConfirmPopupOpen(id, remove) {
	popupTypeConfirm._id = id;
	popupTypeConfirm.remove = remove;
	popupTypeConfirm.open();
}

function submitConfirmForm(evt, cardId) {
	evt.preventDefault();
	popupTypeConfirm.renderLoading(true)
	api.deleteCard(cardId)
		.then(popupTypeConfirm.remove())
		.then(popupTypeConfirm.close())
		.catch(err => console.log(err))
		.finally(() => popupTypeConfirm.renderLoading(false))
}

function openAvatarPopup() {
	avatarFormValidator.resetValidation()
	popupTypeAvatar.open()
}

function openUserPopup() {
	const user = userInfo.getUserInfo();
	userPopupWithForm.inputList.forEach(input => {
		input.value = user[toCamelCase(input.name)];
	});

	userFormValidator.resetValidation();
	userPopupWithForm.open();
}

function openCardPopup() {
	cardFormValidator.resetValidation();
	cardPopupWithForm.open();
}

function submitAvatarForm(evt, {avatarLink: avatar}) {
	evt.preventDefault()
	popupTypeAvatar.renderLoading(true)
	api.editUserAvatar({ avatar })
		.then(user => userInfo.setUserAvatar(user.avatar))
		.then(popupTypeAvatar.close())
		.catch(err => console.log(err))
		.finally(() => popupTypeAvatar.renderLoading(false))
}

function submitUserForm(evt, {userName: name, userActivity: about }) {
	evt.preventDefault();
	userPopupWithForm.renderLoading(true)
	api.editUserInfo({ name, about })
		.then(userInfo.setUserInfo({ name, about }))
		.then(userPopupWithForm.close())
		.catch(err => console.log(err))
		.finally(() => userPopupWithForm.renderLoading(false))
}

function submitCardForm(evt, {cardName: name, cardLink: link}) {
	evt.preventDefault();
	cardPopupWithForm.renderLoading(true)
	const card = {name, link} 
	api.addCard(card)
		.then(card => cardListElement.prependItem(createCard(card)))
		.then(cardPopupWithForm.close())
		.catch(err => console.log(err))
		.finally(() => cardPopupWithForm.renderLoading(false))
}

function handlePutLike(cardId) {
	return api.likeCard(cardId)
}

function handleDeleteLike(cardId) {
	return api.dislikeCard(cardId)
}