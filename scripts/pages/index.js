import "../../pages/index.css";

import {
  initialCards,
  cardTemplateSelector,
  cardListSelector,
  popupImageTypeSelector,
  popupEditProfileSelector,
  editProfileBtn,
  popupAddCardSelector,
  addCardBtn,
  formConfig,
  profileConfig,
} from "../utils/constants.js";

import Card from "../components/card.js";
import Section from "../components/section.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userInfo.js";
import FormValidation from "../components/formValidation.js";
import { connection } from "../utils/settings";
import Api from "../components/api.js";

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
const editProfilePopup = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  },
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

// ============== UserInfo =====================
const userInfo = new UserInfo({
  nameSelector: profileConfig.profileTitle,
  descriptionSelector: profileConfig.profileDescription,
  avatarSelector: profileConfig.profileAvatar,
});

// ============== Form Validation ==============

const editProfileFormValidator = new FormValidation(
  formConfig,
  popupEditProfileSelector
);

const addCardFormValidator = new FormValidation(
  formConfig,
  popupAddCardSelector
);

// ============== Render All Cards ==============
CardList.renderItems(initialCards);

addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
imagePopup.setEventListeners();

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

// DOM elements only for index.html
const userNameInputElement = document.querySelector(".form__input_type_name");
const userDescriptionInputElement = document.querySelector(
  ".form__input_type_description"
);

// ============= Listeners on the page ====================
editProfileBtn.addEventListener("click", () => {
  const currentUserData = userInfo.getUserInfo();
  userNameInputElement.value = currentUserData.name;
  userDescriptionInputElement.value = currentUserData.description;
  editProfilePopup.open();
});

addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});

const api = new Api({
  adress: connection.adress,
  token: connection.token,
  group: connection.group,
});

api
  .getApiInfo()
  .then(([userData, cardList]) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });
    console.log("get data -> ", userData);
  })
  .catch((err) => console.log(err));
