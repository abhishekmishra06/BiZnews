<!-- <template>
    <div class="stock-card card">
      <h2>Stock Market</h2>
      <p v-if="stockData">Top Stock: {{ stockData.name }}</p>
      <p v-if="stockData">Price: {{ stockData.price }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const stockData = ref(null);
  
  async function fetchStock() {
    try {
      const response = await axios.get(`https://api.example.com/stocks`);
      stockData.value = response.data;
    } catch (error) {
      console.error('Stock API error:', error);
    }
  }
  
  onMounted(() => {
    fetchStock();
  });
  </script>
  
  <style scoped>
  .card {
    padding: 20px;
    border-radius: 8px;
    background-color: lightgreen;
  }
  </style> -->
  


<!-- components/StockCard.vue -->
<template>
    <div class="card">
      <div class="card-content">
        <h2>Top Stock Information</h2>
        <p>Company: {{ stockData.company }}</p>
        <p>Symbol: {{ stockData.symbol }}</p>
        <p>Price: ${{ stockData.price }}</p>
        <p>Change: {{ stockData.change }}%</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const stockData = {
    company: 'Apple Inc.',
    symbol: 'AAPL',
    price: 150.25,
    change: -1.05,
  };
  </script>
  
  <style scoped>
  .card {
    width: 300px;
    padding: 20px;
    margin-top: 20px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .card-content {
    padding: 10px 20px;
    text-align: left;
    color: #333;
  }
  
  .card h2 {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 10px;
  }
  
  .card p {
    color: #777;
    font-size: 0.95rem;
  }
  
  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  body {
    background-color: #f5f5f5;
  }
  </style>
  