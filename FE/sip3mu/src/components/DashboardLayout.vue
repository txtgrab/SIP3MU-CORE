<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: #f4f6f9;
      position: relative;
    "
  >
    <!-- Popup Operator -->
    <div v-if="showOperatorPopup" class="modal-overlay">
      <div class="modal-content">
        <h3 style="margin-top: 0; color: #1a1a2e">Pilih Tingkat Wewenang</h3>
        <p style="font-size: 14px; color: #666; margin-bottom: 20px">
          Silakan pilih ruang lingkup wewenang Operator Anda:
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px">
          <button
            @click="handlePilihOperator('OPERATOR_FAKULTAS')"
            class="btn-primary-full"
          >
            🏢 Operator Fakultas
          </button>
          <button
            @click="handlePilihOperator('OPERATOR_LPPM')"
            class="btn-primary-full"
          >
            🎓 Operator Universitas (LPPM)
          </button>
        </div>
        <button
          @click="showOperatorPopup = false"
          class="btn-outline"
          style="margin-top: 15px; width: 100%"
        >
          Batal
        </button>
      </div>
    </div>

    <!-- Header -->
    <header
      style="
        display: flex;
        justify-content: space-between;
        padding: 15px 30px;
        background-color: white;
        align-items: center;
      "
    >
      <h3 style="margin: 0; color: #1a1a2e">SIP3MU UNDIP</h3>
      <div style="display: flex; gap: 20px; align-items: center">
        <select
          :value="isOperator ? 'OPERATOR' : role"
          @change="handleRoleChange"
          style="
            padding: 8px;
            background-color: #1a1a2e;
            color: white;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          <option value="DOSEN">DOSEN</option>
          <option value="REVIEWER">REVIEWER</option>
          <option value="OPERATOR">OPERATOR</option>
          <option value="VERIFIKATORF">VERIFIKATOR FAKULTAS</option>
          <option value="VERIFIKATORU">VERIFIKATOR UNIVERSITAS</option>
          <option value="PIMPINAN">PIMPINAN</option>
          <option value="ADMINISTRATOR">ADMINISTRATOR</option>
        </select>
        
        <div
          style="display: flex; align-items: center; gap: 10px; cursor: pointer"
        >
          <div
            style="
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background-color: #ccc;
            "
          ></div>
          <!-- Nama User Dinamis di Header -->
          <span>{{ loading ? 'Memuat...' : (user?.nama || 'Pengguna') }}</span>
        </div>

        <!-- Tombol Logout -->
        <button 
          @click="handleLogout"
          style="
            background-color: #d9534f;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
            font-size: 12px;
          "
        >
          LOGOUT
        </button>
      </div>
    </header>

    <!-- Navigasi Menu Dinamis Berdasarkan Role -->
    <nav
      style="
        background-color: #1a1a2e;
        padding: 15px 30px;
        display: flex;
        justify-content: center;
        gap: 50px;
        flex-wrap: wrap;
      "
    >
      <router-link to="/dashboard" class="nav-link" exact
        ><span>Dashboard</span></router-link
      >

      <template v-if="role === 'DOSEN'">
        <router-link to="/portofolio" class="nav-link"><span>Portofolio</span></router-link>
        <router-link to="/penelitian" class="nav-link"><span>Penelitian</span></router-link>
        <router-link to="/pengabdian" class="nav-link"><span>Pengabdian</span></router-link>
        <router-link to="/publikasi" class="nav-link"><span>Publikasi</span></router-link>
        <router-link to="/pendanaan-lain" class="nav-link"><span>Pendanaan lain</span></router-link>
        <router-link to="/kekayaan-intelektual" class="nav-link"><span>Kekayaan Intelektual</span></router-link>
      </template>

      <template v-if="role === 'REVIEWER'">
        <router-link to="/evaluasi-proposal" class="nav-link"><span>Evaluasi Proposal</span></router-link>
        <router-link to="/monev" class="nav-link"><span>Proses Monev</span></router-link>
      </template>

      <template v-if="isOperator">
        <router-link to="/verifikasi-usulan" class="nav-link"><span>Verifikasi Usulan</span></router-link>
        <router-link to="/plotting-reviewer" class="nav-link"><span>Plotting Reviewer</span></router-link>
        <router-link to="/rekapitulasi-operator" class="nav-link"><span>Rekapitulasi</span></router-link>
      </template>

      <template v-if="role === 'VERIFIKATORF'">
        <router-link to="/verifikasi-fakultas" class="nav-link"><span>Verifikasi Fakultas</span></router-link>
      </template>

      <template v-if="role === 'VERIFIKATORU'">
        <router-link to="/verifikasi-universitas" class="nav-link"><span>Penetapan LPPM</span></router-link>
      </template>

      <template v-if="role === 'PIMPINAN'">
        <router-link to="/persetujuan-pimpinan" class="nav-link"><span>Pengesahan Pimpinan</span></router-link>
      </template>

      <template v-if="role === 'ADMINISTRATOR'">
        <router-link to="/manajemen-pengguna" class="nav-link"><span>Manajemen Pengguna</span></router-link>
      </template>
    </nav>

    <!-- Konten Halaman -->
    <div style="display: flex; padding: 20px; gap: 20px; flex: 1">
      
      <!-- Router View (Kiri) -->
      <div
        :style="{
          flex: isDashboard ? 3 : 1,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          minHeight: '500px',
        }"
      >
        <router-view />
      </div>

      <!-- Kotak Profil (Kanan, khusus halaman depan Dashboard) -->
      <div
        v-if="isDashboard"
        style="flex: 1; display: flex; flex-direction: column; gap: 20px"
      >
        <div style="background-color: white; border-radius: 8px; overflow: hidden">
          <div
            style="
              background-color: #1a1a2e;
              color: white;
              padding: 10px 15px;
              font-weight: bold;
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <span>Profil Saya</span>
          </div>
          
          <div style="padding: 20px; text-align: center">
            <div
              style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: #1a1a2e;
                margin: 0 auto 10px;
              "
            ></div>
            
            <!-- Nama User Dinamis -->
            <strong>
              <h4 style="margin: 0 0 5px 0">
                {{ loading ? 'Memuat profil...' : (user?.nama || 'Pengguna') }}
              </h4>
            </strong>
            
            <!-- Username Dinamis (NIM/NIP) -->
            <h6 style="margin: 0 0 5px 0">{{ user?.username || '-' }}</h6>
            <h6 style="margin: 0 0 10px 0">Universitas Diponegoro</h6>
            
            <span
              style="
                background-color: #198754;
                color: white;
                padding: 3px 8px;
                border-radius: 4px;
                font-size: 12px;
              "
            >Aktif Mengajar</span>

            <!-- Bagian Statistik (Masih Statis) -->
            <div style="display: flex; justify-content: space-between; margin-top: 20px;">
              <div style="text-align: center; flex: 1">
                <h6 style="margin: 0">Sinta Score</h6>
                <span style="margin: 0">1489</span>
              </div>
              <div
                style="
                  text-align: center;
                  border-left: 1px solid #ccc;
                  border-right: 1px solid #ccc;
                  flex: 1;
                "
              >
                <h6 style="margin: 0">Pendidikan</h6>
                <span style="margin: 0">S2</span>
              </div>
              <div style="text-align: center; flex: 1">
                <h6 style="margin: 0">Jabatan</h6>
                <span style="margin: 0">Lektor</span>
              </div>
            </div>

            <!-- Role Akses Dinamis -->
            <div
              style="
                margin-top: 15px;
                display: inline-block;
                background-color: #e0f2fe;
                color: #0369a1;
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 11px;
                font-weight: bold;
              "
            >
              Akses: {{ displayRoleName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { gql } from "@apollo/client/core";
import { useQuery } from "@vue/apollo-composable";

const route = useRoute();
const router = useRouter();

// 1. Definisikan Query untuk memanggil profil
const GET_ME = gql`
  query Me {
    me {
      id_user
      username
      nama
      roles
    }
  }
`;

// 2. Eksekusi Query
const { result, loading, error } = useQuery(GET_ME);

// 3. Tangkap dan format data user
const user = computed(() => result.value?.me || null);

// Menentukan role utama berdasarkan database
const role = computed(() => {
  if (user.value && user.value.roles && user.value.roles.length > 0) {
    return user.value.roles[0].toUpperCase(); 
  }
  return "";
});

const showOperatorPopup = ref(false);
const isDashboard = computed(() => route.path === "/dashboard");

// Cek apakah role mengandung kata "OPERATOR"
const isOperator = computed(() => role.value.includes("OPERATOR"));

// Menghilangkan underscore agar rapi di UI (contoh: OPERATOR_FAKULTAS -> OPERATOR FAKULTAS)
const displayRoleName = computed(() => role.value ? role.value.replace("_", " ") : "");

// 4. Fungsi Logout
const handleLogout = () => {
  localStorage.removeItem("sip3mu_token");
  router.push("/");
};

// Fungsi Popup Operator (Dibiarkan untuk kebutuhan multi-role di masa depan)
const handleRoleChange = (e) => {
  const selectedRole = e.target.value;
  if (selectedRole === "OPERATOR") {
    showOperatorPopup.value = true;
  }
};

const handlePilihOperator = (tipeOperator) => {
  showOperatorPopup.value = false;
};
</script>

<style scoped>
.nav-link {
  color: white;
  text-decoration: none;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link.router-link-exact-active,
.nav-link.router-link-active {
  font-weight: bold;
  text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.5);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.btn-primary-full {
  background-color: #1a1a2e;
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
}
.btn-outline {
  background-color: transparent;
  color: #1a1a2e;
  border: 1px solid #1a1a2e;
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}
</style>