import { async } from "regenerator-runtime";
import * as helper from "./helper.js";

export const state = {
  recipe: {},
};

// Fetching data and changing state of the recipe data

export const loadRecipe = async function (id) {
  // Fetching data
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} ${res.status}`);

  // Passing into recipe obj
  state.recipe = Object.fromEntries(helper.convertCamelCase(data.data.recipe));
  console.log(state.recipe);
};
