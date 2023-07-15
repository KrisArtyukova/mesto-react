import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: inputRef.current.value,
        });
    }
    
    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Обновить аватар" name="edit_avatar" buttonText="Сохранить">
            <div className="form__input-container">
            <input ref={inputRef} className="form__input form__input_type_src popup__input" placeholder="Ссылка на аватар" name="link" id="linkAvatar" type="url" required />
            <p className="popup__error popup__error_visible" id="error-link-avatar"></p>
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
