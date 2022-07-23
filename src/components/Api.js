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

	addCard(card) {
		return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/cards`, {
			method: 'POST',
			headers: {
				authorization: this.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name: card.name, link: card.link})
		})
	}

	deleteCard(card) {
		return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/cards/${card._id}`, {
			method: 'DELETE',
			headers: {
				authorization: this.token,
				'Content-Type': 'application/json'
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
				name,
				about
			})
		})
	}

	editUserAvatar(avatar) {
		return fetch(`https://mesto.nomoreparties.co/v1/${this.cohortId}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: this.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({avatar})
		})
	}

}