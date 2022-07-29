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
  popupAvatarSelector,
  cardLikeSelector,
  cardIsLikedClass,
  popupDeleteConfirmSelector,
} from "../utils/constants.js";

import Card from "../components/card.js";
import Section from "../components/section.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userInfo.js";
import FormValidation from "../components/formValidation.js";
import { connection } from "../utils/settings";
import Api from "../components/api.js";
import PopupWithFormSubmit from "../components/popupWithFormSubmit";

// DOM elements only for index.html
const userNameInputElement = document.querySelector(".form__input_type_name");
const userDescriptionInputElement = document.querySelector(
  ".form__input_type_description"
);
const openAvatarFormBtn = document.querySelector(".profile__image");

// ============== Card ====================
const imagePopup = new PopupWithImage(popupImageTypeSelector);

const createCard = (cardData) => {
  const card = new Card(
    {
      data: { ...cardData },
      handleImageClick: () => imagePopup.open(cardData),
      handleDeleteCard: (card) => {
        deletePopup.open();
        deletePopup.setSubmiteAction(() => {
          api
            .deleteCard(card.id())
            .then(() => {
              card.deleteCard();
            })
            .catch((err) => console.log(err))
            .finally(() => deletePopup.close());
        });
      },
      handleLikeClick: (card) => {
        api.changeLikeStatus(card.id(), card.isLiked()).then((data) => {
          card.setLikeInfo(data);
        });
      },
    },
    cardTemplateSelector
  );
  return card.generateCard();
};

const cardList = new Section(
  {
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  cardListSelector
);

const deletePopup = new PopupWithFormSubmit(popupDeleteConfirmSelector);

// ============== Edit Profile Popup ==============
const editProfilePopup = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: (formData) => {
    api
      .setUserInfo({
        name: formData.name,
        about: formData.about,
      })
      .then((info) =>
        userInfo.setUserInfo({
          name: info.name,
          about: info.about,
        })
      )
      .catch((err) => console.log(err))
      .finally(() => {
        editProfilePopup.close();
      });
  },
});

const editAvatarPopup = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  handleFormSubmit: (formData) => {
    api
      .setUserAvatar({
        avatar: formData.avatar,
      })
      .then((avatar) => {
        userInfo.setUserInfo({
          avatar: avatar,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => editAvatarPopup.close());
  },
});

editAvatarPopup.setEventListeners();

// ============== Add new Place Popup ==============
const addCardPopup = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleFormSubmit: (data) => {
    api
      .addCard({
        name: data.name,
        link: data.link,
      })
      .then((data) => {
        cardList.addItem(createCard(data));
      })
      .catch((err) => console.log(err))
      .finally(() => addCardPopup.close());
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

const editAvatarFormValidator = new FormValidation(
  formConfig,
  popupAvatarSelector
);

// ============== Render All Cards ==============
// cardList.renderItems(initialCards);

addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
imagePopup.setEventListeners();
deletePopup.setEventListeners();

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

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

openAvatarFormBtn.addEventListener("click", () => editAvatarPopup.open());

// ============= API =================================
const api = new Api({
  adress: connection.adress,
  token: connection.token,
  group: connection.group,
});

api
  .getApiInfo()
  .then(([userData, cardsArray]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    cardList.renderItems(cardsArray);
  })
  .catch((err) => console.log(err));

fetch("http://es.nomoreparties.co/v1/cohort-1-es/cards", {
  headers: {
    authorization: connection.token,
  },
})
  .then((data) => data.json())
  .then((data) => console.table(data));
