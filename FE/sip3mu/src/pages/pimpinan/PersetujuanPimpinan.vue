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
          Pengesahan Pimpinan
        </h2>
        <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px">
          Halaman penandatanganan dan pengesahan SK Penelitian / Pengabdian.
        </p>
      </div>
    </div>

    <!-- Kartu Dokumen SK -->
    <div
      style="
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 25px;
        background-color: #f8fafc;
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
    >
      <div>
        <h3 style="margin: 0 0 10px 0; color: #1a1a2e; font-size: 18px">
          SK Pendanaan Penelitian Dasar Tahun 2026
        </h3>
        <p style="margin: 0; color: #64748b; font-size: 14px">
          Total Usulan Didanai: <strong>45 Judul</strong> | Total Dana:
          <strong>Rp 1.250.000.000</strong>
        </p>
      </div>
      <div style="display: flex; gap: 10px">
        <button
          style="
            background: white;
            border: 1px solid #00006b;
            color: #00006b;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
          "
        >
          Lihat Draft SK
        </button>
        <button
          style="
            background: #10b981;
            border: none;
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
          "
        >
          Sahkan & TTD Digital
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>
