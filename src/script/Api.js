class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    getUserInfo() {
        return fetch(this.url + `users/me`, {
            headers: this.headers
        })
            .then(res => this._getResponseData(res))
    }

    patchUserInfo(name, about) {
        return fetch(this.url + `users/me`, {
            method: 'PATCH',
            headers: this.headers,

            body: JSON.stringify({
                name: name.value,
                about: about.value
            })
        })
            .then(res => this._getResponseData(res))
    }

    getCardList() {
        return fetch(this.url + `cards`, {
            headers: this.headers
        })
            .then(res => this._getResponseData(res))
    }

    addCard(name, link) {
        return fetch(this.url + `cards`, {
            method: 'POST',
            headers: this.headers,

            body: JSON.stringify({
                name: name.value,
                link: link.value
            })
        })
            .then(res => this._getResponseData(res))
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
}