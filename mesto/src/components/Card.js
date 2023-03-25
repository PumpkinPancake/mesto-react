import React from "react";

export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="element" key={props.card._id}>
      <img
        className="element__img"
        src={props.card.link}
        alt={props.card.name}
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={handleClick}
      />

      <h2 className="element__title">{props.card.name}</h2>
      <div className="element__like_container">
        <button type="button" className="element__button-like"></button>
        <span className="element__like-counter">{props.card.likes.length}</span>
      </div>
      <button className="element__del-btn"></button>
    </article>
  );
}
