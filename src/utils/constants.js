export const profileElement = document.querySelector('.profile')
export const editUserInfoBtn = profileElement.querySelector('.profile__edit-btn');
export const editUserAvatarBtn = profileElement.querySelector('.profile__overlay');
export const addBtn = profileElement.querySelector('.profile__add-btn');
export const profileNameSelector = '.profile__name';
export const profileActivitySelectior = '.profile__activity';

export const userPopupSelector = '.popup_type_user';
export const cardPopupSelector = '.popup_type_card';
export const imagePopupSelector = '.popup_type_image';
export const userFormSelector = '.form_type_user'; 
export const cardFormSelector = '.form_type_card'; 
export const avatarFormSelector = '.form_type_avatar';

export const cardsElement = document.querySelector('.cards');
export const cardListSelector = '.cards';
export const cardTemplateSelector = '#card-template';
export const myCardTemplateSelector = '#my-card-template';

export const cardDeleteBtn = document.querySelector('.card__delete-btn');

export const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
	submitButtonSelector: '.form__button',
	errorElementSelector: '.form__item-error',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};