const { words } = require("./hebrew");

/**
 *
 * @param {string[]} words
 */
function getLongestWordLength(words) {
  return words.sort((a, b) => b.length - a.length)[0].length;
}

function checkLength(length, words) {
  if (typeof length !== "number" || length <= 0) {
    throw new Error("length cant be less or equel to zero");
  } else {
    const longestWordLength = getLongestWordLength(words);
    if (length > longestWordLength) {
      throw new Error(`length cant be bigger then ${longestWordLength}`);
    }
  }
}

/**
 * @param {string[]} words
 * @returns {string}
 */
function getRandomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

/**
 *
 * @param {string[]} words
 * @param {number} length
 * @returns {string[]}
 */
function filterWordsByLength(words, length) {
  return words.filter((x) => x.length === length);
}

/**
 *
 * @param {number} length
 * @returns {string}
 */
exports.getWordByLength = function (length) {
  checkLength(length, words);
  return getRandomWord(filterWordsByLength(words, length));
};

/**
 * @returns {string}
 */
exports.getRandomWord = function () {
  return getRandomWord(words);
};

/**
 *
 * @param {number} length
 * @param {string[]} letters
 */
exports.getWord = function (length, letters) {
  checkLength(length, words);
  let wordsByLength = filterWordsByLength(words, length);
  for (let i = 0; i < letters.length; i++) {
    const e = letters[i];
    const wordsByLengthFiltered = wordsByLength.filter((s) => s.includes(e));
    if (wordsByLengthFiltered.length < 1) {
      return getRandomWord(wordsByLength);
    }
    wordsByLength = wordsByLengthFiltered;
  }
  return getRandomWord(wordsByLength);
};
