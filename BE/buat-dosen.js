import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai pembuatan akun Dosen...');

  const passwordAsli = 'dosen123';
  const hashedPassword = await bcrypt.hash(passwordAsli, 10);

  // Ambil data Institusi (Misal: Fakultas Teknik yang sudah dibuat)
  const institusi = await prisma.tb_institusi.findFirst();
  if (!institusi) throw new Error('Data institusi kosong!');

  // Buat Role 'Dosen'
  const roleDosen = await prisma.tb_role.create({
    data: { nama_role: 'Dosen' }
  });

  // Buat akun User Dosen
  const dosen = await prisma.tb_user.create({
    data: {
      username: 'bapak_dosen',
      hashing: hashedPassword,
      nama: 'Bapak Budi (Dosen)',
      email: 'budi@dosen.sip3mu.com',
      id_institusi: institusi.id_institusi,
      tb_user_role: {
        create: { id_role: roleDosen.id_role }
      }
    }
  });

  console.log('✅ Akun Dosen berhasil dibuat!');
  console.log(`Username: ${dosen.username} | Password: ${passwordAsli}`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());