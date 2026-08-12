export const usulanTypeDefs = `#graphql
  type Usulan {
    id_usulan: Int!
    judul: String!
    status_usulan: String!
    nidn: String!
    jenis_kegiatan: String!
    tingkat: String!
  }

  # Tipe data untuk riwayat validasi
  type UsulanValidasi {
    id_validasi: Int!
    tahap: String!
    status: String!
    catatan: String
    nama_validator: String!
    tgl_validasi: String
  }

  # Tipe data untuk log rekam jejak
  type UsulanLog {
    id_log: Int!
    status_lama: String
    status_baru: String!
    catatan: String
    nama_pelaku: String!
    created_at: String
  }

  # Tipe data bungkusan yang menggabungkan ketiganya
  type RiwayatUsulan {
    usulan: Usulan!
    validasi: [UsulanValidasi]
    log: [UsulanLog]
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

  # BARU: Menambahkan blok Query untuk menarik data
  type Query {
    getRiwayatUsulan(id_usulan: Int!): RiwayatUsulan
  }

  type Mutation {
    buatDraftUsulan(input: InputUsulan!): Usulan
    validasiUsulan(input: InputValidasi!): Usulan
  }
`;