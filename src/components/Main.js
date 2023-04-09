import React, { useEffect, useState } from "react";
import api from "../utils/Api";
import Card from "./Card";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const [selectedCard, setSelectedCard] = useState(null);
  const currentUser = React.useContext(CurrentUserContext);

  function closeBigImg() {
    setSelectedCard(null);
  }

  return (
    <main className="main">
      <section className="profile">
        <button className="profile__avatar-edit-btn" onClick={onEditAvatar}>
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>

      <ImagePopup card={selectedCard} onClose={closeBigImg} />
    </main>
  );
}
