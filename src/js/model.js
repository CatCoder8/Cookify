import { convertCamelCase, getJSON } from "./helpers.js";
import { API_URL, TOTAL_SEARCH_COUNT as TOTAL_SEARCH_COUNT } from "./config.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    totalSearchCount: TOTAL_SEARCH_COUNT,
  },
};

// Fetching data and changing state of the recipe
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

// Fetching data and changing state of the search
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

// Getting only the 10 search results per page
export const searchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  let start = (page - 1) * state.search.totalSearchCount;
  let end = page * state.search.totalSearchCount;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  // Updating servings and quantity values in recipe obj
  state.recipe.ingredients.forEach((ing) => {
    const newQuantity = (ing.quantity * newServings) / state.recipe.servings;
    return (ing.quantity = newQuantity);
  });

  state.recipe.servings = newServings;
};
