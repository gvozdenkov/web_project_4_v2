export default class Api {
  constructor({ token, group, adress }) {
    this._token = token;
    this._group = group;
    this._adress = adress;
  }

  getApiInfo() {
    return Promise.all([this.getUserInfo(), this.getCardList()]);
  }

  getUserInfo() {
    return fetch(`${this._adress}/${this._group}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error ${res.status}: ${res.statusText}`)
    );
  }

  getCardList() {
    return fetch(`${this._adress}/${this._group}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error ${res.status}: ${res.statusText}`)
    );
  }
}