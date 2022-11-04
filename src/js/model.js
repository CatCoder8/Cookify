import { convertCamelCase, getJSON } from "./helpers.js";
import {
  API_URL,
  DEFAULT_PAGE,
  TOTAL_SEARCH_COUNT as TOTAL_SEARCH_COUNT,
} from "./config.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: DEFAULT_PAGE,
    totalSearchCount: TOTAL_SEARCH_COUNT,
  },
  bookmarks: [],
};

// Fetching data and changing state of the recipe
export const loadRecipe = async function (id) {
  try {
    // Fetching data
    const data = await getJSON(`${API_URL}${id}`);

    // Passing into recipe obj
    state.recipe = convertCamelCase(data.data.recipe);

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

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
export const searchResultsPage = function (page = DEFAULT_PAGE) {
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

export const addBookmark = function (recipe) {
  // Add recipe to bookmark obj
  state.bookmarks.push(recipe);

  // Make recipe property bookmarked to true
  state.recipe.bookmarked = recipe.id === state.recipe.id;
};

export const deleteBookmark = function (id) {
  // Delete recipe to bookmark obj
  const index = state.bookmark.findIndex((el) => (el.id = id));
  state.bookmark.splice(index, 1);

  // Make recipe property bookmarked to false
  state.recipe.bookmarked = !id === state.recipe.id;
};
