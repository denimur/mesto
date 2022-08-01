export default class Api {
	constructor(options) {
		this.cohortId = options.cohortId;
		this.token = options.token;
		this._url = 'https://mesto.nomoreparties.co/v1';
	}

	_getResponseData(res) {
    if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
	}

	getInitialCards() {
		return fetch(`${this._url}/${this.cohortId}/cards`, {
		  headers: {
				authorization: this.token
			}
		}).then(res => this._getResponseData(res))
	}

	addCard(card) {
		return fetch(`${this._url}/${this.cohortId}/cards`, {
			method: 'POST',
			headers: {
				authorization: this.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name: card.name, link: card.link})
		}).then(res => this._getResponseData(res))
	}

	deleteCard(cardId) {
		return fetch(`${this._url}/${this.cohortId}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: this.token,
				'Content-Type': 'application/json'
			}
		}).then(res => this._getResponseData(res))
	}

	likeCard(cardId) {
		return fetch(`${this._url}/${this.cohortId}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: {
				authorization: this.token,
				'Content-Type': 'application/json'
			}
		}).then(res => this._getResponseData(res))
	}

	dislikeCard(cardId) {
		return fetch(`${this._url}/${this.cohortId}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: {
				authorization: this.token,
				'Content-Type': 'application/json'
			}
		}).then(res => this._getResponseData(res))
	}

	getUserInfo() {
		return fetch(`https://nomoreparties.co/v1/${this.cohortId}/users/me`, {
		  headers: {
				authorization: this.token
			}
		}).then(res => this._getResponseData(res))
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
		}).then(res => this._getResponseData(res))
	}

	editUserAvatar({avatar}) {
		return fetch(`${this._url}/${this.cohortId}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: this.token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({avatar})
		}).then(res => this._getResponseData(res))
	}
}