import {
  popupImageSelector,
  popupCaptionSelector,
} from "../utils/constants.js";
import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._popupTitle = name;
    this._popupLink = link;
  }

  open() {
    this._popup.querySelector(popupImageSelector).src = this._popupLink;
    this._popup.querySelector(popupImageSelector).alt = this._popupTitle;
    this._popup.querySelector(popupCaptionSelector).textContent =
      this._popupTitle;
    super.open();
  }

  close() {
    super.close();
  }
}
