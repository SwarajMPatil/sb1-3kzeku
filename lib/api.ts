import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const NEWS_API = 'https://newsapi.org/v2';
const NEWS_API_KEY = process.env.NEWS_API_KEY || '';

export async function getTopCryptos(limit = 50) {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
        sparkline: true,
        price_change_percentage: '24h,7d,30d'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [];
  }
}

export async function getTrendingCoins() {
  // Mock data for demonstration
  return [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
      score: 0,
      market_cap_rank: 1,
      price_btc: 1
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
      score: 1,
      market_cap_rank: 2,
      price_btc: 0.053
    },
    // Add more mock trending coins
  ];
}

export async function getGainersLosers() {
  // Mock data for demonstration
  return {
    gainers: [
      {
        id: "gainer1",
        name: "GainerCoin",
        symbol: "GNR",
        image: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
        current_price: 1234.56,
        price_change_percentage_24h: 15.6
      },
      // Add more gainers
    ],
    losers: [
      {
        id: "loser1",
        name: "LoserCoin",
        symbol: "LSR",
        image: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
        current_price: 567.89,
        price_change_percentage_24h: -12.3
      },
      // Add more losers
    ]
  };
}

export async function getTrendingCategories() {
  // Mock data for demonstration
  return [
    {
      id: "defi",
      name: "DeFi",
      market_cap: 45000000000,
      market_cap_change_24h: 5.2,
      volume_24h: 2500000000,
      top_coins: ["AAVE", "UNI", "COMP"]
    },
    {
      id: "nft",
      name: "NFT",
      market_cap: 25000000000,
      market_cap_change_24h: -2.8,
      volume_24h: 1500000000,
      top_coins: ["APE", "SAND", "MANA"]
    },
    // Add more categories
  ];
}

export async function getMarketStats() {
  try {
    const response = await axios.get(`${COINGECKO_API}/global`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching market stats:', error);
    return null;
  }
}

export async function getNews(category = 'cryptocurrency') {
  try {
    // For demo purposes, return mock data since we don't have a real API key
    return getMockNews();
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

function getMockNews() {
  return [
    {
      id: 1,
      title: "Bitcoin Reaches New All-Time High Amid Institutional Adoption",
      description: "The world's largest cryptocurrency continues its bullish trend as more institutions add Bitcoin to their balance sheets.",
      source: "CryptoNews",
      publishedAt: "2024-03-20T10:30:00Z",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&auto=format&fit=crop",
      category: "Markets"
    },
    {
      id: 2,
      title: "Major Bank Launches Digital Asset Custody Service",
      description: "Leading financial institution announces new cryptocurrency custody solution for institutional clients.",
      source: "Financial Times",
      publishedAt: "2024-03-20T09:15:00Z",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop",
      category: "Business"
    },
    {
      id: 3,
      title: "New Regulatory Framework for Digital Assets Proposed",
      description: "Government officials outline comprehensive regulations for cryptocurrency markets and exchanges.",
      source: "Reuters",
      publishedAt: "2024-03-20T08:45:00Z",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop",
      category: "Regulation"
    }
  ];
}