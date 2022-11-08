import View from "./View.js";

class bookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _alertMessage = "No recipe found.";

  _generateMarkup() {
    return this._data
      .map((result) => this._generateResultsMarkup(result))
      .join("");
  }

  _generateResultsMarkup(result) {
    const id = window.location.hash.slice(1);

    return `<li class="preview">
    <a class="preview__link ${
      id === result.id ? "preview__link--active" : ""
    }" href="#${result.id}">
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

export default new bookmarksView();
