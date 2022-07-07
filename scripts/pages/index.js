import {
  initialCards,
  cardTemplateSelector,
  cardListSelector,
} from "../utils/constants.js";

import Card from "../components/card.js";

initialCards.forEach((item) => {
  const card = new Card(item, cardTemplateSelector);
  const cardElement = card.generateCard();
  console.log(cardElement);
});
