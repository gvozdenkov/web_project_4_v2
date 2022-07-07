import {
  popupIsOpenedClass,
  ESC_KEY,
  popupCloseBtnClass,
  popupClass,
} from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add(popupIsOpenedClass);
    document.addEventListener("keyup", (evt) => this._handleEscClose(evt));
  }

  close() {
    this._popup.classList.remove(popupIsOpenedClass);
    document.removeEventListener("keyup", (evt) => this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === ESC_KEY) this.close();
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains(popupClass) ||
        evt.target.classList.contains(popupCloseBtnClass)
      ) {
        this.close();
      }
    });
  }
}
