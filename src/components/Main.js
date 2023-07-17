import React from 'react';
import { useEffect, useState } from 'react';
import avatarEdit from '../images/avatar_edit.svg';
import defaultAvatar from '../images/photo.jpg';
import Card from './Card';
import { CurrentUserContext } from './../contexts/CurrentUserContext';
import { CurrentCardContext } from '../contexts/CurrentCardContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, handleCardClick, onCardLike, onCardDelete}) {
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState(defaultAvatar);
    const currentUser = React.useContext(CurrentUserContext);
    const cards = React.useContext(CurrentCardContext);

    useEffect(() => {
        if (currentUser) {
            setUserName(currentUser.name);
            setUserDescription(currentUser.about);
            setUserAvatar(currentUser.avatar);
        }
    }, [currentUser]);

    return (
        <main className="main">
            <section className="profile">
            <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} alt="Фото в профиле" onClick={onEditAvatar}>
                <div className="profile__avatar-edit">
                <img src={avatarEdit} alt="Логотип Место" />
                </div>
            </div>
            <div className="profile__info">
                <div className="profile__text">
                <h1 className="profile__title">{userName}</h1>
                <button type="button" aria-label="Изменить информацию" className="profile__btn-edit" onClick={onEditProfile}></button>
                </div>
                <p className="profile__subtitle">{userDescription}</p>
            </div>
            <button type="button" aria-label="Добавить карточку" className="profile__btn-add" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards?.map(card => <Card card={card} onCardClick={handleCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id} />)}
            </section>
        </main>
    );
}

export default Main;
