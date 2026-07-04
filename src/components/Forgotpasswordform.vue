<template>
    <div class="forgot-password-form">
        <h2>Forgot Password</h2>
        <form @submit.prevent="handleForgotPassword">
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email" placeholder="Enter your registered email" />
        </div>
        <button type="submit">Send Reset Link</button>
        </form>
    </div>
</template>
<script>
import { ref } from 'vue';

export default {
    name: 'ForgotPasswordForm',
    setup() {
        const email = ref('');

        const handleForgotPassword = () => {
            alert(`Email: ${email.value}`);
        };

        return { email, handleForgotPassword };
    }
}
</script>

<style scoped>
.forgot-password-form {
  width: 400px;
  padding: 2rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
}

/* Judul */
.forgot-password-form h2 {
  color: #222;
  text-align: center;
  margin-bottom: 20px;
  font-size: 34px;
  font-weight: bold;
}

/* Label */
.forgot-password-form label {
  color: #222;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
}

/* Input */
.forgot-password-form input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: #222;
  background: white;
}

/* Tombol */
.forgot-password-form button {
  width: 100%;
  padding: 12px;
  margin-top: 18px;
  background: #34c759;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 17px;
}

.forgot-password-form button:hover {
  background: #28a745;
}
</style>