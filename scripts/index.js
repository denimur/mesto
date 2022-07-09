import {
	initialCards,
	config,
	popupImage,
	popupCaption,
	popupTypeImage,
	cardsElement,
	cardListSelector,
	templateSelector,
	nameEl,
	activityEl,
	userNameInput,
	userActivityInput,
	cardNameInput,
	cardLinkInput,
	editBtn,
	addBtn,
	userForm,
	cardForm,
	popupList,
	cardPopup,
	userPopup
} from "./utils/constants.js";
import Card from "./components/Сard.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from './components/PopupWithImage.js';


const userFormValidator = new FormValidator(config, '.form_type_user');
userFormValidator.enableValidation();
const cardFormValidator = new FormValidator(config, '.form_type_card');
cardFormValidator.enableValidation();


const handleOpenImagePopup = ({name, link}) => {
	// popupImage.src = link;
	// popupImage.alt = name;
	// popupCaption.textContent = name;
	// openPopup(popupTypeImage)
	const popupWithImage = new PopupWithImage({ name, link }, '.popup_type_image');
	popupWithImage.setEventListeners();
	popupWithImage.open();
}

const createCard = (cardItem) => {
	const card = new Card(cardItem, templateSelector, handleOpenImagePopup);
	return card.generateCard();
}

const cardListElement = new Section({
	items: initialCards, renderer: (item) => {
		const cardElement = createCard(item);

		cardListElement.addItem(cardElement)
	}
}, cardListSelector)

cardListElement.renderItems()

// function openPopup(popup) {
// 	popup.classList.add('popup_opened');
// 	document.addEventListener('keydown', closePopupByEsc)
// }

// function closePopup(popup) {
// 	popup.classList.remove('popup_opened');
// 	document.removeEventListener('keydown', closePopupByEsc)
// }

// const closePopupByEsc = (evt) => {
// 	if (evt.key === 'Escape') {
// 		const openedPopup = document.querySelector('.popup_opened') 
// 		closePopup(openedPopup)
//   }
// }



// const renderCards = (cards) => {
// 	cards.forEach(item => {
// 		const cardElement = createCard(item) 
// 		cardsElement.append(cardElement)
// 	})
// }
// renderCards(initialCards);

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
// popupList.forEach(popup => popup.addEventListener('mousedown', (evt) => {
// 	if (evt.target.classList.contains('popup_opened')) {
// 		closePopup(popup)
// 	}
// 	if (evt.target.classList.contains('popup__close-btn')) {
// 		closePopup(popup)
// 	}
// }));