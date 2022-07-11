export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// Card template
export const cardTemplateSelector = ".card-template";
export const cardSelector = ".card";
export const cardImageSelector = ".card__image";
export const cardTitleSelector = ".card__title";
export const cardDeleteBtnSelector = ".card__delete-btn";
export const cardLikeSelector = ".card__like-btn";
export const cardIsLikedClass = "card__like-btn_is-active";

export const cardListSelector = ".cards__list";

// Popup
export const popupIsOpenedClass = "popup_is-opened";
export const popupSelector = ".popup";
export const popupClass = "popup";
export const popupCloseBtnClass = "popup__close-btn";
export const ESC_KEY = "Escape";

// PopupWithImage
export const popupImageTypeSelector = ".popup_type_image";
export const popupImageSelector = ".popup__image";
export const popupCaptionSelector = ".popup__caption";

// PopupWithForm
export const popupEditProfileSelector = ".popup_type_edit";
export const popupAddCardSelector = ".popup_type_new-card";

// Form
export const formSelector = ".form";
export const formInputSelector = ".form__input";

// Dom Elements
export const editProfileBtn = document.querySelector(".profile__edit-btn");
export const addCardBtn = document.querySelector(".profile__add-btn");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const userNameSelector = ".profile__title";
export const userDescriptionSelector = ".profile__description";
