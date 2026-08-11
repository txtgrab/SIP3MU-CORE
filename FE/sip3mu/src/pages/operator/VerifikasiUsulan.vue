<template>
  <div
    style="
      background-color: white;
      padding: 20px;
      font-family: sans-serif;
      width: 100%;
      box-sizing: border-box;
    "
  >
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e2e8f0;
        padding-bottom: 15px;
        margin-bottom: 25px;
      "
    >
      <div>
        <h2
          style="margin: 0; color: #1a1a2e; font-size: 28px; font-weight: bold"
        >
          Verifikasi Administrasi Usulan
        </h2>
        <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px">
          Daftar usulan penelitian dan pengabdian yang menunggu verifikasi
          berkas.
        </p>
      </div>
    </div>

    <!-- Menu Tabs Status Verifikasi -->
    <div
      style="
        display: flex;
        border-bottom: 1px solid #e2e8f0;
        margin-bottom: 25px;
        padding-bottom: 15px;
        gap: 15px;
        overflow-x: auto;
      "
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :style="{
          padding: '8px 20px',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          backgroundColor: activeTab === tab.id ? '#00006b' : 'transparent',
          color: activeTab === tab.id ? 'white' : '#64748b',
        }"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Filter & Cari -->
    <div
      style="
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        font-size: 14px;
        color: #333;
      "
    >
      <div>
        Tampilkan
        <select
          style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px"
        >
          <option>10</option>
        </select>
        entri
      </div>
      <div style="display: flex; gap: 10px">
        <select
          style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px"
        >
          <option>Semua Skema</option>
          <option>Skema Fakultas</option>
          <option>Skema LPPM</option>
        </select>
        <input
          type="text"
          style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px"
          placeholder="Cari judul/ketua..."
        />
      </div>
    </div>

    <!-- Tabel Verifikasi -->
    <div
      style="overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 8px"
    >
      <table
        style="
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
          text-align: left;
        "
      >
        <thead>
          <tr style="background-color: #00006b; color: white">
            <th style="padding: 12px; text-align: center; width: 50px">No</th>
            <th style="padding: 12px">Ketua Pengusul</th>
            <th style="padding: 12px">Judul Usulan</th>
            <th style="padding: 12px">Skema & Kategori</th>
            <th style="padding: 12px; text-align: center">
              Status Administrasi
            </th>
            <th style="padding: 12px; text-align: center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <!-- Data 1 -->
          <tr style="border-bottom: 1px solid #e2e8f0">
            <td style="padding: 12px; text-align: center">1</td>
            <td style="padding: 12px">
              Dr. Budi Santoso, M.T.<br /><span
                style="font-size: 12px; color: #64748b"
                >NIDN: 0012345678</span
              >
            </td>
            <td style="padding: 12px; font-weight: bold; color: #1a1a2e">
              Pengembangan Algoritma Deteksi Dini Penyakit Tanaman
            </td>
            <td style="padding: 12px">
              Penelitian Dasar<br /><span
                style="font-size: 12px; color: #00006b; font-weight: bold"
                >(Tingkat LPPM)</span
              >
            </td>
            <td style="padding: 12px; text-align: center">
              <span
                v-if="activeTab === 'menunggu'"
                style="
                  background-color: #fef3c7;
                  color: #92400e;
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-size: 12px;
                  font-weight: bold;
                "
                >Menunggu Verifikasi</span
              >
              <span
                v-else
                style="
                  background-color: #d1fae5;
                  color: #065f46;
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-size: 12px;
                  font-weight: bold;
                "
                >Lolos Administrasi</span
              >
            </td>
            <td style="padding: 12px; text-align: center">
              <button
                style="
                  background: #00006b;
                  border: none;
                  color: white;
                  padding: 6px 12px;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 12px;
                  font-weight: bold;
                "
              >
                Cek Berkas
              </button>
            </td>
          </tr>
          <!-- Data 2 -->
          <tr style="border-bottom: 1px solid #e2e8f0">
            <td style="padding: 12px; text-align: center">2</td>
            <td style="padding: 12px">
              Dr. Rina Wati, M.Si.<br /><span
                style="font-size: 12px; color: #64748b"
                >NIDN: 0098765432</span
              >
            </td>
            <td style="padding: 12px; font-weight: bold; color: #1a1a2e">
              Pemberdayaan Desa Binaan Melalui Produk Daur Ulang
            </td>
            <td style="padding: 12px">
              Pengabdian Masyarakat<br /><span
                style="font-size: 12px; color: #10b981; font-weight: bold"
                >(Tingkat Fakultas)</span
              >
            </td>
            <td style="padding: 12px; text-align: center">
              <span
                v-if="activeTab === 'menunggu'"
                style="
                  background-color: #fef3c7;
                  color: #92400e;
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-size: 12px;
                  font-weight: bold;
                "
                >Menunggu Verifikasi</span
              >
              <span
                v-else
                style="
                  background-color: #fee2e2;
                  color: #b91c1c;
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-size: 12px;
                  font-weight: bold;
                "
                >Dikembalikan (Revisi)</span
              >
            </td>
            <td style="padding: 12px; text-align: center">
              <button
                style="
                  background: #00006b;
                  border: none;
                  color: white;
                  padding: 6px 12px;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 12px;
                  font-weight: bold;
                "
              >
                Cek Berkas
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeTab = ref("menunggu");

const tabs = [
  { id: "menunggu", label: "Menunggu Verifikasi" },
  { id: "selesai", label: "Selesai Diproses" },
];
</script>
