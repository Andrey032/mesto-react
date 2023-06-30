import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Card({ card, onOpenImage, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLike(card.likes.some((i) => i._id === currentUser._id));
  }, [card, currentUser]);

  return (
    <li className="elements__card elements__card-list">
      {currentUser._id === card.owner._id && (
        <button className="elements__img-trash" onClick={() => onCardDelete(card._id)} />
      )}
      <img
        className="elements__img"
        src={card.link}
        alt={card.name}
        onClick={() => onOpenImage({ link: card.link, name: card.name })}
      />
      <div className="elements__card-item">
        <h2 className="elements__title">{card.name}</h2>
        <button
          className={`elements__button ${isLike ? "elements__button_active" : ""
            }`}
          type="button"
          aria-label="Нравится"
          onClick={() => onCardLike(card)}
        />
        <span className="elements__button-like">{card.likes.length}</span>
      </div>
    </li>
  );
}
