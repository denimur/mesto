export default class Api {
	constructor(options) {
		this.cohortId = options.cohortId;
		this.token = options.token;
		this._url = 'https://mesto.nomoreparties.co/v1';
	}

	getInitialCards() {
		return fetch(`${this._url}/${this.cohortId}/cards`, {
		  headers: {
				authorization: this.token
			}
		}).then(res => res.ok ? res.json() : Promise.reject(res.status))
	}

	addCard(card) {
		return fetch(`${this._url}/${this.cohortId}/cards`, {
			method: 'POST',
			headers: {
				authorization: this.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name: card.name, link: card.link})
		}).then(res => res.ok ? res.json() : Promise.reject(res.status))
	}

	deleteCard(cardId) {
		return fetch(`${this._url}/${this.cohortId}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: this.token,
				'Content-Type': 'application/json'
			}
		}).then(res => res.ok ? res.json() : Promise.reject(res.status))
	}

	getUserInfo() {
		return fetch(`https://nomoreparties.co/v1/${this.cohortId}/users/me`, {
		  headers: {
				authorization: this.token
			}
		}).then(res => res.ok ? res.json() : Promise.reject(res.status))
	}

	editUserInfo({name, about}) {
		return fetch(`${this._url}/${this.cohortId}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: this.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				about
			})
		}).then(res => res.ok ? res.json() : Promise.reject(res.status))
	}

	editUserAvatar({avatar}) {
		return fetch(`${this._url}/${this.cohortId}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: this.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({avatar})
		}).then(res => res.ok ? res.json() : Promise.reject(res.status))
	}
}