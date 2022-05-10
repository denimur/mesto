let editBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-btn');

let formElement = document.querySelector('.form'); 
let nameInput = formElement.querySelector('.form__item_el_name'); 
let activityInput = formElement.querySelector('.form__item_el_activity');

editBtn.addEventListener('click', function() {
	popup.classList.add('popup_opened');
});

popupCloseBtn.addEventListener('click', function() {
	popup.classList.remove('popup_opened');
	
	nameInput.value = '';
	activityInput.value = '';
});

function formSubmitHandler (evt) {
	evt.preventDefault(); 

	let nameEl = document.querySelector('.profile__name');
	let activityEl = document.querySelector('.profile__activity');

	nameEl.textContent = nameInput.value;
	activityEl.textContent = activityInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', function() {
	popup.classList.remove('popup_opened');
	nameInput.value = '';
	activityInput.value = '';
});