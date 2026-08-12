import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Menyiapkan Akun Reviewer...');

  const passwordAsli = 'reviewer123';
  const hashedPassword = await bcrypt.hash(passwordAsli, 10);

  const institusi = await prisma.tb_institusi.findFirst();
  
  // Buat Role Reviewer jika belum ada
  let roleRev = await prisma.tb_role.findFirst({ where: { nama_role: 'Reviewer' } });
  if (!roleRev) {
    roleRev = await prisma.tb_role.create({ data: { nama_role: 'Reviewer' } });
  }

  // 1. Buat Akun User
  const userRev = await prisma.tb_user.create({
    data: {
      username: 'bapak_reviewer',
      hashing: hashedPassword,
      nama: 'Prof. Ahli Sistem (Reviewer)',
      email: 'rev@sip3mu.com',
      id_institusi: institusi.id_institusi,
      tb_user_role: { create: { id_role: roleRev.id_role } }
    }
  });

  // 2. Daftarkan sebagai Dosen
  await prisma.tb_dosen.create({
    data: {
      nidn: 'bapak_reviewer',
      id_user: userRev.id_user,
      id_institusi: institusi.id_institusi,
      namalengkap: userRev.nama,
      sex: 'L', keilmuan: 'Sistem Informasi',
      alamatrumah: '-', email: '-', telp: '-', fax: '-', alamatkantor: '-', faxkantor: '-', emailkantor: '-', scopus_id: '-', h_index: 0
    }
  });

  // 3. Daftarkan ke Profil Reviewer khusus SIP3MU
  await prisma.tb_reviewer_profil.create({
    data: {
      id_user: userRev.id_user,
      nidn: 'bapak_reviewer',
      nip: '198001012005011001',
      bidang_keahlian: 'Internet of Things (IoT)',
      jenis_reviewer: 'keduanya'
    }
  });

  console.log('✅ Akun Reviewer berhasil dibuat!');
  console.log(`Username: ${userRev.username} | Password: ${passwordAsli}`);
}

main().catch(console.error).finally(async () => await prisma.$disconnect());