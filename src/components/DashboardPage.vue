<template>
  <div class="page">

    <div class="welcome-header">
      <div class="weather-icon">☀️☁️</div>
      <h1>Selamat Datang, {{ authStore.username || 'Pengguna' }}</h1>
      <p>Cari informasi cuaca kota favoritmu</p>
    </div>

    <section class="dashboard">

      <div class="weather-search">
        <input
          v-model="city"
          type="text"
          placeholder="Masukkan nama kota"
        />

        <button @click="getWeather">
          Cari Cuaca
        </button>
      </div>

      <div v-if="weather" class="weather-result">

        <div class="weather-top">

          <img
            :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`"
          />

          <div>
            <h2>{{ Math.round(weather.main.temp) }}°C</h2>
            <p>{{ weather.weather[0].description }}</p>
          </div>

        </div>

        <div class="weather-grid">

          <div class="card">
            <h4>📍 Kota</h4>
            <p>{{ weather.name }}</p>
          </div>

          <div class="card">
            <h4>🌍 Negara</h4>
            <p>{{ weather.sys.country }}</p>
          </div>

          <div class="card">
            <h4>💧 Kelembapan</h4>
            <p>{{ weather.main.humidity }}%</p>
          </div>

          <div class="card">
            <h4>💨 Angin</h4>
            <p>{{ weather.wind.speed }} m/s</p>
          </div>

          <div class="card">
            <h4>🌡 Feels Like</h4>
            <p>{{ weather.main.feels_like }}°C</p>
          </div>

          <div class="card">
            <h4>🔽 Tekanan</h4>
            <p>{{ weather.main.pressure }} hPa</p>
          </div>

        </div>

      </div>

      <button class="logout-button" @click="handleLogout">
        Logout
      </button>

    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const city = ref('')
const weather = ref(null)

const getWeather = async () => {

  if (!city.value) {
    alert('Masukkan nama kota')
    return
  }

  try {

   const response = await fetch(
  `http://localhost:3001/api/weather?city=${encodeURIComponent(city.value)}`
)

    const data = await response.json()

    if (!response.ok) {
      alert(data.message)
      return
    }

    weather.value = data

  } catch (err) {
    console.log(err)
    alert('Gagal mengambil data cuaca')
  }

}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>

.page{
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:40px;
}

.welcome-header{
    text-align:center;
    color:white;
    margin-bottom:30px;
}

.weather-icon{
    font-size:70px;
}

.welcome-header h1{
    font-size:42px;
    font-weight:bold;
    text-shadow:2px 2px 10px rgba(0,0,0,.4);
}

.welcome-header p{
    font-size:18px;
    color:white;
}

.dashboard{

    width:650px;

    padding:30px;

    border-radius:25px;

    background:rgba(255,255,255,.25);

    backdrop-filter:blur(15px);

    border:1px solid rgba(255,255,255,.4);

}

.weather-search input{

    width:100%;

    padding:15px;

    border:none;

    border-radius:15px;

    font-size:17px;

}

.weather-search button{

    margin-top:15px;

    width:100%;

    padding:15px;

    border:none;

    border-radius:15px;

    background:#2ecc71;

    color:white;

    font-size:18px;

    cursor:pointer;

}

.weather-result{

    margin-top:25px;

    padding:25px;

    background:rgba(255,255,255,.95);

    border-radius:20px;

}

.weather-top{

    display:flex;

    justify-content:center;

    align-items:center;

    gap:20px;

    margin-bottom:20px;

}

.weather-top img{

    width:110px;

}

.weather-top h2{

    font-size:48px;

    color:#222;

}

.weather-top p{

    color:#555;

    font-size:20px;

    text-transform:capitalize;

}

.weather-grid{

    display:grid;

    grid-template-columns:repeat(2,1fr);

    gap:15px;

}

.card{

    background:#fff;

    border-radius:15px;

    padding:18px;

    box-shadow:0 5px 12px rgba(0,0,0,.15);

    text-align:center;

}

.card h4{

    color:#0d6efd;

    margin-bottom:10px;

    font-size:18px;

}

.card p{

    color:#222;

    font-weight:bold;

    font-size:20px;

}

.logout-button{

    width:100%;

    margin-top:25px;

    padding:15px;

    border:none;

    border-radius:15px;

    background:#e53935;

    color:white;

    font-size:18px;

    cursor:pointer;

}

.logout-button:hover{

    background:#c62828;

}

@media(max-width:700px){

.dashboard{
width:95%;
}

.weather-grid{
grid-template-columns:1fr;
}

.welcome-header h1{
font-size:30px;
}

}

</style>