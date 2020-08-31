const { words, letters } = require("./hebrew");

/**
 * get the longest word in the dataset
 * @private
 * @param {string[]} words
 */
function getLongestWordLength(words) {
  return words.sort((a, b) => b.length - a.length)[0].length;
}

/**
 * check that the length of the word exists in the dataset
 * @private
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
 * filter words that contain specific charecters
 * @private
 * @param {string[]} words
 * @param {string[]} excludeChars
 */
function excludeCharsFromWords(words, excludeChars = []) {
  return words.filter((x) => ![...x].some((r) => excludeChars.includes(r)));
}

/**
 * get a random word from the dataset
 * @private
 * @param {string[]} words
 * @returns {string}
 */
function getRandomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

/**
 * filter the words by length
 * @private
 * @param {string[]} words
 * @param {number} length
 * @returns {string[]}
 */
function filterWordsByLength(words, length) {
  return words.filter((x) => x.length === length);
}

/**
 * get all words the have a specific length
 * @param {number} length
 * @returns {string}
 */
exports.getWordByLength = function (length) {
  checkLength(length, words);
  return getRandomWord(filterWordsByLength(words, length));
};

/**
 * get a random word from the dataset
 * @returns {string}
 */
exports.getRandomWord = function () {
  return getRandomWord(words);
};

/**
 * get a word that has a specific length and that includes the most letters possible from the letters array
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
