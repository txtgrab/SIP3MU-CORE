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
          Rekapitulasi Usulan
        </h2>
        <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px">
          Laporan hasil akhir penilaian proposal penelitian dan pengabdian.
        </p>
      </div>
      <button
        style="
          background-color: #10b981;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
        "
      >
        📥 Download Laporan (Excel)
      </button>
    </div>

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
            <th style="padding: 12px; text-align: center">Nilai Rata-rata</th>
            <th style="padding: 12px; text-align: center">Status Akhir</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e2e8f0">
            <td style="padding: 12px; text-align: center">1</td>
            <td style="padding: 12px">Siti Aminah, Ph.D.</td>
            <td style="padding: 12px; font-weight: bold; color: #1a1a2e">
              Sistem Cerdas Pemantauan Kualitas Air Berbasis IoT
            </td>
            <td
              style="
                padding: 12px;
                text-align: center;
                font-weight: bold;
                font-size: 16px;
              "
            >
              88.5
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
                >Didanai</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup></script>
