import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const { handleChange, values, errors, isValid, isInputValid, resetAllState, setValue } = useFormValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValue('username', currentUser.name)
    setValue('userjob', currentUser.about)
  }, [currentUser, setValue])

  useEffect(() => {
    resetAllState({
      username: currentUser.name,
      userjob: currentUser.about
    })
  }, [isOpen, currentUser, resetAllState])


  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({
      username: values.username,
      userjob: values.userjob
    })
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__name popup__name_input_name ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__name_type_error'}`}
        id="name"
        type="text"
        name="username"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required
        onChange={handleChange}
        value={values.username ? values.username : ''}
      />
      <span className="popup__error" id="name-error">{errors.username}</span>
      <input
        className={`popup__name popup__name_input_job ${isInputValid.userjob === undefined || isInputValid.userjob ? '' : 'popup__name_type_error'}`}
        id="job"
        type="text"
        name="userjob"
        placeholder="О себе"
        minLength={2}
        maxLength={200}
        required
        onChange={handleChange}
        value={values.userjob ? values.userjob : ''}
      />
      <span className="popup__error" id="job-error">{errors.userjob}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;