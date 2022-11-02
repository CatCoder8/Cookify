import View from "./View.js";
import icons from "../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const currentPage = this._data.page;
    const totalPages = Math.ceil(
      this._data.results.length / this._data.totalSearchCount
    );

    // First page
    if (currentPage === 1 && totalPages > 1)
      return this._generateBtnMarkup("right", currentPage);

    // Middle page
    if (totalPages > currentPage)
      return `${this._generateBtnMarkup(
        "left",
        currentPage
      )}${this._generateBtnMarkup("right", currentPage)}`;

    // Last page
    if (currentPage === totalPages)
      return this._generateBtnMarkup("left", currentPage);

    // Single page
    return "";
  }

  _generateBtnMarkup(direction, currentPage) {
    if (direction === "left")
      return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>`;

    if (direction === "right")
      return `
      <button class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
  }
}

export default new PaginationView();
