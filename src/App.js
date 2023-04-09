import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import PopupWithForm from "./components/PopupWithForm";
import ImagePopup from "./components/ImagePopup";
import { CurrentUserContext } from "./context/CurrentUserContext";
import EditProfilePopup from "./components/EditProfilePopup";
import api from "./utils/Api";
import Card from "./components/Card";

import "./index.css";
import EditAvatarPopup from "./components/EditAvatarPopup";
import AddPlacePopup from "./components/AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
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

  function handleChangeUserInfo(name, about) {
    api
      .setUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });

    closeAllPopups();
  }

  function handleChangeUserAvatar(newLink) {
    api
      .installAvatar(newLink.avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleCardLike(card, cardId) {
    const isLiked =
      card.likes.findIndex((item) => item._id === currentUser._id) !== -1;
    if (!isLiked) {
      api
        .likeCard(cardId)
        .then((res) => {
          const newCards = cards.map((c) => (c._id === card._id ? res : c));
          setCards(newCards);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .likeRemove(cardId)
        .then((res) => {
          const newCards = cards.map((c) => (c._id === card._id ? res : c));
          setCards(newCards);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function addNewPlace(cardElement) {
    api
      .getPlaceCard(cardElement)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err));
    closeAllPopups();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <body className="page">
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleChangeUserInfo}
        ></EditProfilePopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          handleClick={handleAddPlaceClick}
          addNewCard={addNewPlace}
        ></AddPlacePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          handleClick={handleEditAvatarClick}
          onUpdateAvatar={handleChangeUserAvatar}
        />

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
        />

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
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              ></Card>
            );
          })}
        </section>

        <Footer />
      </body>
    </CurrentUserContext.Provider>
  );
}

export default App;
