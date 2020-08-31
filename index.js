const { words, letters } = require("./hebrew");

/**
 *
 * @param {string[]} words
 */
function getLongestWordLength(words) {
  return words.sort((a, b) => b.length - a.length)[0].length;
}

/**
 *
 * @param {nubmer} length
 * @param {string[]} words
 */
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
 *
 * @param {string[]} words
 * @param {string[]} excludeChars
 */
function excludeCharsFromWords(words, excludeChars = []) {
  return words.filter((x) => ![...x].some((r) => excludeChars.includes(r)));
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
 * @param {string[]} excludeChars
 */
exports.getWord = function (length, letters, excludeChars) {
  checkLength(length, words);
  let wordsByLength = filterWordsByLength(
    excludeCharsFromWords(words, excludeChars),
    length
  );
  letters.forEach((e) => {
    const wordsByLengthFiltered = wordsByLength.filter((s) => s.includes(e));
    if (wordsByLengthFiltered.length < 1) {
      return getRandomWord(wordsByLength);
    }
    wordsByLength = wordsByLengthFiltered;
  });
  return getRandomWord(wordsByLength);
};

exports.letters = letters;
