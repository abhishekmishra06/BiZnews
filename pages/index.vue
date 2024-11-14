

   <!-- <template>
    <div>
       <div class="cards-container">
        <WeatherCard />
        <StockCard />
      </div>
  
      <br />
      <br />
       <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading News...</p>
      </div>
  
       <div v-else class="news-list">
        <div v-for="news in newsList" :key="news.id" class="news-card">
          <img :src="news.imageUrl" alt="news image" />
          <div class="news-content">
            <div class="text-content">
              <h3>{{ news.title }}</h3>
              <p>{{ news.description }}</p>
              <span>{{ news.time }}</span>
            </div>
            <button class="read-more-button" @click="openNewsDetail(news.url)">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import WeatherCard from '~/components/WeatherCard.vue';
  import StockCard from '~/components/StockCard.vue';
  
  const newsList = ref([]);
  const loading = ref(true);  // Loading state
  
  // Fetch news data on component mount
  onMounted(async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0aea38fea55d445f95fa1e286c5aea1e'
      );
      const articles = response.data.articles;
      // Transform the API data to fit your existing structure
      newsList.value = articles.map((article, index) => ({
        id: index + 1,
        title: article.title,
        description: article.description,
        time: formatPublishedDate(article.publishedAt),
        // Use a default image if the article does not have an image
        imageUrl: article.urlToImage || 'https://picsum.photos/200/300?random=2',
        url: article.url, // Add the URL for navigation
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      loading.value = false;  // Set loading to false once the data is fetched
    }
  });
  
  // Function to format the published date
  function formatPublishedDate(publishedAt) {
    const date = new Date(publishedAt);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60)); // Difference in minutes
    if (diff < 60) return `${diff} minutes ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  }
  
  // Function to navigate to news detail page
  function openNewsDetail(url) {
    window.open(url, '_blank'); // Open the news URL in a new tab
  }
  </script>
  
  <style scoped>
  .read-more-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
  
  /* Cards Container */
  .cards-container {
    display: flex;
    justify-content: space-evenly;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .news-list {
    display: flex;
    flex-direction: column;
  }
  
  .news-card {
    display: flex;
    margin-bottom: 15px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .news-card img {
    width: 120px;
    height: 100px;
    object-fit: cover;
    margin-right: 15px;
  }
  
  .news-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .text-content {
    flex-grow: 1;
  }
  
  .news-card h3 {
    font-size: 1.1rem;
    color: #333;
  }
  
  .news-card p {
    color: #666;
    font-size: 0.95rem;
  }
  
  .news-card span {
    font-size: 0.85rem;
    color: #999;
  }
  
  /* Centered "Read More" Button */
  .read-more-button {
    align-self: center;
    background-color: #007bff;
    color: white;
    border: none;
    font-size: 0.85rem;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .read-more-button:hover {
    background-color: #0056b3;
  }
  
  /* Loading Spinner */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
  }
  
  .loading-spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style> -->


























  

  <template>
    <div>
      <!-- Navbar -->
      <nav class="navbar">
        <div class="logo">BiZnews</div>
        <div class="nav-categories">
          <ul>
             <li
              @click="selectHome"
              :class="{ active: selectedCategory === 'Home' }"
            >
              Home
            </li>

            
            <li
              v-for="category in categories"
              :key="category"
              @click="fetchNewsByCategory(category)"
              :class="{ active: selectedCategory === category }"
            >
              {{ category }}
            </li>

            <li
            @click="selectWeather"
            :class="{ active: selectedCategory === 'weather' }"
          >
            Weather
          </li>

          </ul>
        </div>
        
      </nav>



      <div v-if="selectedCategory === 'weather'" class="center-content">
      <WeatherCard />
    </div>



      <!-- <NewsCarousel /> -->


      <div v-if="selectedCategory === 'Home'" >
        <NewsCarousel />
      </div><br />
  
     
  
      <!-- Show default news type on the home page below the cards -->
      <div v-if="selectedCategory === 'Home'" class="default-news-list">
        <h2>Top Headlines</h2>
        <div v-for="news in defaultNewsList" :key="news.id" class="news-card">
          <img :src="news.imageUrl" alt="news image" />
          <div class="news-content">
            <div class="text-content">
              <h3>{{ news.title }}</h3>
              <p>{{ news.description }}</p>
              <span>{{ news.time }}</span>
            </div>
            <button class="read-more-button" @click="openNewsDetail(news.url)">
              Read More
            </button>
          </div>
        </div>
      </div>
  
      <!-- Show loading spinner while fetching data -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading News...</p>
      </div>
  
      <!-- News List for selected categories -->
      <div v-else-if="selectedCategory !== 'Home'" class="news-list">
        <h2>{{selectedCategory}}</h2>
        <div v-for="news in newsList" :key="news.id" class="news-card">
          <img :src="news.imageUrl" alt="news image" />
          <div class="news-content">
            <div class="text-content">
              <h3>{{ news.title }}</h3>
              <p>{{ news.description }}</p>
              <span>{{ news.time }}</span>
            </div>
            <button class="read-more-button" @click="openNewsDetail(news.url)">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import NewsCarousel from '~/components/news-carousel.vue';
  import WeatherCard from '~/components/WeatherCard.vue';
  import StockCard from '~/components/StockCard.vue';
  
  const categories = ['Apple', 'Tesla', 'Business', 'TechCrunch', 'WSJ'];
  const categoryUrls = {
    Apple: 'https://newsapi.org/v2/everything?q=apple&from=2024-11-06&to=2024-11-06&sortBy=popularity&apiKey=0aea38fea55d445f95fa1e286c5aea1e',
    Tesla: 'https://newsapi.org/v2/everything?q=tesla&from=2024-10-07&sortBy=publishedAt&apiKey=0aea38fea55d445f95fa1e286c5aea1e',
    Business: 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0aea38fea55d445f95fa1e286c5aea1e',
    TechCrunch: 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0aea38fea55d445f95fa1e286c5aea1e',
    WSJ: 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=0aea38fea55d445f95fa1e286c5aea1e',
  };
  
  const newsList = ref([]);
  const defaultNewsList = ref([]);  // News for the home page
  const loading = ref(true);  // Loading state
  const selectedCategory = ref('Home');  // Default to "Home"
  



  function selectWeather() {
  selectedCategory.value = 'weather';
}



  // Function to select "Home" and show top two cards and default news
  async function selectHome() {
    selectedCategory.value = 'Home';
    loading.value = true;
    newsList.value = [];  // Clear news list for other categories
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=0aea38fea55d445f95fa1e286c5aea1e'
      );
      const articles = response.data.articles;
      defaultNewsList.value = articles.map((article, index) => ({
        id: index + 1,
        title: article.title,
        description: article.description,
        time: formatPublishedDate(article.publishedAt),
        imageUrl: article.urlToImage || 'https://picsum.photos/200/300?random=2',
        url: article.url, // Add the URL for navigation
      }));
    } catch (error) {
      console.error('Error fetching default news:', error);
    } finally {
      loading.value = false;
    }
  }
  
  // Function to fetch news based on category
  async function fetchNewsByCategory(category) {
    selectedCategory.value = category;
    loading.value = true;
    defaultNewsList.value = [];  // Clear default news list when selecting a category
    try {
      const response = await axios.get(categoryUrls[category]);
      const articles = response.data.articles;
      newsList.value = articles.map((article, index) => ({
        id: index + 1,
        title: article.title,
        description: article.description,
        time: formatPublishedDate(article.publishedAt),
        imageUrl: article.urlToImage || 'https://picsum.photos/200/300?random=2',
        url: article.url, // Add the URL for navigation
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      loading.value = false;
    }
  }
  
  // Function to format the published date
  function formatPublishedDate(publishedAt) {
    const date = new Date(publishedAt);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60)); // Difference in minutes
    if (diff < 60) return `${diff} minutes ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  }
  
  // Function to navigate to news detail page
  function openNewsDetail(url) {
    window.open(url, '_blank'); // Open the news URL in a new tab
  }
  
  // Fetch initial data for "Home"
  onMounted(() => {
    selectHome();
  });
  </script>
  
  <style scoped>

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}


  .navbar {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #333;
    color: white;
  }
  
  .nav-categories ul {
    display: flex;
    list-style: none;
  }
  
  .nav-categories li {
    margin: 0 10px;
    cursor: pointer;
  }
  
  .nav-categories li.active {
    font-weight: bold;
    border-bottom: 2px solid #fff;
  }
  
  .cards-container {
    display: flex;
    justify-content: space-evenly;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .default-news-list,
  .news-list {
    display: flex;
    flex-direction: column;
  }
  
  .news-card {
    display: flex;
    margin-bottom: 15px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .news-card img {
    width: 120px;
    height: 100px;
    object-fit: cover;
    margin-right: 15px;
  }
  
  .news-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .text-content {
    flex-grow: 1;
  }
  
  .news-card h3 {
    font-size: 1.1rem;
    color: #333;
  }
  
  .news-card p {
    color: #666;
    font-size: 0.95rem;
  }
  
  .news-card span {
    font-size: 0.85rem;
    color: #999;
  }
  
  .read-more-button {
    align-self: center;
    background-color: #007bff;
    color: white;
    border: none;
    font-size: 0.85rem;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .read-more-button:hover {
    background-color: #0056b3;
  }
  
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
  }
  
  .loading-spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  













 