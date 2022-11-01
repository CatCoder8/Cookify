class SearchView {
  #parentElement = document.querySelector(".search");
  #searchField = this.#parentElement.querySelector(".search__field");

  getQuery() {
    const query = this.#searchField.value;
    this.#clear();
    return query;
  }

  addSearchHandler(handler) {
    this.#parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  #clear() {
    this.#searchField.value = "";
  }
}

export default new SearchView();
