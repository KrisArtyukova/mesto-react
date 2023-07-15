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

function App() {
  const [cards, setCards] = useState();
  const [currentUser, setUserInfo] = useState();
  const [selectedCard, setSelectedCard] = useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  useEffect(() => {
    api.getUserInfo()
    .then((userInfo) => {
      setUserInfo(userInfo);
    })
    .catch(() => {
      console.log('Ошибка загрузки пользователя')
    })

    api.getInitialCards()
    .then((cards) => {
        setCards(cards);
    })
    .catch(() => {
        console.log('Ошибка загрузки карточек')
    })
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) => state.map((stateCard) => stateCard._id === card._id ? newCard : stateCard));
      });
    } else {
      api.addLike(card._id).then((newCard) => {
        setCards((state) => state.map((stateCard) => stateCard._id === card._id ? newCard : stateCard));
      });
    }
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then(() => {
        setCards((state) => state.filter((stateCard) => stateCard._id !== card._id));
    });
  } 

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(userInfo) {
    api.editUserInfo(userInfo.name, userInfo.about)
    .then((newUserInfo) => {
      setUserInfo(newUserInfo);
      closeAllPopups();
    })
    .catch(() => {
      console.log('Ошибка обновления пользователя')
    })
  }

  function handleUpdateAvatar({ avatar }) {
    api.editUserAvatar(avatar)
    .then((newUser) => {
      setUserInfo(newUser);
      closeAllPopups();
    })
    .catch(() => {
      console.log('Ошибка обновления аватара')
    })
  }

  function handleAddPlaceSubmit({ cardName, cardLink }) {
    api.addCard(cardName, cardLink)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
    })
    .catch(() => {
      console.log('Ошибка обновления аватара')
    })
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
      <ImagePopup card={selectedCard} onClose={handleImagePopupClose} />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
