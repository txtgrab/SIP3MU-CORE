import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authResolvers = {
  // BARU: Logika untuk mengambil profil saat ini
  Query: {
    me: async (_, __, context) => {
      if (!context.currentUser) throw new Error('Akses ditolak! Token tidak valid.');
      
      const user = await context.prisma.tb_user.findUnique({
        where: { id_user: context.currentUser.id_user },
        include: { tb_user_role: { include: { tb_role: true } } }
      });

      if (!user) throw new Error('User tidak ditemukan!');

      const userRoles = user.tb_user_role.map((ur) => ur.tb_role.nama_role);

      return {
        ...user,
        roles: userRoles // Kirim array role ke frontend
      };
    }
  },

  Mutation: {
    login: async (_, { username, password }, context) => {
      const user = await context.prisma.tb_user.findUnique({
        where: { username: username },
        include: { tb_user_role: { include: { tb_role: true } } }
      });

      if (!user) throw new Error('Username tidak ditemukan!');

      const isPasswordValid = await bcrypt.compare(password, user.hashing);
      if (!isPasswordValid) throw new Error('Password salah!');

      const userRoles = user.tb_user_role.map((ur) => ur.tb_role.nama_role);

      const token = jwt.sign(
        {
          id_user: user.id_user,
          username: user.username,
          id_institusi: user.id_institusi,
          roles: userRoles
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      // Kembalikan token dan profil user
      return { token, user: { ...user, roles: userRoles } };
    },
  },
};