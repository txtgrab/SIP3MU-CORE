import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai pembuatan akun Admin...');

  // 1. Buat password yang sudah di-hash (misal passwordnya: "admin123")
  const passwordAsli = 'admin123';
  const hashedPassword = await bcrypt.hash(passwordAsli, 10);

  // 2. Ambil data Institusi (Fakultas Teknik) yang tadi kamu buat lewat GraphQL
  const institusi = await prisma.tb_institusi.findFirst();
  if (!institusi) {
    throw new Error('Data institusi kosong! Silakan jalankan Mutation tambahInstitusi dulu di Sandbox.');
  }

  // 3. Buat Role 'Administrator' di tabel tb_role
  const roleAdmin = await prisma.tb_role.create({
    data: {
      nama_role: 'Administrator'
    }
  });

  // 4. Buat User dan langsung hubungkan ke tabel tb_user_role
  const admin = await prisma.tb_user.create({
    data: {
      username: 'admin',
      hashing: hashedPassword,
      nama: 'Bapak Administrator',
      email: 'admin@sip3mu.com',
      id_institusi: institusi.id_institusi,
      // Membuat relasi user ke role secara otomatis
      tb_user_role: {
        create: {
          id_role: roleAdmin.id_role
        }
      }
    }
  });

  console.log('✅ Berhasil! Akun admin siap digunakan.');
  console.log(`Username: ${admin.username}`);
  console.log(`Password: ${passwordAsli}`);
}

main()
  .catch((e) => {
    console.error('❌ Gagal membuat user. Error:', e.message);
    console.log('\n*Catatan: Jika error terkait "id_role", periksa nama kolom ID role di file schema.prisma kamu dan sesuaikan kodenya.*');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });