export const institusiResolvers = {
  Query: {
    halo: () => 'Halo dari Backend SIP3MU!',
    getInstitusi: async (_, __, context) => {
      return await context.prisma.tb_institusi.findMany();
    },
  },
  
  Mutation: {
    tambahInstitusi: async (_, args, context) => {
      if (!context.currentUser) {
        throw new Error('Akses ditolak! Anda harus login terlebih dahulu.');
      }

      if (!context.currentUser.roles.includes('Administrator')) {
        throw new Error('Akses ditolak! Hanya Administrator yang boleh menambah institusi.');
      }

      const institusiBaru = await context.prisma.tb_institusi.create({
        data: {
          kode_institusi: args.kode_institusi,
          nama_institusi: args.nama_institusi,
          tipe: args.tipe,
        },
      });
      
      return institusiBaru;
    },
  },
};