import hearthSvg from '../images/heart.svg';

function Card({ card, onCardClick }) {
    
    return (
        <article className="element" onClick={() => onCardClick(card)}>
            <button type="button" aria-label="Удалить карточку" className="element__del-btn"></button>
            <img className="element__img" src={card.link} alt={card.name} />
            <div className="element__caption">
                <h2 className="element__title">{card.name}</h2>
                {/* <button type="button" className="element__like-btn"><img src="./images/heart.svg" alt="Кнопка сердечко"></></button> */}
                <div className="element__like-container">
                    <button type="button" className="element__like-btn"><img src={hearthSvg} alt="Кнопка сердечко" /></button>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;
