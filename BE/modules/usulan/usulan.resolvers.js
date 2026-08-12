export const usulanResolvers = {
  Query: {
    getDaftarUsulan: async (_, __, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak! Silakan login.');

      const daftarUsulan = await context.prisma.tb_usulan.findMany({
        where: {
          nidn: context.currentUser.username
        },
        orderBy: {
          id_usulan: 'desc'
        }
      });

      return daftarUsulan;
    },

    getRiwayatUsulan: async (_, { id_usulan }, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak! Silakan login.');

      const usulan = await context.prisma.tb_usulan.findUnique({
        where: { id_usulan: id_usulan }
      });
      if (!usulan) throw new Error('Usulan tidak ditemukan!');

      const validasiRaw = await context.prisma.tb_usulan_validasi.findMany({
        where: { id_usulan: id_usulan },
        orderBy: { tgl_validasi: 'desc' }
      });

      const logRaw = await context.prisma.tb_usulan_log.findMany({
        where: { id_usulan: id_usulan },
        orderBy: { created_at: 'desc' }
      });

      const validasi = validasiRaw.map(v => ({
        ...v,
        tgl_validasi: v.tgl_validasi ? v.tgl_validasi.toISOString() : null
      }));

      const log = logRaw.map(l => ({
        ...l,
        created_at: l.created_at ? l.created_at.toISOString() : null
      }));

      return {
        usulan,
        validasi,
        log
      };
    },

    // ==========================================
    // BARU: Query Dokumen & Biaya
    // ==========================================
    getLampiranUsulan: async (_, { id_usulan }, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak! Silakan login.');
      
      const lampiranRaw = await context.prisma.tb_usulan_lampiran.findMany({
        where: { id_usulan: id_usulan },
        orderBy: { created_at: 'desc' }
      });

      return lampiranRaw.map(l => ({
        ...l,
        created_at: l.created_at ? l.created_at.toISOString() : null
      }));
    },

    getBiayaUsulan: async (_, { id_usulan }, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak! Silakan login.');
      
      return await context.prisma.tb_usulan_biaya.findFirst({
        where: { id_usulan: id_usulan }
      });
    }
  },

  Mutation: {
    buatDraftUsulan: async (_, { input }, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak! Silakan login.');
      const allowedRoles = ['Dosen', 'Administrator'];
      const hasPermission = context.currentUser.roles.some(r => allowedRoles.includes(r));
      if (!hasPermission) throw new Error('Hanya Dosen yang dapat membuat usulan.');

      const skema = await context.prisma.tb_skema.findUnique({ where: { id_skema: input.id_skema } });
      if (!skema) throw new Error('Skema tidak ditemukan!');

      const timeline = await context.prisma.tb_timeline.findFirst({ where: { id_skema: input.id_skema, status: 'aktif' } });
      if (!timeline) throw new Error('Timeline pendaftaran untuk skema ini belum dibuka!');

      const usulanBaru = await context.prisma.tb_usulan.create({
        data: {
          judul: input.judul,
          jenis_kegiatan: input.jenis_kegiatan,
          tingkat: input.tingkat,
          th_usulan: new Date().getFullYear(),
          th_pelaksanaan: new Date().getFullYear() + 1,
          luaran: 'TBD',
          unit_pengusul: 'Fakultas Teknik',
          status_usulan: 'draft',
          id_skema: skema.id_skema,
          id_sumberdana: skema.id_sumberdana,
          id_timeline: timeline.id_timeline,
          id_institusi: context.currentUser.id_institusi,
          nidn: context.currentUser.username
        },
      });
      return usulanBaru;
    },

    validasiUsulan: async (_, { input }, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak! Silakan login.');
      const allowedRoles = ['Operator Prodi', 'Operator Fakultas', 'Operator LPPM', 'Administrator'];
      const hasPermission = context.currentUser.roles.some(r => allowedRoles.includes(r));
      if (!hasPermission) throw new Error('Akses ditolak! Anda bukan Operator.');

      return await context.prisma.$transaction(async (tx) => {
        const usulanLama = await tx.tb_usulan.findUnique({ where: { id_usulan: input.id_usulan } });
        if (!usulanLama) throw new Error('Data usulan tidak ditemukan!');

        await tx.tb_usulan_validasi.create({
          data: {
            id_usulan: input.id_usulan,
            tahap: input.tahap,
            status: input.status,
            catatan: input.catatan || '',
            divalidasi_oleh: context.currentUser.id_user,
            nama_validator: context.currentUser.nama || context.currentUser.username,
            tgl_validasi: new Date()
          }
        });

        let statusBaru = usulanLama.status_usulan;
        if (input.status === 'ditolak') statusBaru = 'dibatalkan';
        else if (input.status === 'revisi') statusBaru = 'revisi';
        else if (input.status === 'disetujui') {
          if (input.tahap === 'prodi') statusBaru = 'validasi_fak';
          if (input.tahap === 'fakultas') statusBaru = 'on_desk';
          if (input.tahap === 'lppm') statusBaru = 'on_desk';
        }

        const usulanBaru = await tx.tb_usulan.update({
          where: { id_usulan: input.id_usulan },
          data: { status_usulan: statusBaru }
        });

        await tx.tb_usulan_log.create({
          data: {
            id_usulan: input.id_usulan,
            status_lama: usulanLama.status_usulan,
            status_baru: statusBaru,
            catatan: input.catatan || `Divalidasi pada tahap ${input.tahap}`,
            dilakukan_oleh: context.currentUser.id_user,
            nama_pelaku: context.currentUser.nama || context.currentUser.username
          }
        });

        return usulanBaru;
      });
    },

    tambahAnggotaDosen: async (_, { input }, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak!');
      const usulan = await context.prisma.tb_usulan.findUnique({ where: { id_usulan: input.id_usulan } });
      if (!usulan) throw new Error('Usulan tidak ditemukan!');
      if (usulan.nidn !== context.currentUser.username) throw new Error('Hanya Ketua Peneliti yang bisa menambah anggota!');

      return await context.prisma.tb_usulan_anggota.create({
        data: {
          id_usulan: input.id_usulan,
          nidn: input.nidn,
          persetujuan: 0
        }
      });
    },

    hapusAnggotaDosen: async (_, { id_anggota }, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak!');
      await context.prisma.tb_usulan_anggota.delete({ where: { id_anggota } });
      return "Anggota Dosen berhasil dihapus!";
    },

    tambahAnggotaMahasiswa: async (_, { input }, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak!');
      const usulan = await context.prisma.tb_usulan.findUnique({ where: { id_usulan: input.id_usulan } });
      if (!usulan || usulan.nidn !== context.currentUser.username) {
        throw new Error('Akses ditolak! Anda bukan Ketua dari usulan ini.');
      }

      return await context.prisma.tb_usulan_mahasiswa.create({
        data: {
          id_usulan: input.id_usulan,
          nim: input.nim,
          namamahasiswa: input.namamahasiswa,
          id_prodi: input.id_prodi || null
        }
      });
    },

    hapusAnggotaMahasiswa: async (_, { id_mahasiswa }, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak!');
      await context.prisma.tb_usulan_mahasiswa.delete({ where: { id_mahasiswa } });
      return "Anggota Mahasiswa berhasil dihapus!";
    },

    // ==========================================
    // BARU: Mutasi Dokumen & Biaya (RAB)
    // ==========================================
    unggahLampiranUsulan: async (_, { input }, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak!');
      
      const usulan = await context.prisma.tb_usulan.findUnique({ where: { id_usulan: input.id_usulan } });
      if (!usulan || usulan.nidn !== context.currentUser.username) {
        throw new Error('Hanya Ketua yang bisa mengunggah dokumen!');
      }

      // Catat info file ke database (File aslinya diupload terpisah via REST API / Middleware)
      return await context.prisma.tb_usulan_lampiran.create({
        data: {
          id_usulan: input.id_usulan,
          tipe: input.tipe,
          nama_file: input.nama_file,
          path_file: input.path_file,
          ukuran_file: input.ukuran_file,
          mime_type: input.mime_type || null,
          diunggah_oleh: context.currentUser.id_user
        }
      });
    },

    hapusLampiranUsulan: async (_, { id_lampiran }, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak!');
      
      // Ambil data lampiran
      const lampiran = await context.prisma.tb_usulan_lampiran.findUnique({ where: { id_lampiran } });
      if (!lampiran) throw new Error('Lampiran tidak ditemukan!');
      
      // Validasi kepemilikan usulan
      const usulan = await context.prisma.tb_usulan.findUnique({ where: { id_usulan: lampiran.id_usulan } });
      if (!usulan || usulan.nidn !== context.currentUser.username) {
        throw new Error('Hanya Ketua yang bisa menghapus dokumen!');
      }

      await context.prisma.tb_usulan_lampiran.delete({ where: { id_lampiran } });
      return "Dokumen berhasil dihapus!";
    },

    simpanBiayaUsulan: async (_, { input }, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak!');
      
      const usulan = await context.prisma.tb_usulan.findUnique({ where: { id_usulan: input.id_usulan } });
      if (!usulan || usulan.nidn !== context.currentUser.username) {
        throw new Error('Akses ditolak! Anda bukan Ketua dari usulan ini.');
      }

      // Cek apakah data biaya sudah ada
      const biayaLama = await context.prisma.tb_usulan_biaya.findFirst({
        where: { id_usulan: input.id_usulan }
      });

      if (biayaLama) {
        // Jika sudah ada, lakukan UPDATE
        return await context.prisma.tb_usulan_biaya.update({
          where: { id_biaya: biayaLama.id_biaya },
          data: {
            biaya_usulan_th1: input.biaya_usulan_th1,
            biaya_usulan_th2: input.biaya_usulan_th2 || 0,
            biaya_usulan_th3: input.biaya_usulan_th3 || 0,
            biaya_mitra: input.biaya_mitra || 0,
            biaya_instansilain: input.biaya_instansilain || 0,
            kontribusi_mitra: input.kontribusi_mitra || null,
            kontribusi_mitra_ket: input.kontribusi_mitra_ket || null,
            instansilain: input.instansilain || null,
            kontribusi_lain: input.kontribusi_lain || null,
            keterangan_lain: input.keterangan_lain || null
          }
        });
      } else {
        // Jika belum ada, lakukan CREATE
        return await context.prisma.tb_usulan_biaya.create({
          data: {
            id_usulan: input.id_usulan,
            biaya_usulan_th1: input.biaya_usulan_th1,
            biaya_usulan_th2: input.biaya_usulan_th2 || 0,
            biaya_usulan_th3: input.biaya_usulan_th3 || 0,
            biaya_mitra: input.biaya_mitra || 0,
            biaya_instansilain: input.biaya_instansilain || 0,
            kontribusi_mitra: input.kontribusi_mitra || null,
            kontribusi_mitra_ket: input.kontribusi_mitra_ket || null,
            instansilain: input.instansilain || null,
            kontribusi_lain: input.kontribusi_lain || null,
            keterangan_lain: input.keterangan_lain || null
          }
        });
      }
    }
  }
};