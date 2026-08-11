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
    <h2
      style="
        margin-top: 0;
        margin-bottom: 20px;
        color: #1a1a2e;
        font-size: 28px;
        font-weight: bold;
      "
    >
      Penelitian
    </h2>

    <div
      style="
        display: flex;
        border-bottom: 1px solid #e2e8f0;
        margin-bottom: 30px;
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

    <div v-if="activeTab === 'usulan'">
      <div v-if="view === 'list'">
        <h3
          style="
            font-size: 20px;
            margin-top: 0;
            margin-bottom: 20px;
            color: #1a1a2e;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 15px;
            font-weight: bold;
          "
        >
          Usulan Penelitian
        </h3>

        <button
          @click="view = 'skema'"
          style="
            background-color: #00006b;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 25px;
          "
        >
          + Ajukan Usulan
        </button>

        <div
          style="
            padding: 25px;
            background-color: #f8fafc;
            border-radius: 8px;
            border: 1px dashed #cbd5e1;
            overflow-x: auto;
          "
        >
          <table
            border="1"
            style="
              width: 100%;
              border-collapse: collapse;
              border-color: #cbd5e1;
              font-size: 14px;
              background-color: white;
            "
          >
            <thead>
              <tr
                style="
                  background-color: #00006b;
                  color: white;
                  text-align: center;
                "
              >
                <th style="padding: 12px">No</th>
                <th style="padding: 12px">Ketua</th>
                <th style="padding: 12px">Judul</th>
                <th style="padding: 12px">Skema</th>
                <th style="padding: 12px">Bidang Fokus</th>
                <th style="padding: 12px">Tahun Pelaksanaan</th>
                <th style="padding: 12px">Peran</th>
                <th style="padding: 12px">Status Usulan</th>
                <th style="padding: 12px">Komentar LPPM</th>
                <th style="padding: 12px">Komentar Reviewer</th>
                <th style="padding: 12px">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 12px; text-align: center">1</td>
                <td style="padding: 12px">
                  Kurniawan Teguh Martono<br />(0019038304)
                </td>
                <td style="padding: 12px">
                  Pengembangan Terapi Robotik Menggunakan Virtual Reality untuk
                  Kombinasi Latihan Motorik dan Kognitif bagi Warga Lanjut Usia
                </td>
                <td style="padding: 12px">
                  Penelitian Terapan - Luaran Prototipe
                </td>
                <td style="padding: 12px; text-align: center">Kesehatan</td>
                <td style="padding: 12px; text-align: center">2026</td>
                <td style="padding: 12px; text-align: center">Anggota</td>
                <td style="padding: 12px; text-align: center">Tidak Didanai</td>
                <td style="padding: 12px; text-align: center">
                  <button
                    style="
                      padding: 4px 8px;
                      background: #f1f5f9;
                      border: 1px solid #94a3b8;
                      border-radius: 2px;
                      cursor: pointer;
                      font-size: 12px;
                    "
                  >
                    Komentar
                  </button>
                </td>
                <td style="padding: 12px; text-align: center">
                  <button
                    style="
                      padding: 4px 8px;
                      background: #f1f5f9;
                      border: 1px solid #94a3b8;
                      border-radius: 2px;
                      cursor: pointer;
                      font-size: 12px;
                    "
                  >
                    Komentar
                  </button>
                </td>
                <td style="padding: 12px; text-align: center">
                  <button
                    style="
                      padding: 4px 8px;
                      background: #f1f5f9;
                      border: 1px solid #94a3b8;
                      border-radius: 2px;
                      cursor: pointer;
                      font-size: 12px;
                    "
                  >
                    Lihat<br />Proposal
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        v-else-if="view === 'skema'"
        style="
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background-color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        "
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
          "
        >
          <h3
            style="
              margin: 0;
              font-size: 18px;
              color: #1a1a2e;
              font-weight: bold;
            "
          >
            Skema Penelitian (LPPM)
          </h3>
          <button
            @click="view = 'list'"
            style="
              background: none;
              border: none;
              font-size: 20px;
              cursor: pointer;
              color: #1a1a2e;
            "
          >
            ✖
          </button>
        </div>
        <p
          style="
            color: #94a3b8;
            font-size: 13px;
            margin-top: 0;
            margin-bottom: 20px;
          "
        >
          Data skema penelitian
        </p>

        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
          "
        >
          <div
            v-for="(skema, i) in skemaLPPM"
            :key="'lppm' + i"
            style="
              border: 1px solid #cbd5e1;
              border-radius: 12px;
              padding: 20px;
              background-color: #f8fafc;
            "
          >
            <h4 style="margin: 0 0 15px 0; font-size: 16px">
              {{ skema.nama }}
            </h4>
            <div
              style="
                font-size: 12px;
                color: #475569;
                line-height: 1.8;
                margin-bottom: 20px;
              "
            >
              <div>Kategori : {{ skema.kategori }}</div>
              <div>Dana Maksimal : {{ skema.dana }}</div>
              <div>Durasi : {{ skema.durasi }}</div>
            </div>
            <button
              @click="view = 'form'"
              style="
                background-color: #1a1a2e;
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 20px;
                font-size: 12px;
                cursor: pointer;
                font-weight: bold;
              "
            >
              Pilih Skema
            </button>
          </div>
        </div>

        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
          "
        >
          <h3
            style="
              margin: 0;
              font-size: 18px;
              color: #1a1a2e;
              font-weight: bold;
            "
          >
            Skema Penelitian (Fakultas)
          </h3>
          <button
            @click="view = 'list'"
            style="
              background: none;
              border: none;
              font-size: 20px;
              cursor: pointer;
              color: #1a1a2e;
            "
          >
            ✖
          </button>
        </div>
        <p
          style="
            color: #94a3b8;
            font-size: 13px;
            margin-top: 0;
            margin-bottom: 20px;
          "
        >
          Data skema penelitian
        </p>

        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
          "
        >
          <div
            v-for="(skema, i) in skemaFakultas"
            :key="'fak' + i"
            style="
              border: 1px solid #cbd5e1;
              border-radius: 12px;
              padding: 20px;
              background-color: #f8fafc;
            "
          >
            <h4 style="margin: 0 0 15px 0; font-size: 16px">
              {{ skema.nama }}
            </h4>
            <div
              style="
                font-size: 12px;
                color: #475569;
                line-height: 1.8;
                margin-bottom: 20px;
              "
            >
              <div>Kategori : {{ skema.kategori }}</div>
              <div>Dana Maksimal : {{ skema.dana }}</div>
              <div>Durasi : {{ skema.durasi }}</div>
            </div>
            <button
              @click="view = 'form'"
              style="
                background-color: #1a1a2e;
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 20px;
                font-size: 12px;
                cursor: pointer;
                font-weight: bold;
              "
            >
              Pilih Skema
            </button>
          </div>
        </div>
      </div>

      <div
        v-else-if="view === 'form'"
        style="
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background-color: white;
        "
      >
        <button
          @click="view = 'skema'"
          style="
            margin-bottom: 20px;
            padding: 8px 15px;
            background: transparent;
            border: 1px solid #1a1a2e;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
          "
        >
          ← Kembali ke Pilihan Skema
        </button>
        <h3 style="font-size: 18px; margin-top: 0; margin-bottom: 15px">
          Form Pengajuan Usulan
        </h3>
        <p style="color: #64748b">
          Silakan lengkapi formulir usulan penelitian Anda di sini.
        </p>
        <button
          @click="view = 'list'"
          style="
            background-color: #00006b;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
          "
        >
          Kirim (Simulasi Selesai)
        </button>
      </div>
    </div>

    <div v-else>
      <h3
        style="
          font-size: 20px;
          margin-top: 0;
          margin-bottom: 20px;
          color: #1a1a2e;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 15px;
          font-weight: bold;
        "
      >
        {{ tabs.find((t) => t.id === activeTab)?.label }}
      </h3>

      <div
        style="
          padding: 25px;
          background-color: #f8fafc;
          border-radius: 8px;
          border: 1px dashed #cbd5e1;
          overflow-x: auto;
        "
      >
        <table
          border="1"
          style="
            width: 100%;
            border-collapse: collapse;
            border-color: #cbd5e1;
            font-size: 14px;
            background-color: white;
          "
        >
          <thead>
            <tr
              style="
                background-color: #00006b;
                color: white;
                text-align: center;
              "
            >
              <th style="padding: 12px">No</th>
              <th style="padding: 12px">Ketua</th>
              <th style="padding: 12px">Judul</th>
              <th style="padding: 12px">Skema</th>
              <th style="padding: 12px">Tahun Pelaksanaan</th>
              <th style="padding: 12px">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px; text-align: center">1</td>
              <td style="padding: 12px">
                Kurniawan Teguh Martono<br />(0019038304)
              </td>
              <td style="padding: 12px">
                Pengembangan Terapi Robotik Menggunakan Virtual Reality untuk
                Kombinasi Latihan Motorik dan Kognitif bagi Warga Lanjut Usia
              </td>
              <td style="padding: 12px">
                Penelitian Terapan - Luaran Prototipe
              </td>
              <td style="padding: 12px; text-align: center">2026</td>
              <td style="padding: 12px; text-align: center">
                <button
                  style="
                    padding: 6px 10px;
                    background: #f1f5f9;
                    border: 1px solid #94a3b8;
                    border-radius: 2px;
                    cursor: pointer;
                    font-size: 12px;
                  "
                >
                  Input<br />{{ tabs.find((t) => t.id === activeTab)?.label }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Mengontrol tab yang aktif saat ini
const activeTab = ref("usulan");

// Mengontrol layar di dalam tab usulan: 'list' (tabel utama), 'skema' (modal/layar pilihan), atau 'form'
const view = ref("list");

// Data Daftar Tabs Menu
const tabs = [
  { id: "usulan", label: "Usulan" },
  { id: "dokumen", label: "Kelengkapan Dokumen" },
  { id: "rekap", label: "Rekap Pengeluaran" },
  { id: "catatan", label: "Catatan Harian" },
  { id: "kemajuan", label: "Laporan Kemajuan" },
  { id: "akhir", label: "Laporan Akhir" },
  { id: "luaran", label: "Capaian Luaran" },
];

// Data Dummy Pilihan Skema LPPM
const skemaLPPM = [
  {
    nama: "Penelitian Dasar",
    kategori: "Universitas",
    dana: "Rp15.000.000,00",
    durasi: "1 Tahun",
  },
  {
    nama: "Penelitian Terapan",
    kategori: "Universitas",
    dana: "Rp10.000.000,00",
    durasi: "1 Tahun",
  },
  {
    nama: "Penelitian Pengembangan",
    kategori: "Universitas",
    dana: "Rp 20.000.000,00",
    durasi: "1 Tahun",
  },
];

// Data Dummy Pilihan Skema Fakultas
const skemaFakultas = [
  {
    nama: "Penelitian Dasar",
    kategori: "Fakultas",
    dana: "Rp15.000.000,00",
    durasi: "1 Tahun",
  },
  {
    nama: "Penelitian Terapan",
    kategori: "Fakultas",
    dana: "Rp10.000.000,00",
    durasi: "1 Tahun",
  },
  {
    nama: "Penelitian Pengembangan",
    kategori: "Fakultas",
    dana: "Rp 20.000.000,00",
    durasi: "1 Tahun",
  },
];
</script>
