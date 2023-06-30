import { useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const { handleChange, values, errors, isValid, isInputValid, resetAllState } = useFormValidation();

  useEffect(() => {
    resetAllState()
  }, [isOpen, resetAllState])

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({
      name: values.name,
      link: values.link
    })
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__name popup__name_input_name-card ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__name_type_error'}`}
        id="name-card"
        type="text"
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        onChange={handleChange}
        value={values.name ? values.name : ''}
        required
      />
      <span className="popup__error" id="name-card-error">{errors.name}</span>
      <input
        className={`popup__name popup__name_input_link ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__name_type_error'}`}
        id="link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        onChange={handleChange}
        value={values.link ? values.link : ''}
        required
      />
      <span className="popup__error" id="link-error">{errors.link}</span>
    </PopupWithForm>
  )
}