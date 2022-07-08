import {
  initialCards,
  cardTemplateSelector,
  cardListSelector,
  popupImageTypeSelector,
  popupEditProfileSelector,
  editProfileBtn,
  popupAddCardSelector,
  addCardBtn,
  profileTitle,
  profileDescription,
} from "../utils/constants.js";

import Card from "../components/card.js";
import Section from "../components/section.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";

// ============== Card ====================
const imagePopup = new PopupWithImage(popupImageTypeSelector);

const renderCards = (item) => {
  const card = new Card(item, {
    cardSelector: cardTemplateSelector,
    handleImageClick: () => imagePopup.open(item),
  });
  CardList.addItem(card.generateCard());
};

const CardList = new Section(
  {
    renderer: renderCards,
  },
  cardListSelector
);

// ============== Edit Profile ==============
const editProfileSubmit = (formData) => {
  profileTitle.textContent = formData.name;
  profileDescription.innerText = formData.description;
};

const editProfilePopup = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: editProfileSubmit,
});

editProfileBtn.addEventListener("click", () => {
  editProfilePopup.open();
});

// ============== Add new Place ==============
const addCardPopup = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleFormSubmit: (data) => {
    const card = new Card(data, {
      cardSelector: cardTemplateSelector,
      handleImageClick: () => imagePopup.open(data),
    });
    CardList.addItem(card.generateCard());
  },
});

addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});

// ============== Render All Cards ==============
CardList.renderItems(initialCards);
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
imagePopup.setEventListeners();
