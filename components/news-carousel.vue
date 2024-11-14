 










<template>
  <div class="carousel-container" v-if="currentNews">
    <!-- Display only one news card at a time -->
    <div class="news-card" v-if="currentNews">
      <!-- The image will be used as the background of the card -->
      <div class="image-wrapper" :style="{ backgroundImage: `url(${currentNews.image})` }">
        <div class="source">{{ currentNews.source }}</div>
        <div class="news-content">
          <h3>{{ currentNews.headline }}</h3>
          <p>{{ currentNews.summary }}</p>
          <span>{{ formattedDate(currentNews.datetime) }}</span>
        </div>
        <button @click="openNewsDetail(currentNews.url)">Read More</button>
      </div>
    </div>
  </div>
  <div v-else class="loading-container">
         <p>Loading...</p>
      </div>
   
  <!-- Navigation buttons -->
  <div class="navigation-buttons">
    <button @click="showPreviousNews" class="nav-button prev-button">Previous</button>
    <button @click="showNextNews" class="nav-button next-button">Next</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// State to hold the current news item being shown
const currentNews = ref(null);

// Array to store fetched news
const newsList = ref([]);

// Function to fetch news from the API
async function fetchNews() {
  try {
    const response = await axios.get('https://finnhub.io/api/v1/news?category=general&token=csr3n2hr01qhtrfmu7ngcsr3n2hr01qhtrfmu7o0');
    if (response.data && response.data.length > 0) {
      newsList.value = response.data;  // Store the fetched news
      currentNews.value = newsList.value[0];  // Set the first news article to be displayed
    } else {
      console.error('No news data available');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

// Current index of the news to display
const currentIndex = ref(0);

// Function to update the current news every 5 seconds
function updateNews() {
  if (newsList.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % newsList.value.length; // Cycle through news
    currentNews.value = newsList.value[currentIndex.value]; // Update the news content
  }
}

// Show next news article
const showNextNews = () => {
  if (newsList.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % newsList.value.length;
    currentNews.value = newsList.value[currentIndex.value];
  }
};

// Show previous news article
const showPreviousNews = () => {
  if (newsList.value.length > 0) {
    currentIndex.value = (currentIndex.value - 1 + newsList.value.length) % newsList.value.length;
    currentNews.value = newsList.value[currentIndex.value];
  }
};

// Start the update process on mounted
onMounted(() => {
  fetchNews(); // Fetch news when the component is mounted
  setInterval(updateNews, 5000); // Update every 5 seconds
});

// Function to format the datetime to a readable format
function formattedDate(datetime) {
  const date = new Date(datetime * 1000);
  return `${date.getHours()}:${date.getMinutes()} - ${date.toDateString()}`;
}

function openNewsDetail(url) {
  window.open(url, '_blank'); // Open the news URL in a new tab
}
</script>

<style scoped>
.carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.news-card {
  width: 100%; /* Full width of the container */
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper {
  width: 100%;
  height: 400px; /* You can adjust the height as needed */
  background-size: auto;  /* Ensure the image covers the full area */
  background-position: center center; /* Center the image */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Align content at the bottom */
  padding: 20px;
  color: white;
  text-align: left;
}

.source {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6); /* Transparent background for contrast */
  padding: 5px 10px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
}

.news-content {
  position: absolute;
  bottom: 40px;
  left: 20px;
  z-index: 1;
}

.news-card h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.news-card p {
  font-size: 1rem;
  margin-bottom: 10px;
}

.news-card span {
  font-size: 0.85rem;
  color: #ccc;
}

.news-card button {
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 0.85rem;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  z-index: 1;
  transition: background-color 0.3s ease;
}

.news-card button:hover {
  background-color: #0056b3;
}

/* Navigation buttons */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  /* padding: 0 20px; */
  z-index: 2;
}

.nav-button {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 30px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}



.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
  }
  
  
</style>







 