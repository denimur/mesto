export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const profileElement = document.querySelector('.profile')
export const editBtn = profileElement.querySelector('.profile__edit-btn');
export const addBtn = profileElement.querySelector('.profile__add-btn');
export const profileNameSelector = '.profile__name';
export const profileActivitySelectior = '.profile__activity';

export const userPopupSelector = '.popup_type_user';
export const cardPopupSelector = '.popup_type_card';
export const imagePopupSelector = '.popup_type_image';
export const userFormSelector = '.form_type_user'; 
export const cardFormSelector = '.form_type_card'; 

export const cardsElement = document.querySelector('.cards');
export const cardListSelector = '.cards';
export const templateSelector = '#card-template';

export const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
	submitButtonSelector: '.form__button',
	errorElementSelector: '.form__item-error',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};