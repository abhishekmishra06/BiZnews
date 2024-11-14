 <!-- <template>
    <div class="card">
      <div class="card-content" v-if="weatherData">
        <h2>{{ dayOrNight }} Weather</h2>
        <img :src="iconUrl" alt="Weather Icon" class="weather-icon" />
        <p>Location: {{ weatherData.location }}</p>
        <p>Temperature: {{ temperature }}°C</p>
        <p>Condition: {{ weatherData.condition }}</p>
        <p>Humidity: {{ weatherData.humidity }}%</p>
        <p>Wind Speed: {{ weatherData.windSpeed }} m/s</p>
        <p>Pressure: {{ weatherData.pressure }} hPa</p>
        <p>Sunrise: {{ sunriseTime }}</p>
        <p>Sunset: {{ sunsetTime }}</p>
      </div>
      <div v-else class="loading">
        <p>Loading weather data...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  
  // Default weather data structure
  const weatherData = ref(null);
  const apiKey = '20a36f8e1152244bbbd9ac296d3640f2'; // OpenWeather API key
  
  // Function to get user's geolocation
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };
  
  // Function to fetch weather data based on latitude and longitude
  const fetchWeatherData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
    try {
      console.log('Fetching weather data...');
      const response = await fetch(url);
      const data = await response.json();
  
      // Check if the data is valid
      if (data.cod !== 200) {
        console.error('Error fetching weather data:', data.message);
        weatherData.value = {
          location: 'Unknown',
          temperature: '-',
          condition: 'Error fetching data',
        };
        return;
      }
  
      // Process the API response
      weatherData.value = {
        location: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        icon: data.weather[0].icon,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      weatherData.value = {
        location: 'Error',
        temperature: '-',
        condition: 'Unable to fetch data',
      };
    }
  };
  
  // Get location and fetch weather data when the component is mounted
  onMounted(async () => {
    try {
      const position = await getUserLocation();
      const { latitude, longitude } = position.coords;
      console.log('User location:', latitude, longitude);
      await fetchWeatherData(latitude, longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      weatherData.value = {
        location: 'Unable to get location',
        temperature: '-',
        condition: 'N/A',
      };
    }
  });
  
  // Computed properties for dynamic information
  const temperature = computed(() => {
    return weatherData.value ? weatherData.value.temperature.toFixed(1) : '-';
  });
  
  const sunriseTime = computed(() => {
    if (weatherData.value && weatherData.value.sunrise) {
      const date = new Date(weatherData.value.sunrise * 1000);
      return date.toLocaleTimeString();
    }
    return '-';
  });
  
  const sunsetTime = computed(() => {
    if (weatherData.value && weatherData.value.sunset) {
      const date = new Date(weatherData.value.sunset * 1000);
      return date.toLocaleTimeString();
    }
    return '-';
  });
  
  // Determine whether it's day or night
  const dayOrNight = computed(() => {
    if (weatherData.value) {
      const currentTime = new Date().getTime() / 1000; // Current time in Unix format
      if (currentTime >= weatherData.value.sunrise && currentTime < weatherData.value.sunset) {
        return 'Day';
      }
      return 'Night';
    }
    return '';
  });
  
  // Dynamically choose the weather icon URL
  const iconUrl = computed(() => {
    if (weatherData.value) {
      return `http://openweathermap.org/img/wn/${weatherData.value.icon}.png`;
    }
    return '';
  });
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
  
  .loading {
    text-align: center;
    font-size: 1.1rem;
    color: #555;
  }
  
  .weather-icon {
    width: 50px;
    height: 50px;
  }
  </style> -->
















<!-- 


  <template>
    <div class="card">
      <div class="card-content" v-if="weatherData">
        <div class="weather-icon-container">
          <img :src="iconUrl" alt="Weather Icon" class="weather-icon" />
          <h2>{{ dayOrNight }} Weather</h2>
        </div>

       
        <div class="weather-icon-container">
          <img :src="iconUrl" alt="Weather Icon" class="weather-icon" />
          <p>{{ weatherData.condition }}</p>
        </div>
        <div class="weather-info">
          <p><i class="fas fa-map-marker-alt"></i> Location: {{ weatherData.location }}</p>
          <p><i class="fas fa-thermometer-half"></i> Temperature: {{ temperature }}°C</p>
          <p><i class="fas fa-tint"></i> Humidity: {{ weatherData.humidity }}%</p>
          <p><i class="fas fa-wind"></i> Wind Speed: {{ weatherData.windSpeed }} m/s</p>
          <p><i class="fas fa-tachometer-alt"></i> Pressure: {{ weatherData.pressure }} hPa</p>
          <p><i class="fas fa-sun"></i> Sunrise: {{ sunriseTime }}</p>
          <p><i class="fas fa-moon"></i> Sunset: {{ sunsetTime }}</p>
        </div>
      </div>
      <div v-else class="loading">
        <p>Loading weather data...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  
  // Default weather data structure
  const weatherData = ref(null);
  const apiKey = '20a36f8e1152244bbbd9ac296d3640f2'; // OpenWeather API key
  
  // Function to get user's geolocation
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };
  
  // Function to fetch weather data based on latitude and longitude
  const fetchWeatherData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
    try {
      console.log('Fetching weather data...');
      const response = await fetch(url);
      const data = await response.json();
  
      // Check if the data is valid
      if (data.cod !== 200) {
        console.error('Error fetching weather data:', data.message);
        weatherData.value = {
          location: 'Unknown',
          temperature: '-',
          condition: 'Error fetching data',
        };
        return;
      }
  
      // Process the API response
      weatherData.value = {
        location: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        icon: data.weather[0].icon,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      weatherData.value = {
        location: 'Error',
        temperature: '-',
        condition: 'Unable to fetch data',
      };
    }
  };
  
  // Get location and fetch weather data when the component is mounted
  onMounted(async () => {
    try {
      const position = await getUserLocation();
      const { latitude, longitude } = position.coords;
      console.log('User location:', latitude, longitude);
      await fetchWeatherData(latitude, longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      weatherData.value = {
        location: 'Unable to get location',
        temperature: '-',
        condition: 'N/A',
      };
    }
  });
  
  // Computed properties for dynamic information
  const temperature = computed(() => {
    return weatherData.value ? weatherData.value.temperature.toFixed(1) : '-';
  });
  
  const sunriseTime = computed(() => {
    if (weatherData.value && weatherData.value.sunrise) {
      const date = new Date(weatherData.value.sunrise * 1000);
      return date.toLocaleTimeString();
    }
    return '-';
  });
  
  const sunsetTime = computed(() => {
    if (weatherData.value && weatherData.value.sunset) {
      const date = new Date(weatherData.value.sunset * 1000);
      return date.toLocaleTimeString();
    }
    return '-';
  });
  
  // Determine whether it's day or night
  const dayOrNight = computed(() => {
    if (weatherData.value) {
      const currentTime = new Date().getTime() / 1000; // Current time in Unix format
      if (currentTime >= weatherData.value.sunrise && currentTime < weatherData.value.sunset) {
        return 'Day';
      }
      return 'Night';
    }
    return '';
  });
  
  // Dynamically choose the weather icon URL
  const iconUrl = computed(() => {
    if (weatherData.value) {
      return `http://openweathermap.org/img/wn/${weatherData.value.icon}.png`;
    }
    return '';
  });
  </script>
  
  <style scoped>
  .card {
    width: 350px;
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
    font-size: 1.4rem;
    color: #555;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .weather-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    gap: 10px;
  }
  
  .weather-icon {
    width: 60px;
    height: 60px;
  }
  
  .weather-info {
    font-size: 0.95rem;
    color: #555;
  }
  
  .weather-info p {
    margin: 6px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .loading {
    text-align: center;
    font-size: 1.1rem;
    color: #555;
  }
  
  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  </style> -->





  <template>
    <div class="card">
      <div class="card-content" v-if="weatherData">
        <h2>
          <i
            :class="dayOrNightIcon"
            :style="{ color: dayOrNightColor }"
          ></i>
          {{ dayOrNight }} Weather
        </h2>
        <div class="weather-icon-container">
          <img :src="iconUrl" alt="Weather Icon" class="weather-icon" />
          <p>{{ weatherData.condition }}</p>
        </div>
        <div class="weather-info">
          <p><i class="fas fa-map-marker-alt"></i> Location: {{ weatherData.location }}</p>
          <p><i class="fas fa-thermometer-half"></i> Temperature: {{ temperature }}°C</p>
          <p><i class="fas fa-tint"></i> Humidity: {{ weatherData.humidity }}%</p>
          <p><i class="fas fa-wind"></i> Wind Speed: {{ weatherData.windSpeed }} m/s</p>
          <p><i class="fas fa-tachometer-alt"></i> Pressure: {{ weatherData.pressure }} hPa</p>
          <p><i class="fas fa-sun"></i> Sunrise: {{ sunriseTime }}</p>
          <p><i class="fas fa-moon"></i> Sunset: {{ sunsetTime }}</p>
        </div>
      </div>
      <!-- <div v-else class="loading">
        <p>Loading weather data...</p>
      </div> -->



      <div v-else ="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading weather data...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  
  // Default weather data structure
  const weatherData = ref(null);
  const apiKey = '20a36f8e1152244bbbd9ac296d3640f2'; // OpenWeather API key
  
  // Function to get user's geolocation
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };
  
  // Function to fetch weather data based on latitude and longitude
  const fetchWeatherData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
    try {
      console.log('Fetching weather data...');
      const response = await fetch(url);
      const data = await response.json();
  
      // Check if the data is valid
      if (data.cod !== 200) {
        console.error('Error fetching weather data:', data.message);
        weatherData.value = {
          location: 'Unknown',
          temperature: '-',
          condition: 'Error fetching data',
        };
        return;
      }
  
      // Process the API response
      weatherData.value = {
        location: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        icon: data.weather[0].icon,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      weatherData.value = {
        location: 'Error',
        temperature: '-',
        condition: 'Unable to fetch data',
      };
    }
  };
  
  // Get location and fetch weather data when the component is mounted
  onMounted(async () => {
    try {
      const position = await getUserLocation();
      const { latitude, longitude } = position.coords;
      console.log('User location:', latitude, longitude);
      await fetchWeatherData(latitude, longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      weatherData.value = {
        location: 'Unable to get location',
        temperature: '-',
        condition: 'N/A',
      };
    }
  });
  
  // Computed properties for dynamic information
  const temperature = computed(() => {
    return weatherData.value ? weatherData.value.temperature.toFixed(1) : '-';
  });
  
  const sunriseTime = computed(() => {
    if (weatherData.value && weatherData.value.sunrise) {
      const date = new Date(weatherData.value.sunrise * 1000);
      return date.toLocaleTimeString();
    }
    return '-';
  });
  
  const sunsetTime = computed(() => {
    if (weatherData.value && weatherData.value.sunset) {
      const date = new Date(weatherData.value.sunset * 1000);
      return date.toLocaleTimeString();
    }
    return '-';
  });
  
  // Determine whether it's day or night
  const dayOrNight = computed(() => {
    if (weatherData.value) {
      const currentTime = new Date().getTime() / 1000; // Current time in Unix format
      if (currentTime >= weatherData.value.sunrise && currentTime < weatherData.value.sunset) {
        return 'Day';
      }
      return 'Night';
    }
    return '';
  });
  
  // Dynamically choose the weather icon URL
  const iconUrl = computed(() => {
    if (weatherData.value) {
      return `http://openweathermap.org/img/wn/${weatherData.value.icon}.png`;
    }
    return '';
  });
  
  // Conditional icon and color for day or night
  const dayOrNightIcon = computed(() => {
    return dayOrNight.value === 'Day' ? 'fas fa-sun' : 'fas fa-moon';
  });
  const dayOrNightColor = computed(() => {
    return dayOrNight.value === 'Day' ? '#FFD700' : '#4B0082'; // Gold for day, indigo for night
  });
  </script>
  
  <style scoped>
  .card {
    width: 350px;
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
    font-size: 1.4rem;
    color: #555;
    margin-bottom: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
  }
  
  .weather-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    gap: 10px;
  }
  
  .weather-icon {
    width: 60px;
    height: 60px;
  }
  
  .weather-info {
    font-size: 0.95rem;
    color: #555;
  }
  
  .weather-info p {
    margin: 6px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .loading {
    text-align: center;
    font-size: 1.1rem;
    color: #555;
  }
  
  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
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
  