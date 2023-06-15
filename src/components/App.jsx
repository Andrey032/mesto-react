import { useState } from "react";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className="page">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onOpenImage={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        textButton="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__name popup__name_input_name"
          id="name"
          type="text"
          name="username"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required=""
        />
        <span className="popup__error" id="name-error" />
        <input
          className="popup__name popup__name_input_job"
          id="job"
          type="text"
          name="userjob"
          placeholder="О себе"
          minLength={2}
          maxLength={200}
          required=""
        />
        <span className="popup__error" id="job-error" />
      </PopupWithForm>

      <PopupWithForm
        name="add"
        title="Новое место"
        textButton="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__name popup__name_input_name-card"
          id="name-card"
          type="text"
          name="name"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
        />
        <span className="popup__error" id="name-card-error" />
        <input
          className="popup__name popup__name_input_link"
          id="link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="popup__error" id="link-error" />
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        textButton="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__name popup__name_input_avatar"
          id="avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="popup__error" id="avatar-error" />
      </PopupWithForm>

      <PopupWithForm name="delete" title="Вы уверены?" textButton="Да" />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
