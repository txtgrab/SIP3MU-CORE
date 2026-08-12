export const reviewResolvers = {
  Mutation: {
    nilaiDeskPenelitian: async (_, { input }, context) => {
      // 1. Cek Autentikasi & Otorisasi
      if (!context.currentUser) throw new Error('Akses ditolak! Silakan login.');
      if (!context.currentUser.roles.includes('Reviewer')) {
        throw new Error('Akses ditolak! Hanya Reviewer yang bisa memberikan penilaian.');
      }

      // 2. Cari Profil Reviewer milik user yang sedang login
      const profilRev = await context.prisma.tb_reviewer_profil.findUnique({
        where: { id_user: context.currentUser.id_user }
      });
      if (!profilRev) throw new Error('Profil Reviewer Anda belum dikonfigurasi!');

      // Hitung total skor secara otomatis di backend
      const totalSkor = input.skor_1 + input.skor_2 + input.skor_3 + input.skor_4 + input.skor_5 + input.skor_6;

      // 3. Prisma Transaction (Simpan Nilai & Update Status Usulan & Catat Log)
      return await context.prisma.$transaction(async (tx) => {
        // A. Simpan penilaian ke tb_desk_penelitian
        const nilaiBaru = await tx.tb_desk_penelitian.create({
          data: {
            id_usulan: input.id_usulan,
            id_reviewer: profilRev.id_reviewer,
            nidn_reviewer: profilRev.nidn,
            skor_1: input.skor_1, skor_2: input.skor_2, skor_3: input.skor_3, 
            skor_4: input.skor_4, skor_5: input.skor_5, skor_6: input.skor_6,
            total: totalSkor,
            rekom_dana: input.rekom_dana,
            komentar: input.komentar,
            ketetapan: input.ketetapan,
            cat_manaj: 'Dievaluasi via API',
            tanggal: new Date()
          }
        });

        // B. Update status usulan sesuai ketetapan Reviewer
        let statusBaru = 'on_desk';
        if (input.ketetapan === 'didanai') statusBaru = 'didanai'; // Atau bisa ke 'on_paparan' sesuai alur
        else if (input.ketetapan === 'tidak_didanai') statusBaru = 'tidak_didanai';
        else if (input.ketetapan === 'revisi') statusBaru = 'revisi';

        await tx.tb_usulan.update({
          where: { id_usulan: input.id_usulan },
          data: { 
            status_usulan: statusBaru,
            dana_disetujui: input.ketetapan === 'didanai' ? input.rekom_dana : 0
          }
        });

        // C. Catat ke log
        await tx.tb_usulan_log.create({
          data: {
            id_usulan: input.id_usulan,
            status_lama: 'on_desk',
            status_baru: statusBaru,
            catatan: `Evaluasi Desk Selesai. Total Skor: ${totalSkor}. Ketetapan: ${input.ketetapan}`,
            dilakukan_oleh: context.currentUser.id_user,
            nama_pelaku: context.currentUser.nama
          }
        });

        return nilaiBaru;
      });
    }
  }
};