export default function PopupWithForm({
  title,
  name,
  textButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid = true
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ''}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className="popup__close-button popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h2
          className={`popup__title ${name === "delete" ? "popup__title_type_delete" : ""
            }`}
        >
          {title}
        </h2>
        <form
          className="popup__form popup__form-edit"
          name={`form-${name}`}
          method="post"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`popup__button ${isValid ? '' : 'popup__button_disabled'}`}
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
