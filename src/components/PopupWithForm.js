import React from "react";

function PopupWithForm(props) {
    const { title, name, isOpen, onClose, buttonText, onSubmit, children } = props;

    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть" className="popup__close-icon popup__close-icon_add" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form className="form popup__form" name={name} onSubmit={onSubmit} noValidate>
                    {children}
                    <button className="form__btn popup__button" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;