import { useCallback, useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.jsx';
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import api from "../utils/api.js";

function App() {
  // Состояние модальных окон
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  // Состояние контекста
  const [currentUser, setCurrentUser] = useState({});
  // Состояние карточек
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletedCardId, setIsDeletedCardId] = useState('');

  //Функция сброса стейта
  const settingAllStates = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setDeletePopupOpen(false);
  }, []);

  //Функция закрытия попап по ESC
  const closingAllPopupsByEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        settingAllStates();
        document.removeEventListener("keydown", closingAllPopupsByEsc);
      }
    },
    [settingAllStates]
  );

  //Функция для снятия слушателей
  const closeAllPopaps = useCallback(() => {
    settingAllStates();
    document.removeEventListener("keydown", closingAllPopupsByEsc);
  }, [settingAllStates, closingAllPopupsByEsc]);

  //Функция для добавления слушателей
  function addPopupListener() {
    document.addEventListener("keydown", closingAllPopupsByEsc);
  }

  //Функция изменения состояния для Попап редактировать профиль
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    addPopupListener();
  }

  //Функция изменения состояния для Попап редактировать аватар
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    addPopupListener();
  }

  //Функция изменения состояния для Попап добавить картинку
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    addPopupListener();
  }

  //Функция изменения состояния для Попап открыть картинку
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
    addPopupListener();
  }

  //Функция изменения состояния для Попап удаления картинки
  function handleCardDelete(cardId) {
    setDeletePopupOpen(true);
    addPopupListener();
    setIsDeletedCardId(cardId)
  }

  //Функция обработки запроса лайк и дизлайк
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
        })
        .catch((err) => console.error(err));
    } else {
      api
        .addLike(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
        })
        .catch((err) => console.error(err));
    }
  }

  //Стартовый запрос на серевер
  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getMyInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  //Запрос на сервер для удаления карточки
  function handleDeletionOnSubmit(evt) {
    evt.preventDefault()
    api.deleteCard(isDeletedCardId)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== isDeletedCardId
        }))
        closeAllPopaps()
      })
      .catch((err) => console.log(err));
  }

  //Запрос на сервер для изменения данных пользователя
  function handleUpdateUser(data, reset) {
    api.setUserInfo(data)
      .then(res => {
        setCurrentUser(res)
        closeAllPopaps()
        reset()
      })
      .catch((err) => console.log(err));
  }

  //Запрос на сервер для изменения аватара
  function handleUpdateAvatar(data, reset) {
    api.setUserAvatar(data)
      .then(res => {
        setCurrentUser(res)
        closeAllPopaps()
        reset()
      })
      .catch((err) => console.log(err));
  }

  //Запрос на сервер для добавления карточки
  function handleAddPlaceSubmit(data, reset) {
    api.addСards(data)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopaps()
        reset()
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onOpenImage={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          cards={cards}
          isLoading={isLoading}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopaps}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopaps}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopaps}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          textButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopaps}
          onSubmit={handleDeletionOnSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopaps}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
