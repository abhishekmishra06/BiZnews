<template>
    <div class="news-card border rounded-lg shadow-lg p-4">
      <img :src="news.image" alt="News Image" class="w-full h-48 object-cover rounded-md" />
      <h2 class="text-xl font-semibold mt-4">{{ news.title }}</h2>
      <p class="text-gray-700 mt-2">{{ news.description }}</p>
      <p class="text-sm text-gray-500 mt-2">{{ formatDate(news.time) }}</p>
      <button class="mt-4 text-blue-500 hover:underline" @click="goToNewsDetail(news.id)">
        Read More
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    news: Object, // The news item data passed as a prop
  });
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // You can adjust this to display the format you prefer
  };
  
  const goToNewsDetail = (id) => {
    // Navigate to a news detail page, passing the ID (you need to create a page for this)
    useRouter().push(`/news/${id}`);
  };
  </script>
  
  <style scoped>
  .news-card {
    background-color: #fff;
  }
  </style>
  