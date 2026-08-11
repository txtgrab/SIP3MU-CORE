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
          Penetapan Universitas (LPPM)
        </h2>
        <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px">
          Penetapan akhir usulan penelitian & pengabdian tingkat Universitas.
        </p>
      </div>
    </div>

    <!-- Tabel Verifikasi Universitas -->
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
            <th style="padding: 12px; text-align: center">Skema</th>
            <th style="padding: 12px; text-align: center">Status Akhir</th>
            <th style="padding: 12px; text-align: center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e2e8f0">
            <td style="padding: 12px; text-align: center">1</td>
            <td style="padding: 12px">Dr. Budi Santoso, M.T.</td>
            <td style="padding: 12px; font-weight: bold; color: #1a1a2e">
              Pengembangan Algoritma Deteksi Dini Penyakit Tanaman
            </td>
            <td style="padding: 12px; text-align: center">Penelitian Dasar</td>
            <td style="padding: 12px; text-align: center">
              <span
                style="
                  background-color: #fef3c7;
                  color: #92400e;
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-size: 12px;
                  font-weight: bold;
                "
                >Menunggu Penetapan</span
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
                Tetapkan Didanai
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup></script>
