import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

///////////////////////////////////////

const showRecipe = async function () {
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

// Initialization (when user starts program / user change url)
const init = function () {
  recipeView.addHandlerRender(showRecipe);
};

init();
