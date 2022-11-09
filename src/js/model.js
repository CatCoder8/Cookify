import { convertCamelCase, AJAX } from "./helpers.js";
import {
  API_URL,
  DEFAULT_PAGE,
  TOTAL_SEARCH_COUNT as TOTAL_SEARCH_COUNT,
  KEY,
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

// NOTE: RELATED TO RECIPE FUNCTION
// Fetching data and changing state of the recipe
export const loadRecipe = async function (id) {
  try {
    // Fetching data
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    // Passing into recipe obj
    state.recipe = convertCamelCase(data.data.recipe);
    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// NOTE: RELATED TO SEARCH FUNCTION
// Fetching data and changing state of the search
export const loadSearchResult = async function (query) {
  try {
    // Fetching data
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    // Passing to search obj
    state.search.query = query;
    const results = data.data.recipes;
    state.search.results = results.map((obj) => convertCamelCase(obj));
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

// NOTE: RELATED TO BOOKMARK FUNCTION
export const addBookmark = function (recipe) {
  // Add recipe to bookmark obj
  state.bookmarks.push(recipe);

  // Make recipe property bookmarked to true
  state.recipe.bookmarked = recipe.id === state.recipe.id;

  persistBookmark();
};

export const deleteBookmark = function (id) {
  // Delete recipe to bookmark obj
  const index = state.bookmarks.findIndex((el) => (el.id = id));
  state.bookmarks.splice(index, 1);

  // Make recipe property bookmarked to false
  state.recipe.bookmarked = !id === state.recipe.id;

  persistBookmark();
};

const persistBookmark = function () {
  localStorage.setItem("bookmark", JSON.stringify(state.bookmarks));
};

// const clearBookmarks = function () {
//   localStorage.clear("bookmarks");
// };
// clearBookmarks();

const init = function () {
  const storage = localStorage.getItem("bookmark");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

// NOTE: UPLOAD RECIPE
export const uploadRecipe = async function (recipeData) {
  try {
    // Get the ingredients
    const ingredients = recipeData
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].replaceAll(" ", "").split(",");
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredients format! Please use the correct format."
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    // Convert recipe into accepted format in API
    const recipe = Object.fromEntries(recipeData);
    const newRecipe = {
      title: recipe.title,
      source_url: recipe.sourceUrl,
      image_url: recipe.image,
      publisher: recipe.publisher,
      cooking_time: +recipe.cookingTime,
      servings: +recipe.servings,
      ingredients,
    };

    // Send newRecipe
    const data = await AJAX(`${API_URL}?key=${KEY}`, newRecipe);

    // Passing into recipe obj
    state.recipe = convertCamelCase(data.data.recipe);

    // Bookmark new recipe
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
