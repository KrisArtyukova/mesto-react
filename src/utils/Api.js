import { USER_TOKEN } from "./constants";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _request(url, options) {
    const res = await fetch(`${this._baseUrl}/${url}`, options);
    return this._checkResponse(res);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getInitialCards() {
    return await this._request("/cards", {
      headers: {
        authorization: this._headers.authorization,
      }
    });
  }

  async addCard(name, link) {
    return await this._request("/cards", {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      })
    });
  }

  async deleteCard(id) {
    return await this._request(`/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
      }
    });
  }

  async addLike(id) {
    return await this._request(`/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._headers.authorization,
      }
    });
  }

  async deleteLike(id) {
    return await this._request(`/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
      }
    });
  }

  async getUserInfo() {
    return await this._request("/users/me", {
      headers: {
        authorization: this._headers.authorization,
      }
    });
  }

  async editUserInfo(name, about) {
    return await this._request("/users/me", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      })
    });
  }

  async editUserAvatar(avatar) {
    return await this._request("/users/me/avatar", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      })
    });
  }

}

class AuthApi extends Api {
  constructor(options) {
    super(options);
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async registrate(password, email) {
    return await super._request("signup", {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      })
    });
  }

  async login(password, email) {
    return await super._request("signin", {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      })
    });
  }

  async checkAuth() {
    const token = localStorage.getItem(USER_TOKEN);
    if (!token) throw new Error('Отсутствует токен');
    
    return await super._request("users/me", {
      method: 'GET',
      headers: { ...this._headers, "Authorization": `Bearer ${token}`},
    });
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'ad409708-ab6d-48ec-b3a6-3e6c2313ee38',
    'Content-Type': 'application/json'
  }
});

export const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});