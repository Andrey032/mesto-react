export default function PopupWithForm({
  title,
  name,
  textButton,
  children,
  isOpen,
  onClose,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close-button popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form popup__form-edit"
          name={`form-${name}`}
          method="post"
          noValidate=""
        >
          {children}
          <button
            className="popup__button"
            type="submit"
            aria-label="Сохранить"
          >
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}
