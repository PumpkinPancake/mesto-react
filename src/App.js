import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import PopupWithForm from "./components/PopupWithForm";
import ImagePopup from "./components/ImagePopup";
import "./index.css";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  return (
    <body className="page">
      <PopupWithForm
        handleClick={handleEditProfileClick}
        title="Редактировать профиль"
        name="edit"
        isOpen={isEditProfilePopupOpen}
        submitButtonText="Создать"
      >
        <label className="popup__label">
          <input
            name="name"
            type="text"
            className="popup__input popup__input_text_type-username"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            id="name-input"
          />
          <span className="popup__input-error name-input-error"></span>
        </label>
        <label className="popup__label">
          <input
            name="about"
            type="text"
            className="popup__input popup__input_text_type-about"
            placeholder="О себе"
            minLength="2"
            required
            id="about-input"
          />
          <span className="popup__input-error about-input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        submitButtonText="Сохранить"
        handleClick={handleAddPlaceClick}
        title="Новое место"
        name="add"
        isOpen={isAddPlacePopupOpen}
      >
        <label className="popup__label">
          <input
            name="new"
            type="text"
            className="popup__input popup__input_text_type-title"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            id="title-input"
          />
          <span className="popup__input-error title-input-error"></span>
        </label>
        <label className="popup__label">
          <input
            name="link"
            type="url"
            className="popup__input popup__input_text_type-link"
            placeholder="Ссылка на картинку"
            required
            id="link-input"
          />
          <span className="popup__input-error link-input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        submitButtonText="Создать"
        handleClick={handleEditAvatarClick}
        title="Обновить аватар"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
      >
        <label className="popup__label">
          <input
            name="avatar"
            type="url"
            className="popup__input popup__input_text_type-avatar"
            placeholder="Ссылка на картинку"
            required
            id="avatar-input"
          />
          <span className="popup__input-error avatar-input-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        submitButtonText="Да"
        title="Вы уверены?"
        name="warning"
      ></PopupWithForm>

      {selectedCard.name && (
        <ImagePopup
          card={selectedCard}
          onClose={() => {
            setIsImagePopupOpen(false);
            setSelectedCard({});
          }}
          isOpen={isImagePopupOpen}
        />
      )}

      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
    </body>
  );
}

export default App;
