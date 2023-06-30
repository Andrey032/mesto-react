import { useContext } from "react";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Spinner from "../Spinner/Spinner.jsx";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onOpenImage,
  onCardDelete,
  onCardLike,
  cards,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          type="button"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__profession">{currentUser.about}</p>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать профиль"
            onClick={onEditProfile}
          />
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить фотографии"
          onClick={onAddPlace}
        />
      </section>
      <section aria-label="Галерея фото">
        <ul className="elements">
          {isLoading ? (
            <Spinner />
          ) : (
            cards.map((data) => {
              return (
                <Card
                  card={data}
                  onOpenImage={onOpenImage}
                  key={data._id}
                  onCardDelete={onCardDelete}
                  onCardLike={onCardLike}
                />
              );
            })
          )}
        </ul>
      </section>
    </main>
  );
}
