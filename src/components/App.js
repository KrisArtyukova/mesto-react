import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import Card from './Card';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState();
  const [selectedCard, setSelectedCard] = useState();

  useEffect(() => {
    api.getInitialCards()
    .then((cards) => {
        setCards(cards);
    })
    .catch(() => {
        console.log('Ошибка загрузки карточек')
    })
}, []);

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  function handleImagePopupClose() {
    setSelectedCard(undefined);
  }

  return (
    <>
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
      <div className="elements">
        {cards?.map(card => <Card card={card} onCardClick={handleCardClick} />)}
      </div>
      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title="Редактировать профиль" name="edit_profile">
        <div className="form__input-container">
            <input className="form__input form__input_type_name popup__input" placeholder="Введите имя" name="name" id="name" required minLength="2" maxLength="40" />
            <p className="popup__error popup__error_visible" id="error-name"></p>
          </div>
          <div className="form__input-container">
            <input className="form__input form__input_type_info popup__input" placeholder="О себе" name="info" id="info" required minLength="2" maxLength="200" />
            <p className="popup__error popup__error_visible" id="error-info"></p>
        </div>
        <button className="form__btn popup__button popup__button_disabled" type="submit">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} title="Новое место" name="cards_add">
        <div className="form__input-container">
          <input className="form__input form__input_type_title popup__input" placeholder="Название" name="title" id="title" required minLength="2" maxLength="30" />
          <p className="popup__error popup__error_visible" id="error-title"></p>
        </div>
        <div className="form__input-container">
          <input className="form__input form__input_type_src popup__input" placeholder="Ссылка на картинку" name="link" id="link" type="url" required />
          <p className="popup__error popup__error_visible" id="error-link"></p>
        </div>
        <button className="form__btn popup__button popup__button_disabled" type="submit">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title="Обновить аватар" name="edit_avatar">
        <div className="form__input-container">
          <input className="form__input form__input_type_src popup__input" placeholder="Ссылка на аватар" name="link" id="linkAvatar" type="url" required />
          <p className="popup__error popup__error_visible" id="error-link-avatar"></p>
        </div>
        <button className="form__btn popup__button popup__button_disabled" type="submit">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title="Вы уверены" name="delete_card">
        <button className="form__btn popup__button" type="submit">Да</button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={handleImagePopupClose} />
      <Footer />
    </>
  );
}

export default App;
