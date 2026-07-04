<template>
  <div class="login-page">
    <div class="login-form">

      <!-- Header -->
      <div class="weather-header">
        <div class="weather-icon">🌤️</div>
        <h1>Cuaca Hari Ini</h1>
      </div>

      <h2>Login</h2>

      <form @submit.prevent="handleLogin">

        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Masukkan Username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Masukkan Password"
            required
          />
        </div>

        <button type="submit">
          Login
        </button>

        <div class="register-label">
          Don't have an account?
          <router-link to="/register">
            Register
          </router-link>
        </div>

        <div class="register-label">
          <router-link to="/forgot-password">
            Forgot Password?
          </router-link>
        </div>

      </form>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginForm',

  setup() {
    const auth = useAuthStore()
    const router = useRouter()

    const username = ref('')
    const password = ref('')

    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        })

        const data = await response.json()

        if (!response.ok) {
          alert(data.message)
          return
        }

        auth.login(data.user.username)
        router.push('/dashboard')

      } catch (error) {
        console.error(error)
        alert('Gagal terhubung ke server')
      }
    }

    return {
      username,
      password,
      handleLogin
    }
  }
}
</script>

<style scoped>

.login-page{
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;

    /* Ganti sesuai lokasi gambar */
    background:url('/images/cloud.jpg') center center/cover no-repeat;
}

.login-form{
    width:420px;
    padding:35px;
    border-radius:18px;
    background:rgba(255,255,255,.88);
    backdrop-filter:blur(8px);
    box-shadow:0 10px 35px rgba(0,0,0,.25);
}

/* ================= HEADER ================= */

.weather-header{
    display:flex;
    justify-content:center;
    align-items:center;
    gap:15px;
    border-bottom:1px solid #dcdcdc;
    padding-bottom:18px;
    margin-bottom:25px;
}

.weather-icon{
    font-size:50px;
}

.weather-header h1{
    margin:0;
    color:#000;
    font-size:34px;
    font-weight:bold;
}

/* ================= LOGIN ================= */

h2{
    color:#000;
    text-align:left;
    margin-bottom:25px;
}

.form-group{
    margin-bottom:18px;
}

label{
    display:block;
    margin-bottom:8px;
    color:#000;
    font-weight:600;
}

input{
    width:100%;
    padding:13px;
    border-radius:8px;
    border:1px solid #cfcfcf;
    box-sizing:border-box;
    font-size:15px;
}

input:focus{
    outline:none;
    border-color:#42b983;
    box-shadow:0 0 8px rgba(66,185,131,.4);
}

button{
    width:100%;
    padding:14px;
    margin-top:10px;
    border:none;
    border-radius:8px;
    background:#42b983;
    color:#fff;
    font-size:17px;
    font-weight:bold;
    cursor:pointer;
    transition:.3s;
}

button:hover{
    background:#2fa36d;
}

/* ================= LINK ================= */

.register-label{
    margin-top:18px;
    text-align:center;
    color:#000;
    font-size:15px;
}

.register-label a{
    color:#2fa36d;
    text-decoration:none;
    font-weight:bold;
}

.register-label a:hover{
    text-decoration:underline;
}

</style>