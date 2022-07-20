export default class Api {
	constructor(options) {
		this.cohortId = options.cohortId;
		this.token = options.token;
	}

	getInitialCards() {
		return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/cards`, {
		  headers: {
				authorization: this.token
			}
		})
	}

	getUserInfo() {
		return fetch(`https://nomoreparties.co/v1/${this.cohortId}/users/me`, {
		  headers: {
				authorization: this.token
			}
		})
	}

	editUserInfo({name, about}) {
		return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: this.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				about: about
			})
		})
	}

}