import {
  initialCards,
  cardTemplateSelector,
  cardListSelector,
  popupImageTypeSelector,
} from "../utils/constants.js";

import Card from "../components/card.js";
import Section from "../components/section.js";
import PopupWithImage from "../components/popupWithImage.js";

const handleImageClick = (item) => {
  const popup = new PopupWithImage(item, popupImageTypeSelector);
  popup.open();
};

const renderCards = (item) => {
  const card = new Card(item, {
    cardSelector: cardTemplateSelector,
    handleImageClick: handleImageClick,
  });
  const cardElement = card.generateCard();
  defaultCardList.setItem(cardElement);
};

const defaultCardList = new Section(
  {
    data: initialCards,
    renderer: renderCards,
  },
  cardListSelector
);

defaultCardList.renderItems();
