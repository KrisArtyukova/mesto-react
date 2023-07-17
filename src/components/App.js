import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import { AppContext } from '../contexts/AppContext';

function App() {
  const [cards, setCards] = useState(null);
  const [currentUser, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.getUserInfo()
    .then((userInfo) => {
      setUserInfo(userInfo);
    })
    .catch(() => {
      console.log('Ошибка загрузки пользователя')
    })
    .finally(() => setIsLoading(false));

    api.getInitialCards()
    .then((cards) => {
        setCards(cards);
    })
    .catch(() => {
        console.log('Ошибка загрузки карточек')
    })
    .finally(() => setIsLoading(false));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      setIsLoading(true);
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) => state.map((stateCard) => stateCard._id === card._id ? newCard : stateCard));
      })
      .catch((error) => {
        console.log('Произошла ошибка при удалении лайка', error);
      })
      .finally(() => setIsLoading(false));
    } else {
      setIsLoading(true);
      api.addLike(card._id).then((newCard) => {
        setCards((state) => state.map((stateCard) => stateCard._id === card._id ? newCard : stateCard));
      })
      .catch((error) => {
        console.log('Произошла ошибка при отправке лайка', error);
      })
      .finally(() => setIsLoading(false));
    }
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then(() => {
        setCards((state) => state.filter((stateCard) => stateCard._id !== card._id));
    })
    .catch((error) => {
      console.log('Произошла ошибка при удалении карточки', error);
    })
    .finally(() => setIsLoading(false));
  } 

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api.editUserInfo(userInfo.name, userInfo.about)
    .then((newUserInfo) => {
      setUserInfo(newUserInfo);
      closeAllPopups();
    })
    .catch(() => {
      console.log('Ошибка обновления пользователя')
    })
    .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api.editUserAvatar(avatar)
    .then((newUser) => {
      setUserInfo(newUser);
      closeAllPopups();
    })
    .catch(() => {
      console.log('Ошибка обновления аватара')
    })
    .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit({ cardName, cardLink }) {
    setIsLoading(true);
    api.addCard(cardName, cardLink)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
    })
    .catch(() => {
      console.log('Ошибка обновления аватара')
    })
    .finally(() => setIsLoading(false));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({name: '', link: ''});
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

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <CurrentCardContext.Provider value={cards}>
          <Main
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            handleCardClick={handleCardClick} 
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </CurrentCardContext.Provider>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm isOpen={false} onClose={closeAllPopups} title="Вы уверены" name="delete_card" buttonText="Сохранить" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
