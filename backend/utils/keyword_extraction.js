// utils/keyword_extraction.js

const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

// Function to extract keywords from text
function extractKeywords(text, numKeywords = 20) {
  // Tokenize the text
  const tokens = tokenizer.tokenize(text);

  // Remove common stop words
  const stopWords = natural.stopwords;
  const filteredTokens = tokens.filter(
    token => !stopWords.includes(token.toLowerCase())
  );

  // Convert tokens to lowercase
  const lowerCaseTokens = filteredTokens.map(token => token.toLowerCase());

  // Count the frequency of each word
  const wordFreq = {};
  lowerCaseTokens.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });

  // Sort words by frequency
  const sortedWords = Object.keys(wordFreq).sort(
    (a, b) => wordFreq[b] - wordFreq[a]
  );

  // Return top N keywords
  const topKeywords = sortedWords.slice(0, numKeywords);
  return topKeywords;
}

module.exports = { extractKeywords };
