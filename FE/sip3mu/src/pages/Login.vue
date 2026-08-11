<template>
  <div class="login-container">
    <div class="login-card">
      <div style="text-align: center; margin-bottom: 20px">
        <img
          src="/logo-undip.png"
          alt="Logo Undip"
          style="height: 80px; object-fit: contain"
        />
        <h2>Single Sign On (SSO)</h2>
        <p style="color: #666">Universitas Diponegoro</p>
      </div>

      <p style="text-align: center; font-size: 12px; color: #999">
        Silahkan Masuk
      </p>

      <form
        @submit.prevent="handleLogin"
        style="display: flex; flex-direction: column; gap: 15px"
      >
        <input
          type="text"
          v-model="username"
          placeholder="NIM/NIP/username/e-mail official Undip"
          class="input-field"
          required
        />
        <button type="submit" class="btn-outline">LOGIN</button>
        <button type="button" class="btn-solid">Reset Password</button>
      </form>

      <div style="margin-top: 20px; font-size: 14px">
        <p>
          Belum memiliki akun?
          <a href="#" style="color: #d9534f">Daftar sekarang!</a>
        </p>
        <p>
          <a href="#" style="color: #0056b3">Pendaftaran alumni klik disini</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");

const handleLogin = () => {
  router.push("/dashboard");
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Pastikan bg-undip.jpg ada di folder public */
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),
    url("/bg-undip.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-card {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
}

.login-card h2 {
  margin: 10px 0 5px 0;
}

.input-field {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.btn-outline {
  padding: 12px;
  border: 1px solid #0056b3;
  color: #0056b3;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-solid {
  padding: 12px;
  border: none;
  color: white;
  background-color: #d9534f;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style>
