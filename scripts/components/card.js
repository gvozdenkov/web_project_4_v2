import {
  cardSelector,
  cardImageSelector,
  cardTitleSelector,
  cardDeleteBtnSelector,
  cardLikeSelector,
  cardIsLikedSelector,
} from "../utils/constants.js";

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(cardDeleteBtnSelector)
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(cardLikeSelector)
      .addEventListener("click", () => this._handleLikeCard());
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeCard() {
    this._element
      .querySelector(cardLikeSelector)
      .classList.toggle(cardIsLikedSelector);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(cardImageSelector).src = this._link;
    this._element.querySelector(cardImageSelector).alt = this._name;
    this._element.querySelector(cardTitleSelector).textContent = this._name;

    return this._element;
  }
}
