import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const controlRecipe = async function () {
  try {
    // Getting the hash id base on url
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render spinner while fetching data
    recipeView.renderSpinner();

    // 1. Load recipe
    await model.loadRecipe(id);

    // 2. Render recipe
    recipeView.render(model.state.recipe);
  } catch {
    recipeView.renderErrorMessage();
  }
};

const controlSearchResults = async function () {
  try {
    // Render spinner while fetching data
    resultsView.renderSpinner();

    // Get query
    const query = searchView.getQuery();
    if (!query) return;

    // Load query
    await model.loadSearchResult(query);

    // Render query
    resultsView.render(model.searchResultsPage(5));

    // Render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderErrorMessage();
  }
};

// Listening to events
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addSearchHandler(controlSearchResults);
};

init();
