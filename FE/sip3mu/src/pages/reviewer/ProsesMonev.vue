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
      <h2 style="margin: 0; color: #1a1a2e; font-size: 28px; font-weight: bold">
        Monitoring & Evaluasi (Monev)
      </h2>
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
      <div>
        Cari:
        <input
          type="text"
          style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px"
          placeholder="Cari data monev..."
        />
      </div>
    </div>

    <!-- Tabel Monev -->
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
            <th style="padding: 12px">Ketua Peneliti</th>
            <th style="padding: 12px">Judul Kegiatan</th>
            <th style="padding: 12px">Laporan Kemajuan</th>
            <th style="padding: 12px; text-align: center">Target Luaran</th>
            <th style="padding: 12px; text-align: center">Status Monev</th>
            <th style="padding: 12px; text-align: center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e2e8f0">
            <td style="padding: 12px; text-align: center">1</td>
            <td style="padding: 12px">Dr. Ir. Ahmad Yani, M.T.</td>
            <td style="padding: 12px; font-weight: bold; color: #1a1a2e">
              Prototipe Kendaraan Listrik Ramah Lingkungan
            </td>
            <td style="padding: 12px">
              <span style="color: #10b981; font-weight: bold">✔ Terunggah</span>
              (75%)
            </td>
            <td style="padding: 12px; text-align: center">2 / 3 Tercapai</td>
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
                >Belum Evaluasi</span
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
                Isi Form Monev
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup></script>
