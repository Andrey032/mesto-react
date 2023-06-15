import { useEffect, useState } from "react";
import api from "../../utils/api.js";
import Card from "../Card/Card.jsx";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onOpenImage,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getMyInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        cards.forEach((item) => (item.myId = user._id));
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          type="button"
          onClick={onEditAvatar}
        >
          <img className="profile__avatar" src={userAvatar} alt="аватар" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__profession">{userDescription}</p>
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
          {cards.map((data) => {
            return (
              <Card card={data} onOpenImage={onOpenImage} key={data._id} />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
