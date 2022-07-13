export default class UserInfo {
	constructor(nameSelector, activitySelectior) {
		this._nameElement = document.querySelector(nameSelector);
		this._activityElement = document.querySelector(activitySelectior);
	}

	getUserInfo() {
		const userInfo = {};
		userInfo.userName = this._nameElement.textContent;
		userInfo.userActivity = this._activityElement.textContent;
		return userInfo;
	}

	setUserInfo({name, activity}) {
		this._nameElement.textContent = name;
		this._activityElement.textContent = activity;
	}
}