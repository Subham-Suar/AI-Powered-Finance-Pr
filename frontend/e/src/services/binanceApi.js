// src/services/binanceApi.js

// Base URLs
const BINANCE_BASE_URL = 'https://api.binance.com/api/v3';

// 1. Current price fetch karne ke liye
export const fetchCurrentPrice = async (symbol = 'BTCUSDT') => {
  try {
    const response = await fetch(`${BINANCE_BASE_URL}/ticker/price?symbol=${symbol}`);
    const data = await response.json();
    return {
      price: parseFloat(data.price),
      symbol: symbol
    };
  } catch (error) {
    console.error('Price fetch error:', error);
    throw error;
  }
};

// 2. 24 hour stats ke liye
export const fetch24hrStats = async (symbol = 'BTCUSDT') => {
  try {
    const response = await fetch(`${BINANCE_BASE_URL}/ticker/24hr?symbol=${symbol}`);
    const data = await response.json();
    return {
      price: parseFloat(data.lastPrice),
      change: parseFloat(data.priceChangePercent),
      high: parseFloat(data.highPrice),
      low: parseFloat(data.lowPrice),
      volume: parseFloat(data.volume),
      symbol: symbol
    };
  } catch (error) {
    console.error('24hr stats error:', error);
    throw error;
  }
};

// 3. Candlestick data ke liye (chart ke liye)
export const fetchCandlestickData = async (
  symbol = 'BTCUSDT', 
  interval = '1h', 
  limit = 50
) => {
  try {
    const response = await fetch(
      `${BINANCE_BASE_URL}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );
    const data = await response.json();
    
    // Binance data ko hamare format mein convert karo
    return data.map(candle => ({
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
      volume: parseFloat(candle[5]) / 1000, // Convert to K
      timestamp: candle[0]
    }));
  } catch (error) {
    console.error('Candlestick error:', error);
    throw error;
  }
};

// 4. Multiple symbols ek saath fetch karne ke liye
export const fetchMultipleSymbols = async (symbols = ['BTCUSDT', 'ETHUSDT']) => {
  try {
    const promises = symbols.map(symbol => 
      fetch(`${BINANCE_BASE_URL}/ticker/24hr?symbol=${symbol}`)
    );
    const responses = await Promise.all(promises);
    const data = await Promise.all(responses.map(r => r.json()));
    
    return data.map(item => ({
      symbol: item.symbol,
      price: parseFloat(item.lastPrice),
      change: parseFloat(item.priceChangePercent)
    }));
  } catch (error) {
    console.error('Multiple symbols error:', error);
    throw error;
  }
};