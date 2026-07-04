<template>
  <div class="register-form">
    <h2>Register</h2>

    <form @submit.prevent="handleRegister">

      <div class="form-group">
        <label>Username</label>
        <input
          type="text"
          v-model="username"
          placeholder="Masukkan username"
          required
        />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          v-model="email"
          placeholder="Masukkan email"
          required
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          placeholder="Masukkan password"
          required
        />
      </div>

      <div class="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Konfirmasi password"
          required
        />
      </div>

      <button type="submit">
        Register
      </button>

      <p class="register-label">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>

    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const API_BASE_URL = "http://localhost:3001/api/auth";

export default {
  name: "RegisterPage",

  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const handleRegister = async () => {

      if (!username.value) {
        alert("Username wajib diisi");
        return;
      }

      if (username.value.length < 3) {
        alert("Username minimal 3 karakter");
        return;
      }

      const usernameRegex = /^[A-Za-z]+$/;

      if (!usernameRegex.test(username.value)) {
        alert("Username tidak boleh mengandung angka");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email.value) {
        alert("Email wajib diisi");
        return;
      }

      if (!emailRegex.test(email.value)) {
        alert("Email tidak valid");
        return;
      }

      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

      if (!passwordRegex.test(password.value)) {
        alert("Password minimal 8 karakter, mengandung huruf kapital dan angka");
        return;
      }

      if (password.value !== confirmPassword.value) {
        alert("Password dan Confirm Password tidak sama");
        return;
      }

      try {

        const response = await fetch(`${API_BASE_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          alert(result.message || "Registrasi gagal");
          return;
        }

        authStore.login(username.value);

        alert("Registrasi berhasil!");

        router.push("/login");

      } catch (error) {
        alert("Backend belum berjalan.");
      }

    };

    return {
      username,
      email,
      password,
      confirmPassword,
      handleRegister,
    };
  },
};
</script>

<style scoped>

.register-form {
  width: 430px;
  padding: 40px;
  border-radius: 18px;
  background: rgba(255,255,255,.92);
  backdrop-filter: blur(15px);
  box-shadow: 0 15px 35px rgba(0,0,0,.25);
}

.register-form h2{
  text-align:center;
  font-size:45px;
  margin-bottom:30px;
  color:#222;
  font-weight:bold;
}

.form-group{
  margin-bottom:22px;
}

label{
  display:block;
  font-size:18px;
  font-weight:600;
  color:#222;
  margin-bottom:8px;
}

input{
  width:100%;
  padding:15px;
  border-radius:10px;
  border:1px solid #ccc;
  font-size:16px;
  transition:.3s;
  box-sizing:border-box;
}

input:focus{
  outline:none;
  border-color:#22c55e;
  box-shadow:0 0 10px rgba(34,197,94,.3);
}

button{
  width:100%;
  padding:16px;
  margin-top:10px;
  border:none;
  border-radius:10px;
  background:#16a34a;
  color:white;
  font-size:22px;
  font-weight:bold;
  cursor:pointer;
  transition:.3s;
}

button:hover{
  background:#15803d;
  transform:translateY(-2px);
}

.register-label{
  text-align:center;
  margin-top:25px;
  font-size:18px;
  color:#333;
}

.register-label a{
  color:#2563eb;
  font-weight:bold;
  text-decoration:none;
}

.register-label a:hover{
  text-decoration:underline;
}

</style>