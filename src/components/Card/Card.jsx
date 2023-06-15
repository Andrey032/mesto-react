export default function Card({ card, onOpenImage }) {
  return (
    <li className="elements__card elements__card-list">
      <button className="elements__img-trash" />
      <img
        className="elements__img"
        src={card.link}
        alt={card.name}
        onClick={() => onOpenImage({ link: card.link, name: card.name })}
      />
      <div className="elements__card-item">
        <h2 className="elements__title">{card.name}</h2>
        <button
          className="elements__button"
          type="button"
          aria-label="Нравится"
        />
        <span className="elements__button-like">{card.likes.length}</span>
      </div>
    </li>
  );
}
