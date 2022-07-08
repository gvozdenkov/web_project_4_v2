import {
  popupImageSelector,
  popupCaptionSelector,
} from "../utils/constants.js";
import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  open({ name, link }) {
    this._popup.querySelector(popupImageSelector).src = link;
    this._popup.querySelector(popupImageSelector).alt = name;
    this._popup.querySelector(popupCaptionSelector).textContent = name;
    super.open();
  }
}
