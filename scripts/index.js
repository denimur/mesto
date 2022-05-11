const profileElement = document.querySelector('.profile')
const editBtn = profileElement.querySelector('.profile__edit-btn');
const nameEl = profileElement.querySelector('.profile__name');
const activityEl = profileElement.querySelector('.profile__activity');

const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');

const formElement = document.querySelector('.form'); 
const nameInput = formElement.querySelector('.form__item_el_name'); 
const activityInput = formElement.querySelector('.form__item_el_activity');

function popupOpen() {
	popup.classList.add('popup_opened');

	nameInput.value = nameEl.textContent;
	activityInput.value = activityEl.textContent;
}

function popupClose() {
	popup.classList.remove('popup_opened');
	
}


function formSubmitHandler(evt) {
	evt.preventDefault();
	
	nameEl.textContent = nameInput.value;
	activityEl.textContent = activityInput.value;

	popupClose();
}

editBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);
