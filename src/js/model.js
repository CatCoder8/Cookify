import { convertCamelCase, getJSON } from "./helpers.js";
import { API_URL } from "./config.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

// Fetching data and changing state of the recipe data
export const loadRecipe = async function (id) {
  try {
    // Fetching data
    const data = await getJSON(`${API_URL}${id}`);

    // Passing into recipe obj
    state.recipe = convertCamelCase(data.data.recipe);
    console.log(state.recipe);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    // Fetching data
    const data = await getJSON(`${API_URL}?search=${query}`);

    // Passing to search obj
    state.search.query = query;
    const results = data.data.recipes;
    state.search.results = results.map((obj) => convertCamelCase(obj));
    console.log(state.search.results);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
