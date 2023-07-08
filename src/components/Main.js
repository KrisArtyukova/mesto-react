import { useEffect, useState } from 'react';
import avatarEdit from '../images/avatar_edit.svg';
import defaultAvatar from '../images/photo.jpg';
import { api } from '../utils/Api';

function Main({onEditProfile, onAddPlace, onEditAvatar}) {
    const [userName, setUserName] = useState();
    const [userDescription, setUserDescription] = useState();
    const [userAvatar, setUserAvatar] = useState(defaultAvatar);

    useEffect(() => {
        api.getUserInfo()
        .then((userData) => {
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
        })
        .catch(() => {
            console.log('Ошибка загрузки user')
        })
    }, []);

    return (
        <div className="main">
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
            <section className="elements"></section>
        </div>
    );
}

export default Main;
