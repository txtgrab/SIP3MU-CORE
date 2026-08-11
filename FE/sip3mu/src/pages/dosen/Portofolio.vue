<template>
  <div class="portofolio-page">
    <div class="page-header">
      <h2 style="margin: 0; color: #1a1a2e">Portofolio Dosen</h2>
      <p style="color: #666; margin-top: 5px">
        Informasi lengkap riwayat akademik, penelitian, dan publikasi.
      </p>
    </div>

    <div class="section-card">
      <div class="section-title">1. Biodata</div>
      <div class="section-content">
        <table class="detail-table">
          <tbody>
            <tr>
              <td class="lbl">Nama Lengkap</td>
              <td class="sep">:</td>
              <td>{{ biodata.nama }}</td>
            </tr>
            <tr>
              <td class="lbl">Jenis Kelamin</td>
              <td class="sep">:</td>
              <td>{{ biodata.jenisKelamin }}</td>
            </tr>
            <tr>
              <td class="lbl">Tempat, Tgl Lahir</td>
              <td class="sep">:</td>
              <td>{{ biodata.ttl }}</td>
            </tr>
            <tr>
              <td class="lbl">Jabatan Fungsional</td>
              <td class="sep">:</td>
              <td>{{ biodata.jabatanFungsional }}</td>
            </tr>
            <tr>
              <td class="lbl">Pangkat/Golongan</td>
              <td class="sep">:</td>
              <td>{{ biodata.pangkat }}</td>
            </tr>
            <tr>
              <td class="lbl">Alamat Lengkap</td>
              <td class="sep">:</td>
              <td>{{ biodata.alamat }}</td>
            </tr>
            <tr>
              <td class="lbl">Sinta ID</td>
              <td class="sep">:</td>
              <td>{{ biodata.sintaId }}</td>
            </tr>
            <tr>
              <td class="lbl">Scopus ID</td>
              <td class="sep">:</td>
              <td>{{ biodata.scopusId }}</td>
            </tr>
            <tr>
              <td class="lbl">Nomor Telepon</td>
              <td class="sep">:</td>
              <td>{{ biodata.noTelp }}</td>
            </tr>
            <tr>
              <td class="lbl">Email</td>
              <td class="sep">:</td>
              <td>{{ biodata.email }}</td>
            </tr>
            <tr>
              <td class="lbl">NPWP</td>
              <td class="sep">:</td>
              <td>{{ biodata.npwp }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section-card">
      <div class="section-title">2. Riwayat Pendidikan</div>
      <div class="section-content">
        <table class="data-table">
          <thead>
            <tr>
              <th>Jenjang</th>
              <th>Tahun Masuk</th>
              <th>Tahun Lulus</th>
              <th>Nama Institusi Pendidikan</th>
              <th>Gelar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pendidikan" :key="index">
              <td>{{ item.jenjang }}</td>
              <td>{{ item.thnMasuk }}</td>
              <td>{{ item.thnLulus }}</td>
              <td>{{ item.institusi }}</td>
              <td>{{ item.gelar }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section-card">
      <div class="section-title">3. Riwayat Mengajar</div>
      <div class="section-content">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center">No</th>
              <th>Mata Kuliah yang Diampu</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(mk, index) in riwayatMengajar" :key="index">
              <td style="text-align: center">{{ index + 1 }}</td>
              <td>{{ mk }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section-card">
      <div class="section-title">4. Riwayat Penelitian</div>
      <div class="section-content">
        <table class="data-table">
          <thead>
            <tr>
              <th>Judul Penelitian</th>
              <th>Skema</th>
              <th>Besar Dana</th>
              <th>Tingkat</th>
              <th>Tahun</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in penelitian" :key="index">
              <td>{{ item.judul }}</td>
              <td>{{ item.skema }}</td>
              <td>{{ item.dana }}</td>
              <td>{{ item.tingkat }}</td>
              <td>{{ item.tahun }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section-card">
      <div class="section-title">5. Riwayat Publikasi</div>
      <div class="section-content">
        <table class="data-table">
          <thead>
            <tr>
              <th>Judul Publikasi</th>
              <th>Nama Jurnal / Prosiding</th>
              <th>Tahun</th>
              <th>Tautan (Link)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in publikasi" :key="index">
              <td>{{ item.judul }}</td>
              <td>{{ item.jurnal }}</td>
              <td>{{ item.tahun }}</td>
              <td>
                <a :href="item.link" target="_blank" class="link-btn">Lihat</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section-card">
      <div class="section-title">6. Riwayat Pengabdian Masyarakat</div>
      <div class="section-content">
        <table class="data-table">
          <thead>
            <tr>
              <th>Judul Pengabdian</th>
              <th>Skema</th>
              <th>Besar Dana</th>
              <th>Tingkat</th>
              <th>Tahun</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in pengabdian" :key="index">
              <td>{{ item.judul }}</td>
              <td>{{ item.skema }}</td>
              <td>{{ item.dana }}</td>
              <td>{{ item.tingkat }}</td>
              <td>{{ item.tahun }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section-card">
      <div class="section-title">7. Riwayat Menulis Buku</div>
      <div class="section-content">
        <table class="data-table">
          <thead>
            <tr>
              <th>Judul Buku</th>
              <th>Tahun</th>
              <th>Tautan (Link)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in buku" :key="index">
              <td>{{ item.judul }}</td>
              <td>{{ item.tahun }}</td>
              <td>
                <a :href="item.link" target="_blank" class="link-btn">Lihat</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section-card">
      <div class="section-title">8. Riwayat HKI / Paten</div>
      <div class="section-content">
        <table class="data-table">
          <thead>
            <tr>
              <th>Judul HKI / Paten</th>
              <th>Tahun</th>
              <th>Tautan (Link)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in hki" :key="index">
              <td>{{ item.judul }}</td>
              <td>{{ item.tahun }}</td>
              <td>
                <a :href="item.link" target="_blank" class="link-btn">Lihat</a>
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

// 1. Data Dummy Biodata
const biodata = ref({
  nama: "Kurniawan Teguh Martono, S.T., M.T.",
  jenisKelamin: "Laki-laki",
  ttl: "Semarang, 15 Agustus 1980",
  jabatanFungsional: "Lektor",
  pangkat: "Penata Tk. I / III/d",
  alamat: "Jl. Prof. Sudarto, Tembalang, Semarang",
  sintaId: "5983",
  scopusId: "5983",
  noTelp: "081234567890",
  email: "kurniawan.teguh@lecturer.undip.ac.id",
  npwp: "36.543.781.3-525.000",
});

// 2. Data Dummy Pendidikan
const pendidikan = ref([
  {
    jenjang: "S1",
    thnMasuk: "1998",
    thnLulus: "2002",
    institusi: "Universitas Diponegoro",
    gelar: "S.T.",
  },
  {
    jenjang: "S2",
    thnMasuk: "2004",
    thnLulus: "2006",
    institusi: "Institut Teknologi Bandung",
    gelar: "M.T.",
  },
]);

// 3. Data Dummy Mengajar
const riwayatMengajar = ref([
  "Sistem Digital Lanjut",
  "Arsitektur dan Organisasi Komputer",
  "Mikrokontroler dan Antarmuka",
]);

// 4. Data Dummy Penelitian
const penelitian = ref([
  {
    judul: "Pengembangan Purwarupa Sistem IoT untuk Pertanian",
    skema: "Penelitian Terapan",
    dana: "Rp 50.000.000",
    tingkat: "Nasional",
    tahun: "2023",
  },
  {
    judul: "Implementasi Algoritma Machine Learning pada Edge Device",
    skema: "Penelitian Dasar",
    dana: "Rp 30.000.000",
    tingkat: "Universitas",
    tahun: "2024",
  },
]);

// 5. Data Dummy Publikasi
const publikasi = ref([
  {
    judul: "IoT Based Smart Farming System Architecture",
    jurnal: "IEEE Access",
    tahun: "2023",
    link: "#",
  },
  {
    judul: "Edge Computing for Low Latency Applications",
    jurnal: "Journal of Computer Science",
    tahun: "2024",
    link: "#",
  },
]);

// 6. Data Dummy Pengabdian
const pengabdian = ref([
  {
    judul: "Pelatihan Robotika untuk Siswa SMA",
    skema: "Pemberdayaan Kemitraan Masyarakat",
    dana: "Rp 15.000.000",
    tingkat: "Lokal",
    tahun: "2023",
  },
]);

// 7. Data Dummy Buku
const buku = ref([
  { judul: "Buku Ajar: Pengantar Sistem Digital", tahun: "2022", link: "#" },
]);

// 8. Data Dummy HKI/Paten
const hki = ref([
  {
    judul: "Hak Cipta Modul Latih Mikrokontroler Berbasis ESP32",
    tahun: "2023",
    link: "#",
  },
]);
</script>

<style scoped>
.portofolio-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-header {
  margin-bottom: 10px;
}

.section-card {
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-title {
  background-color: #00006b; /* Biru sesuai tema navbar */
  color: #ffffff;
  padding: 12px 20px;
  font-weight: bold;
  font-size: 15px;
}

.section-content {
  padding: 20px;
  overflow-x: auto;
}

/* Styling Tabel Biodata (Key-Value) */
.detail-table {
  width: 100%;
  border-collapse: collapse;
}

.detail-table td {
  padding: 8px 0;
  font-size: 14px;
  color: #333;
}

.detail-table .lbl {
  width: 200px;
  font-weight: 600;
  color: #1a1a2e;
}

.detail-table .sep {
  width: 20px;
  text-align: center;
}

/* Styling Tabel Data Grid (Pendidikan, Penelitian, dll) */
.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.data-table th,
.data-table td {
  padding: 12px;
  border: 1px solid #e2e8f0;
  font-size: 14px;
  text-align: left;
}

.data-table th {
  background-color: #f8fafc;
  font-weight: 600;
  color: #1a1a2e;
}

.data-table tbody tr:hover {
  background-color: #f1f5f9;
}

/* Tombol Link */
.link-btn {
  background-color: #00006b;
  color: white;
  padding: 5px 12px;
  text-decoration: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  transition: background-color 0.2s;
}

.link-btn:hover {
  background-color: 00006b#;
}
</style>
