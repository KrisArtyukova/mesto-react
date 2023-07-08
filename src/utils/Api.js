class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._headers.authorization,
      }
    });
    return this._checkResponse(res);
  // другие методы работы с API
  }

  async addCard(name, link) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type'],
      },
      body: JSON.stringify({
        name,
        link,
      })
    });
    return this._checkResponse(res);
  // другие методы работы с API
  }

  async deleteCard(id) {
   const res = await fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
      }
    });
    return this._checkResponse(res);
  // другие методы работы с API
  }

  async addLike(id) {
    const res = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._headers.authorization,
      }
    });
    return this._checkResponse(res);
  // другие методы работы с API
  }

  async deleteLike(id) {
    const res = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
      }
    });
    return this._checkResponse(res);
  // другие методы работы с API
  }

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization,
      }
    });
    return this._checkResponse(res);
  // другие методы работы с API
  }

  async editUserInfo(name, about) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type'],
      },
      body: JSON.stringify({
        name,
        about,
      })
    });
    return this._checkResponse(res);
  // другие методы работы с API
  }

  async editUserAvatar(avatar) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type'],
      },
      body: JSON.stringify({
        avatar,
      })
    });
    return this._checkResponse(res);
  // другие методы работы с API
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'ad409708-ab6d-48ec-b3a6-3e6c2313ee38',
    'Content-Type': 'application/json'
  }
});
