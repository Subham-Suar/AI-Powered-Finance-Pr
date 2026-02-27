// src/services/newsApi.js

// CryptoCompare News API (free, no key needed)
const CRYPTOCOMPARE_URL = 'https://min-api.cryptocompare.com/data/v2/news/';

export const fetchCryptoNews = async (categories = 'BTC', limit = 10) => {
  try {
    const response = await fetch(
      `${CRYPTOCOMPARE_URL}?categories=${categories}&limit=${limit}`
    );
    const data = await response.json();
    
    return data.Data.map(news => ({
      id: news.id,
      title: news.title,
      body: news.body,
      source: news.source,
      publishedOn: new Date(news.published_on * 1000).toLocaleString(),
      url: news.url,
      image: news.imageurl,
      categories: news.categories,
      sentiment: analyzeSentiment(news.title + ' ' + news.body) // Simple sentiment
    }));
  } catch (error) {
    console.error('News fetch error:', error);
    return [];
  }
};

// Simple sentiment analysis (can be improved)
const analyzeSentiment = (text) => {
  const positiveWords = ['bull', 'surge', 'gain', 'rise', 'up', 'positive', 'growth'];
  const negativeWords = ['bear', 'drop', 'fall', 'down', 'crash', 'negative', 'loss'];
  
  const lowerText = text.toLowerCase();
  
  let score = 0;
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) score += 1;
  });
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) score -= 1;
  });
  
  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
};