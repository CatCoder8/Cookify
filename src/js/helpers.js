import { TIMEOUT_SECS } from "./config";

// Converting to camelCase notation
export const convertCamelCase = function (obj) {
  const convertedObj = Object.entries(obj).map(([key, value]) => {
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

  return Object.fromEntries(convertedObj);
};

// Error handling for long time request
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Return JSON from API
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECS)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
