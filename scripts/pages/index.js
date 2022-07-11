import {
  initialCards,
  cardTemplateSelector,
  cardListSelector,
  popupImageTypeSelector,
  popupEditProfileSelector,
  editProfileBtn,
  popupAddCardSelector,
  addCardBtn,
  userNameSelector,
  userDescriptionSelector,
  formConfig,
} from "../utils/constants.js";

import Card from "../components/card.js";
import Section from "../components/section.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userInfo.js";
import FormValidation from "../components/formValidation.js";

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
    userProfile.setUserInfo(formData);
  },
});

editProfileBtn.addEventListener("click", () => {
  const currentUserData = userProfile.getUserInfo();
  console.log(currentUserData);
  userNameInputElement.value = currentUserData.name;
  userDescriptionInputElement.value = currentUserData.description;
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

// ============== UserInfo =====================
const userProfile = new UserInfo({
  nameSelector: userNameSelector,
  descriptionSelector: userDescriptionSelector,
});

// ============== Render All Cards ==============
CardList.renderItems(initialCards);

addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
imagePopup.setEventListeners();

// DOM elements only for index.html
const userNameInputElement = document.querySelector(".form__input_type_name");
const userDescriptionInputElement = document.querySelector(
  ".form__input_type_description"
);

const editProfileFormValidator = new FormValidation(
  formConfig,
  popupEditProfileSelector
);
editProfileFormValidator.enableValidation();
