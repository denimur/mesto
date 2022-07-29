export default class UserInfo {
	constructor(profileSelector) {
		this._profileElement = document.querySelector(profileSelector)
		this._nameElement = this._profileElement.querySelector('.profile__name');
		this._activityElement = this._profileElement.querySelector('.profile__activity');
		this._avatarElement = this._profileElement.querySelector('.profile__avatar');
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
}