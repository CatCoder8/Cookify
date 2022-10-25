import { async } from "regenerator-runtime";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} ${res.status}`);

  // Converting underscore keys to camelcase
  state.recipe = Object.fromEntries(convertCamelCase(data.data.recipe));
  console.log(state.recipe);
};

// Function receiving object with key having underscore
// converting to camelCase notation
const convertCamelCase = function (obj) {
  const entries = Object.entries(obj);

  const newEntries = entries.map((entry) => {
    const [key, value] = entry;
    const lowerCaseKey = key.toLowerCase();
    const newKey = lowerCaseKey
      .split("_")
      .map((key, i) => {
        if (i == 0) return key;
        return `${key[0].toUpperCase()}${key.slice(1)}`;
      })
      .join("");
    return [newKey, value];
  });

  return newEntries;
};
