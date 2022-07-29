import Popup from "./popup.js";

export default class PopupWithFormSubmit extends Popup {
  setSubmiteAction(action) {
    this._handleSubmitAction = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitAction();
    });
  }
}
