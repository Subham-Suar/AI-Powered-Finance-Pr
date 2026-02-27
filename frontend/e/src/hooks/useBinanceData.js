// src/hooks/useBinanceData.js

import { useState, useEffect } from 'react';
import { fetch24hrStats, fetchCandlestickData } from '../services/binanceApi';

export const useBinanceData = (symbol = 'BTCUSDT', interval = '1h') => {
  const [marketData, setMarketData] = useState(null);
  const [candles, setCandles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Parallel calls for better performance
        const [stats, candleData] = await Promise.all([
          fetch24hrStats(symbol),
          fetchCandlestickData(symbol, interval)
        ]);
        
        setMarketData(stats);
        setCandles(candleData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Hook error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Real-time updates har 10 second mein
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, [symbol, interval]);

  return { marketData, candles, loading, error };
};