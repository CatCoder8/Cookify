import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
  } catch (err) {
    alert(err);
  }
};

// Initialization (when user starts program / user change url)
["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));
