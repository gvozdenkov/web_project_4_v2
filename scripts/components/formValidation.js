export default class FormValidation {
  constructor(
    {
      labelSelector,
      inputSelector,
      inputErrorSelector,
      inputErrorClass,
      messsageErrorClass,
      submitButtonSelector,
      inactiveButtonClass,
    },
    popupSelector
  ) {
    this._inputSelector = inputSelector;
    this._labelSelector = labelSelector;
    this._inputErrorSelector = inputErrorSelector;
    this._inputErrorClass = inputErrorClass;
    this._messsageErrorClass = messsageErrorClass;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._popup = document.querySelector(popupSelector);
  }

  _getErrorElement(inputElement) {
    return inputElement
      .closest(this._labelSelector)
      .querySelector(this._inputErrorSelector);
  }

  _hasInvalidInputs(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    this._hasInvalidInputs(inputList)
      ? buttonElement.classList.add(this._inactiveButtonClass)
      : buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._popup.querySelectorAll(this._inputSelector)
    );
    this._submitBtn = this._popup.querySelector(this._submitButtonSelector);
    console.log(this._submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(this._inputList, this._submitBtn);
      });
    });
  }

  _isValid(inputElement) {
    return !inputElement.validity.valid
      ? this._showError(inputElement)
      : this._hideError(inputElement);
  }

  _showError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._messsageErrorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    errorElement.classList.remove(this._messsageErrorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  enableValidation() {
    this._popup.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}
