import { async } from "regenerator-runtime";
import { TIMEOUT_SECS } from "./config";

// Converting to camelCase notation
export const convertCamelCase = function (obj, splitSymbol = "_") {
  const convertedObj = Object.entries(obj).map(([key, value]) => {
    const lowerCaseKey = key.toLowerCase();
    const newKey = lowerCaseKey
      .split(splitSymbol)
      .map((key, i) => {
        if (i == 0) return key;
        return `${key[0].toUpperCase()}${key.slice(1)}`;
      })
      .join("");
    return [newKey, value];
  });

  return Object.fromEntries(convertedObj);
};

// Error handling promise for x time request
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    // Define fetchLink if it's receive or send
    const fetchLink = uploadData
      ? await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : await fetch(url);

    // Error handling base on time
    const res = await Promise.race([fetchLink, timeout(TIMEOUT_SECS)]);

    // Converting to an obj
    const data = await res.json();

    // Error handling base on response
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

// Dynamic updating text and attributes
export const update = function (previousMarkup, newMarkup) {
  // Getting the Node list in the previous and new markup
  const curElements = Array.from(previousMarkup);

  const newDOM = document.createRange().createContextualFragment(newMarkup);
  const newElements = Array.from(newDOM.querySelectorAll("*"));

  newElements.forEach((newEl, i) => {
    const curEl = curElements[i];

    // Update changed text
    if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() != "")
      curEl.textContent = newEl.textContent;

    // Update changed attributes
    if (!newEl.isEqualNode(curEl))
      Array.from(newEl.attributes).forEach((attr) =>
        curEl.setAttribute(attr.name, attr.value)
      );
  });
};
