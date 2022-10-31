import { convertCamelCase, getJSON } from "./helpers.js";
import { API_URL } from "./config.js";

export const state = {
  recipe: {},
};

// Fetching data and changing state of the recipe data

export const loadRecipe = async function (id) {
  // Fetching data
  const data = await getJSON(`${API_URL}/${id}`);
  // Passing into recipe obj
  state.recipe = Object.fromEntries(convertCamelCase(data.data.recipe));
  console.log(state.recipe);
};
