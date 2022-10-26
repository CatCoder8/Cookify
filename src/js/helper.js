// Function receiving object with key having underscore naming
// converting to camelCase notation
export const convertCamelCase = function (obj) {
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
