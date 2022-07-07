import { popupIsOpenedClass } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add(popupIsOpenedClass);
  }

  close() {
    this._popup.classList.remove(popupIsOpenedClass);
  }
}
