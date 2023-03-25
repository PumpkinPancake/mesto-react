import React, { useEffect, useState } from "react";
import api from "../utils/Api";
import Card from "./Card";
import ImagePopup from "./ImagePopup";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  closeBigImg,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeBigImg() {
    setSelectedCard(null);
  }

  return (
    <main className="main">
      <section className="profile">
        <button className="profile__avatar-edit-btn" onClick={onEditAvatar}>
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
          ></div>
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              link={card.link}
              name={card.name}
              likes={card.likes}
              onCardClick={handleCardClick}
            ></Card>
          );
        })}
      </section>
      <ImagePopup card={selectedCard} onClose={closeBigImg} />
    </main>
  );
}
