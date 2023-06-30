export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${isOpen ? "popup_opened" : ''}`}
      onClick={onClose}
    >
      <div
        className="popup__container popup__container_theme_black"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className="popup__close-button popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <figure className="popup__container-picture">
          <img className="popup__picture" src={card.link} alt={card.name} />
          <figcaption className="popup__container-caption">
            {card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
