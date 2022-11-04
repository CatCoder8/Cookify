import icons from "../../img/icons.svg";
import { update } from "../helpers";

export default class Views {
  _data;

  // Updating markup base on state
  render(data) {
    // Data validation
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();

    // Getting the data pass into object
    this._data = data;

    // Render markup
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderUpdate(data) {
    if (!data) return this.renderErrorMessage();

    this._data = data;

    // Updating text && attributes
    const previousMarkup = this._parentElement.querySelectorAll("*");
    const newMarkup = this._generateMarkup();
    update(previousMarkup, newMarkup);
  }

  // Message when there is an error
  renderErrorMessage(errorMessage = this._alertMessage) {
    const markup = ` <div class="error">
    <div>
        <svg>
        <use href="${icons}#icon-alert-triangle"></use>
        </svg>
    </div>
    <p>${errorMessage}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // Placeholder message when element is blank
  renderMessage() {
    const markup = ` <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${this._message}</p>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // Spinner on loading
  renderSpinner = function () {
    const spinnerMarkup = `<div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
    </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", spinnerMarkup);
  };

  // Clear element
  _clear() {
    this._parentElement.innerHTML = "";
  }
}
