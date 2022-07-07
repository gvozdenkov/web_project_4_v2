import {
  initialCards,
  cardTemplateSelector,
  cardListSelector,
} from "../utils/constants.js";

import Card from "../components/card.js";
import Section from "../components/section.js";

const defaultCardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplateSelector);
      const cardElement = card.generateCard();
      defaultCardList.setItem(cardElement);
    },
  },
  cardListSelector
);

defaultCardList.renderItems();
