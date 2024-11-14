<!-- pages/news/[id].vue -->
<template>
    <div>
      <h1>{{ newsDetail.title }}</h1>
      <p>{{ newsDetail.content }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const newsDetail = ref(null);
  const route = useRoute();
  
  async function fetchNewsDetail() {
    try {
      const response = await axios.get(`https://api.example.com/news/${route.params.id}`);
      newsDetail.value = response.data;
    } catch (error) {
      console.error('News Detail API error:', error);
    }
  }
  
  onMounted(() => {
    fetchNewsDetail();
  });
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 15px;
    color: #333;
  }
  </style>
  