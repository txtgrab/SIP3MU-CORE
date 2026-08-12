import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Menyiapkan Data Master...');

  // 1. Ambil akun Dosen yang sudah terdaftar
  const userDosen = await prisma.tb_user.findUnique({ where: { username: 'bapak_dosen' } });
  if (!userDosen) throw new Error('User bapak_dosen belum ada! Jalankan seeder Dosen dulu.');

  // 2. Buat Profil Dosen di tb_dosen
  let dosen = await prisma.tb_dosen.findUnique({ where: { nidn: 'bapak_dosen' } });
  if (!dosen) {
    dosen = await prisma.tb_dosen.create({
      data: {
        nidn: 'bapak_dosen',
        id_user: userDosen.id_user,
        id_institusi: userDosen.id_institusi,
        namalengkap: userDosen.nama,
        sex: 'L',
        keilmuan: 'Teknologi Informasi',
        alamatrumah: '-', email: 'dosen@sip3mu.com',
        telp: '-', fax: '-', alamatkantor: '-', faxkantor: '-', emailkantor: '-', scopus_id: '-', h_index: 0
      }
    });
  }

  // 3. Buat Sumberdana
  let sd = await prisma.tb_sumberdana.findFirst();
  if (!sd) {
    sd = await prisma.tb_sumberdana.create({
      data: { id_institusi: userDosen.id_institusi, kategori: 'internal', nama_sumberdana: 'Hibah Internal' }
    });
  }

  // 4. Buat Skema
  let sk = await prisma.tb_skema.findFirst();
  if (!sk) {
    sk = await prisma.tb_skema.create({
      data: { id_institusi: userDosen.id_institusi, id_sumberdana: sd.id_sumberdana, jenis: 'penelitian', tingkat: 'universitas', nama_skema: 'Penelitian Terapan', dana_sementara: 10000000 }
    });
  }

  // 5. Buka Timeline Pendaftaran
  let tl = await prisma.tb_timeline.findFirst();
  if (!tl) {
    tl = await prisma.tb_timeline.create({
      data: { id_skema: sk.id_skema, id_institusi: userDosen.id_institusi, tahun: 2026, usulan_awal: new Date(), usulan_akhir: new Date(new Date().setMonth(new Date().getMonth() + 1)), status: 'aktif', dibuat_oleh: userDosen.id_user }
    });
  }

  console.log('✅ Master data (Dosen, Sumberdana, Skema, Timeline) siap digunakan!');
}

main().catch(console.error).finally(async () => await prisma.$disconnect());