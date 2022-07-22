import {
  cardSelector,
  cardImageSelector,
  cardTitleSelector,
  cardDeleteBtnSelector,
  cardLikeSelector,
  cardIsLikedClass,
  cardLikeCountSelector,
} from "../utils/constants.js";

export default class Card {
  constructor(
    { data, handleImageClick, handleDeleteCard, handleLikeClick },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = data.currentUserId;
    this._ownerId = data.owner._id;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
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
      .addEventListener("click", () => this._handleDeleteCard(this));

    this._element
      .querySelector(cardLikeSelector)
      .addEventListener("click", () => this._handleLikeClick(this));

    this._element
      .querySelector(cardImageSelector)
      .addEventListener("click", () =>
        this._handleImageClick({ name: this._name, link: this._link })
      );
  }

  deleteCard() {
    this._element.remove();
  }

  id() {
    return this._cardId;
  }

  isLiked() {
    return Boolean(this._likes.find((item) => item._id === this._ownerId));
  }

  _updateLikes() {
    this._element.querySelector(`.${cardLikeCountSelector}`).textContent =
      this._likes.length;

    this.isLiked()
      ? this._element
          .querySelector(`${cardLikeSelector}`)
          .classList.add(`${cardIsLikedClass}`)
      : this._element
          .querySelector(`${cardLikeSelector}`)
          .classList.remove(`${cardIsLikedClass}`);
  }

  setLikeInfo(cardData) {
    this._likes = cardData.likes;
    this._updateLikes();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._updateLikes();
    this._setEventListeners();

    // this._element.querySelector(cardDeleteBtnSelector).classList.add(this._ownerId === )

    this._element.querySelector(cardImageSelector).src = this._link;
    this._element.querySelector(cardImageSelector).alt = this._name;
    this._element.querySelector(cardTitleSelector).textContent = this._name;

    return this._element;
  }
}
