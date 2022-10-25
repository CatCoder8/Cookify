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
    const res = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    // Converting underscore keys to camelcase
    const recipe = Object.fromEntries(convertCamelCase(data.data.recipe));
    console.log(recipe);
  } catch (err) {
    alert(err);
  }
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

showRecipe();
