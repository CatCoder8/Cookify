import View from "./View.js";

class resultsView extends View {
  _parentElement = document.querySelector(".results");
  _alertMessage = "No recipe found. Please try another one!";

  _generateMarkup() {
    return this._data
      .map((result) => this._generateResultsMarkup(result))
      .join("");
  }

  _generateResultsMarkup(result) {
    return `<li class="preview">
    <a class="preview__link" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.imageUrl}" alt="${result.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
      </div>
    </a>
  </li>`;
  }
}

export default new resultsView();
