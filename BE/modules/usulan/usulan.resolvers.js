export const usulanResolvers = {
  Query: {
    // BARU: Fungsi untuk menarik data riwayat
    getRiwayatUsulan: async (_, { id_usulan }, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak! Silakan login.');

      // 1. Ambil data utama usulannya
      const usulan = await context.prisma.tb_usulan.findUnique({
        where: { id_usulan: id_usulan }
      });
      if (!usulan) throw new Error('Usulan tidak ditemukan!');

      // 2. Ambil semua riwayat validasinya (diurutkan dari yang terbaru)
      const validasiRaw = await context.prisma.tb_usulan_validasi.findMany({
        where: { id_usulan: id_usulan },
        orderBy: { tgl_validasi: 'desc' }
      });

      // 3. Ambil semua log perubahannya (diurutkan dari yang terbaru)
      const logRaw = await context.prisma.tb_usulan_log.findMany({
        where: { id_usulan: id_usulan },
        orderBy: { created_at: 'desc' }
      });

      // Format tanggal agar mudah dibaca oleh GraphQL (ubah Date menjadi String ISO)
      const validasi = validasiRaw.map(v => ({
        ...v,
        tgl_validasi: v.tgl_validasi ? v.tgl_validasi.toISOString() : null
      }));

      const log = logRaw.map(l => ({
        ...l,
        created_at: l.created_at ? l.created_at.toISOString() : null
      }));

      // Kembalikan bungkusan ketiganya ke Frontend
      return {
        usulan,
        validasi,
        log
      };
    }
  },

  Mutation: {
    // ... KODE MUTATION DI BAWAH SINI TETAP SAMA PERSIS SEPERTI SEBELUMNYA ...
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
    }
  }
};