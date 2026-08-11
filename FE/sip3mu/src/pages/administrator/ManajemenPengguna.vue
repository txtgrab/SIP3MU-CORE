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
          Manajemen Pengguna
        </h2>
        <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px">
          Kelola akun, hak akses (role), dan data master pengguna SIP3MU.
        </p>
      </div>
      <button
        style="
          background-color: #00006b;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
        "
      >
        + Tambah Pengguna Baru
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
      <div>
        Cari:
        <input
          type="text"
          style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px"
          placeholder="Cari nama/NIP..."
        />
      </div>
    </div>

    <!-- Tabel Manajemen Pengguna -->
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
            <th style="padding: 12px">Nama Pengguna</th>
            <th style="padding: 12px">NIP / NIDN</th>
            <th style="padding: 12px; text-align: center">Role (Hak Akses)</th>
            <th style="padding: 12px; text-align: center">Status</th>
            <th style="padding: 12px; text-align: center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e2e8f0">
            <td style="padding: 12px; text-align: center">1</td>
            <td style="padding: 12px; font-weight: bold; color: #1a1a2e">
              Kurniawan Teguh Martono
            </td>
            <td style="padding: 12px">0019038304</td>
            <td style="padding: 12px; text-align: center">
              <span
                style="
                  background-color: #e0f2fe;
                  color: #0369a1;
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-size: 12px;
                  font-weight: bold;
                "
                >Dosen / Reviewer</span
              >
            </td>
            <td style="padding: 12px; text-align: center">
              <span
                style="
                  background-color: #d1fae5;
                  color: #065f46;
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-size: 12px;
                  font-weight: bold;
                "
                >Aktif</span
              >
            </td>
            <td style="padding: 12px; text-align: center">
              <button
                style="
                  background: #f1f5f9;
                  border: 1px solid #cbd5e1;
                  padding: 6px 10px;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 12px;
                  font-weight: bold;
                  color: #00006b;
                "
              >
                Edit / Reset Pasword
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup></script>
