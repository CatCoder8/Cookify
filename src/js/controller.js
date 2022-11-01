import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const controlRecipe = async function () {
  try {
    // Getting the hash id base on url
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render spinner while fetching data
    recipeView.renderSpinner();

    // 1. Load
    await model.loadRecipe(id);

    // 2. Render
    recipeView.render(model.state.recipe);
  } catch {
    recipeView.renderErrorMessage();
  }
};

const controlSearchResults = async function () {
  try {
    // Get query
    const query = searchView.getQuery();
    if (!query) return;

    // Load the query
    await model.loadSearchResult(query);
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

// Initialization (when user starts program / user change url)
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addSearchHandler(controlSearchResults);
};

init();
