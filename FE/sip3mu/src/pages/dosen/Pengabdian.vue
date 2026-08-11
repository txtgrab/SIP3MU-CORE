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
    <!-- Judul Halaman -->
    <h2
      style="
        margin-top: 0;
        margin-bottom: 20px;
        color: #1a1a2e;
        font-size: 28px;
        font-weight: bold;
      "
    >
      Pengabdian Masyarakat
    </h2>

    <!-- Menu Tabs -->
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

    <!-- ---------------------------------------------------- -->
    <!-- KONTEN 1: TAB USULAN                                 -->
    <!-- ---------------------------------------------------- -->
    <div v-if="activeTab === 'usulan'">
      <!-- VIEW 1: DAFTAR TABEL USULAN -->
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
          Usulan Pengabdian
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
          + Ajukan Usulan Pengabdian
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
                <th style="padding: 12px">Lokasi Mitra</th>
                <th style="padding: 12px">Tahun</th>
                <th style="padding: 12px">Status</th>
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
                  Penerapan Teknologi Smart Dashboard pada UMKM Batik di Kota
                  Semarang
                </td>
                <td style="padding: 12px">Pemberdayaan Kemitraan Masyarakat</td>
                <td style="padding: 12px; text-align: center">Kota Semarang</td>
                <td style="padding: 12px; text-align: center">2026</td>
                <td style="padding: 12px; text-align: center">Revisi</td>
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
                    Edit Proposal
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- VIEW 2: PILIH SKEMA -->
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
            Skema Pengabdian (LPPM)
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
          Data skema pengabdian
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
              @click="
                view = 'form';
                formStep = 1;
              "
              style="
                background-color: #00006b;
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

      <!-- VIEW 3: WIZARD FORM PENGAJUAN USULAN -->
      <div v-else-if="view === 'form'" style="background-color: white">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
          "
        >
          <h3
            style="
              margin: 0;
              font-size: 20px;
              font-weight: bold;
              color: #1a1a2e;
            "
          >
            Form Pengajuan Usulan Pengabdian
          </h3>
          <button
            @click="view = 'skema'"
            style="
              background: transparent;
              border: 1px solid #cbd5e1;
              color: #64748b;
              padding: 6px 12px;
              border-radius: 6px;
              cursor: pointer;
              font-weight: bold;
              font-size: 13px;
            "
          >
            Kembali
          </button>
        </div>

        <!-- Stepper -->
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            position: relative;
            padding: 0 40px;
          "
        >
          <div
            style="
              position: absolute;
              top: 15px;
              left: 60px;
              right: 60px;
              height: 2px;
              background-color: #e2e8f0;
              z-index: 1;
            "
          ></div>
          <div
            v-for="step in formSteps"
            :key="step.id"
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              z-index: 2;
            "
          >
            <div
              :style="{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '14px',
                backgroundColor: formStep >= step.id ? '#00006b' : '#e2e8f0',
                color: formStep >= step.id ? 'white' : '#64748b',
                marginBottom: '8px',
              }"
            >
              {{ step.id }}
            </div>
            <span style="font-size: 12px; font-weight: bold; color: #1a1a2e">{{
              step.label
            }}</span>
          </div>
        </div>

        <!-- Formulir Identitas (Step 1) -->
        <div
          v-if="formStep === 1"
          style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px"
        >
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px">
            <div style="display: flex; flex-direction: column; gap: 8px">
              <label style="font-size: 13px; font-weight: bold">Kategori</label>
              <select
                style="
                  padding: 10px;
                  border: 1px solid #cbd5e1;
                  border-radius: 6px;
                "
              >
                <option>Kemitraan Masyarakat</option>
              </select>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px">
              <label style="font-size: 13px; font-weight: bold">Skema</label>
              <select
                style="
                  padding: 10px;
                  border: 1px solid #cbd5e1;
                  border-radius: 6px;
                "
              >
                <option>Pemberdayaan Kemitraan Masyarakat</option>
              </select>
            </div>
            <div
              style="
                display: flex;
                flex-direction: column;
                gap: 8px;
                grid-column: span 2;
              "
            >
              <label style="font-size: 13px; font-weight: bold"
                >Judul Usulan Pengabdian</label
              >
              <textarea
                style="
                  padding: 10px;
                  border: 1px solid #cbd5e1;
                  border-radius: 6px;
                "
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Placeholder untuk Step 2-5 -->
        <div
          v-else
          style="
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 40px;
            text-align: center;
            color: #64748b;
          "
        >
          <h3>Upload Dokumen & Konfirmasi</h3>
          <p>Lengkapi dokumen usulan pada tahap ini.</p>
        </div>

        <!-- Tombol Navigasi -->
        <div
          style="
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 25px;
          "
        >
          <button
            v-if="formStep > 1"
            @click="formStep--"
            style="
              padding: 10px 20px;
              border: 1px solid #00006b;
              background: white;
              color: #00006b;
              border-radius: 6px;
              cursor: pointer;
              font-weight: bold;
            "
          >
            Sebelumnya
          </button>
          <button
            v-if="formStep < 5"
            @click="formStep++"
            style="
              padding: 10px 20px;
              border: none;
              background: #00006b;
              color: white;
              border-radius: 6px;
              cursor: pointer;
              font-weight: bold;
            "
          >
            Selanjutnya
          </button>
          <button
            v-if="formStep === 5"
            @click="view = 'list'"
            style="
              padding: 10px 20px;
              border: none;
              background: #10b981;
              color: white;
              border-radius: 6px;
              cursor: pointer;
              font-weight: bold;
            "
          >
            Kirim Usulan
          </button>
        </div>
      </div>
    </div>

    <!-- ---------------------------------------------------- -->
    <!-- KONTEN 2: TAB LAINNYA (Dinamis dengan tombol aksi)   -->
    <!-- ---------------------------------------------------- -->
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
                Penerapan Teknologi Smart Dashboard pada UMKM...
              </td>
              <td style="padding: 12px">Pemberdayaan Kemitraan Masyarakat</td>
              <td style="padding: 12px; text-align: center">2026</td>
              <td style="padding: 12px; text-align: center">
                <button
                  style="
                    padding: 6px 10px;
                    background: #00006b;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: bold;
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

const activeTab = ref("usulan");
const view = ref("list");
const formStep = ref(1);

const tabs = [
  { id: "usulan", label: "Usulan" },
  { id: "dokumen", label: "Kelengkapan Dokumen" },
  { id: "rekap", label: "Rekap Pengeluaran" },
  { id: "catatan", label: "Catatan Harian" },
  { id: "kemajuan", label: "Laporan Kemajuan" },
  { id: "akhir", label: "Laporan Akhir" },
  { id: "luaran", label: "Capaian Luaran" },
];

const formSteps = [
  { id: 1, label: "Identitas" },
  { id: 2, label: "Substansi" },
  { id: 3, label: "RAB" },
  { id: 4, label: "Mitra" },
  { id: 5, label: "Kirim Usulan" },
];

const skemaLPPM = [
  {
    nama: "Pemberdayaan Kemitraan Masyarakat",
    kategori: "Universitas",
    dana: "Rp 20.000.000,00",
    durasi: "1 Tahun",
  },
  {
    nama: "Pemberdayaan Desa Binaan",
    kategori: "Universitas",
    dana: "Rp 30.000.000,00",
    durasi: "1 Tahun",
  },
];
</script>
