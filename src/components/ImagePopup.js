function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_img_view ${ card ? 'popup_opened' : '' }`}>
            <figure className="popup__img-container">
                <button type="button" aria-label="Закрыть" className="popup__close-icon popup__close-icon_img" onClick={onClose}></button>
                <img className="popup__img" src={card?.link} alt={card?.name} />
                <figcaption className="popup__caption">{card?.name}</figcaption>
            </figure>
        </div>
    );
}

export default ImagePopup;
