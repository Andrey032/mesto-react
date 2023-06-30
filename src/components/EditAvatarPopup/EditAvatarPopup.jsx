import { useEffect, useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const inputRef = useRef();
  const { handleChange, values, errors, isValid, isInputValid, resetAllState } = useFormValidation();

  useEffect(() => {
    resetAllState()
  }, [isOpen, resetAllState])

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({ avatar: inputRef.current.value })
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        ref={inputRef}
        className={`popup__name popup__name_input_avatar ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__name_type_error'}`}
        id="avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        value={values.avatar ? values.avatar : ''}
        onChange={handleChange}
        required
      />
      <span className="popup__error" id="avatar-error">{errors.avatar}</span>
    </PopupWithForm>
  )
}