export const usulanTypeDefs = `#graphql
  type Usulan {
    id_usulan: Int!
    judul: String!
    status_usulan: String!
    nidn: String!
    jenis_kegiatan: String!
    tingkat: String!
    id_skema: Int
  }

  type UsulanValidasi {
    id_validasi: Int!
    tahap: String!
    status: String!
    catatan: String
    nama_validator: String!
    tgl_validasi: String
  }

  type UsulanLog {
    id_log: Int!
    status_lama: String
    status_baru: String!
    catatan: String
    nama_pelaku: String!
    created_at: String
  }

  type RiwayatUsulan {
    usulan: Usulan!
    validasi: [UsulanValidasi]
    log: [UsulanLog]
  }

  type AnggotaDosen {
    id_anggota: Int!
    id_usulan: Int!
    nidn: String!
    persetujuan: Int!
    tgl_persetujuan: String
  }

  type AnggotaMahasiswa {
    id_mahasiswa: Int!
    id_usulan: Int!
    nim: String!
    namamahasiswa: String!
    id_prodi: Int
  }

  # ==========================================
  # BARU: Tipe Data Dokumen & Biaya (RAB)
  # ==========================================
  type UsulanLampiran {
    id_lampiran: Int!
    id_usulan: Int!
    tipe: String!
    nama_file: String!
    path_file: String!
    ukuran_file: Int!
    mime_type: String
    diunggah_oleh: Int!
    created_at: String
  }

  type UsulanBiaya {
    id_biaya: Int!
    id_usulan: Int!
    biaya_usulan_th1: Float!
    biaya_usulan_th2: Float
    biaya_usulan_th3: Float
    biaya_mitra: Float!
    biaya_instansilain: Float!
    kontribusi_mitra: Float
    kontribusi_mitra_ket: String
    instansilain: String
    kontribusi_lain: Float
    keterangan_lain: String
  }

  input InputUsulan {
    judul: String!
    id_skema: Int!
    jenis_kegiatan: String!
    tingkat: String!
  }

  input InputValidasi {
    id_usulan: Int!
    tahap: String!
    status: String!
    catatan: String
  }

  input InputAnggotaDosen {
    id_usulan: Int!
    nidn: String!
  }

  input InputAnggotaMahasiswa {
    id_usulan: Int!
    nim: String!
    namamahasiswa: String!
    id_prodi: Int
  }

  # BARU: Input untuk Dokumen & Biaya
  input InputUsulanLampiran {
    id_usulan: Int!
    tipe: String!
    nama_file: String!
    path_file: String!
    ukuran_file: Int!
    mime_type: String
  }

  input InputUsulanBiaya {
    id_usulan: Int!
    biaya_usulan_th1: Float!
    biaya_usulan_th2: Float
    biaya_usulan_th3: Float
    biaya_mitra: Float
    biaya_instansilain: Float
    kontribusi_mitra: Float
    kontribusi_mitra_ket: String
    instansilain: String
    kontribusi_lain: Float
    keterangan_lain: String
  }

  type Query {
    getRiwayatUsulan(id_usulan: Int!): RiwayatUsulan
    getDaftarUsulan: [Usulan]
    
    # BARU: Query untuk mengambil Dokumen & RAB
    getLampiranUsulan(id_usulan: Int!): [UsulanLampiran]
    getBiayaUsulan(id_usulan: Int!): UsulanBiaya
  }

  type Mutation {
    buatDraftUsulan(input: InputUsulan!): Usulan
    validasiUsulan(input: InputValidasi!): Usulan
    
    tambahAnggotaDosen(input: InputAnggotaDosen!): AnggotaDosen
    hapusAnggotaDosen(id_anggota: Int!): String
    tambahAnggotaMahasiswa(input: InputAnggotaMahasiswa!): AnggotaMahasiswa
    hapusAnggotaMahasiswa(id_mahasiswa: Int!): String

    # BARU: Mutasi untuk Dokumen & RAB
    unggahLampiranUsulan(input: InputUsulanLampiran!): UsulanLampiran
    hapusLampiranUsulan(id_lampiran: Int!): String
    simpanBiayaUsulan(input: InputUsulanBiaya!): UsulanBiaya
  }
`;