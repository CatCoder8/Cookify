class SearchView {
  _parentElement = document.querySelector(".search");
  _searchField = this._parentElement.querySelector(".search__field");

  getQuery() {
    const query = this._searchField.value;
    this._clearInput();
    return query;
  }

  addSearchHandler(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearInput() {
    this._searchField.value = "";
  }
}

export default new SearchView();
