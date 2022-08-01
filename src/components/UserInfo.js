export default class UserInfo {
	constructor(profileSelector, openCardPopup, openAvatarPopup, openUserPopup) {
		this._openUserPopup = openUserPopup;
		this._openAvatarPopup = openAvatarPopup;
		this._openCardPopup = openCardPopup;
		this._profileElement = document.querySelector(profileSelector)
		this._nameElement = this._profileElement.querySelector('.profile__name');
		this._activityElement = this._profileElement.querySelector('.profile__activity');
		this._avatarElement = this._profileElement.querySelector('.profile__avatar');
		this._addCardBtn = this._profileElement.querySelector('.profile__add-btn');
		this._editUserAvatarBtn = this._profileElement.querySelector('.profile__overlay');
		this._editUserInfoBtn = this._profileElement.querySelector('.profile__edit-btn');
	}

	getUserInfo() {
		const userInfo = {};
		userInfo.userName = this._nameElement.textContent;
		userInfo.userActivity = this._activityElement.textContent;
		userInfo.avatar = this._avatarElement.src;
		return userInfo;
	}

	setUserInfo({ name, about }) {
		this._nameElement.textContent = name;
		this._activityElement.textContent = about;
	}

	setUserAvatar(avatar) {
		this._avatarElement.src = avatar;
	}

	setEventListeners() {
		this._addCardBtn.addEventListener('click', this._openCardPopup);
		this._editUserAvatarBtn.addEventListener('click', this._openAvatarPopup);
		this._editUserInfoBtn.addEventListener('click', this._openUserPopup);
	}
}