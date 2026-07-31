export const MYSQL_SCHEMA_DDL = `-- ====================================================================
-- DATABASE SCHEMA & DDL FOR E-SURAT DIGITAL GOV / ENTERPRISE
-- Database Engine: MySQL 8.0+ / MariaDB 10.5+
-- Generated Date: 2026-07-31
-- ====================================================================

CREATE DATABASE IF NOT EXISTS \`db_esurat_digital\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`db_esurat_digital\`;

-- 1. TABLE MASTER INSTANSI
CREATE TABLE IF NOT EXISTS \`master_instansi\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`nama\` VARCHAR(255) NOT NULL,
  \`nama_yayasan\` VARCHAR(255) NULL,
  \`logo\` LONGTEXT NULL,
  \`alamat\` TEXT NOT NULL,
  \`telepon\` VARCHAR(50) NULL,
  \`email\` VARCHAR(100) NULL,
  \`website\` VARCHAR(100) NULL,
  \`kode_pos\` VARCHAR(10) NULL,
  \`nama_pimpinan\` VARCHAR(150) NOT NULL,
  \`nip_pimpinan\` VARCHAR(50) NOT NULL,
  \`jabatan_pimpinan\` VARCHAR(150) NOT NULL,
  \`kode_instansi\` VARCHAR(50) NOT NULL,
  \`kop_garis_ganda\` TINYINT(1) DEFAULT 1,
  \`kop_sub_header\` VARCHAR(255) NULL,
  \`footer_text\` TEXT NULL,
  \`stempel_digital\` LONGTEXT NULL,
  \`ttd_digital_pimpinan\` LONGTEXT NULL,
  \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. TABLE MASTER JABATAN
CREATE TABLE IF NOT EXISTS \`master_jabatan\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`kode\` VARCHAR(20) UNIQUE NOT NULL,
  \`nama_jabatan\` VARCHAR(100) NOT NULL,
  \`tingkat\` INT NOT NULL DEFAULT 1,
  \`deskripsi\` TEXT NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. TABLE MASTER UNIT KERJA
CREATE TABLE IF NOT EXISTS \`master_unit_kerja\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`kode_unit\` VARCHAR(30) UNIQUE NOT NULL,
  \`nama_unit\` VARCHAR(150) NOT NULL,
  \`kepala_unit\` VARCHAR(150) NULL,
  \`email_unit\` VARCHAR(100) NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. TABLE MASTER PEGAWAI / USERS
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`nip\` VARCHAR(50) NOT NULL,
  \`nama\` VARCHAR(150) NOT NULL,
  \`jabatan\` VARCHAR(100) NOT NULL,
  \`unit_kerja\` VARCHAR(100) NOT NULL,
  \`no_hp\` VARCHAR(30) NULL,
  \`email\` VARCHAR(100) UNIQUE NOT NULL,
  \`foto\` LONGTEXT NULL,
  \`role\` ENUM('Administrator', 'Operator', 'Sekretaris', 'Kepala Bagian', 'Pimpinan', 'Pegawai', 'Tamu') NOT NULL DEFAULT 'Pegawai',
  \`status\` ENUM('Aktif', 'Nonaktif') NOT NULL DEFAULT 'Aktif',
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`ttd_digital\` LONGTEXT NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. TABLE MASTER KLASIFIKASI SURAT
CREATE TABLE IF NOT EXISTS \`master_klasifikasi\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`kode_klasifikasi\` VARCHAR(30) UNIQUE NOT NULL,
  \`nama_klasifikasi\` VARCHAR(100) NOT NULL,
  \`keterangan\` TEXT NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. TABLE MASTER PENANDATANGAN
CREATE TABLE IF NOT EXISTS \`master_penandatangan\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`nama\` VARCHAR(150) NOT NULL,
  \`nip\` VARCHAR(50) NOT NULL,
  \`jabatan\` VARCHAR(100) NOT NULL,
  \`unit_kerja\` VARCHAR(100) NOT NULL,
  \`ttd_digital\` LONGTEXT NULL,
  \`qr_verification_code\` VARCHAR(100) NOT NULL,
  \`aktif\` TINYINT(1) DEFAULT 1,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. TABLE SURAT MASUK
CREATE TABLE IF NOT EXISTS \`surat_masuk\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`nomor_agenda\` VARCHAR(50) UNIQUE NOT NULL,
  \`tanggal_terima\` DATE NOT NULL,
  \`tanggal_surat\` DATE NOT NULL,
  \`nomor_surat\` VARCHAR(100) NOT NULL,
  \`asal_surat\` VARCHAR(255) NOT NULL,
  \`perihal\` TEXT NOT NULL,
  \`ringkasan\` TEXT NULL,
  \`sifat_surat\` ENUM('Biasa', 'Penting', 'Rahasia', 'Sangat Rahasia') DEFAULT 'Biasa',
  \`klasifikasi_id\` VARCHAR(50) NOT NULL,
  \`klasifikasi_kode\` VARCHAR(30) NOT NULL,
  \`lampiran_count\` INT DEFAULT 0,
  \`file_pdf_url\` LONGTEXT NULL,
  \`status\` ENUM('Diterima', 'Disposisi', 'Proses', 'Selesai', 'Diarsipkan') DEFAULT 'Diterima',
  \`petugas_input\` VARCHAR(150) NOT NULL,
  \`disposisi_count\` INT DEFAULT 0,
  \`tags\` VARCHAR(255) NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`klasifikasi_id\`) REFERENCES \`master_klasifikasi\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. TABLE DISPOSISI SURAT
CREATE TABLE IF NOT EXISTS \`disposisi_surat\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`surat_masuk_id\` VARCHAR(50) NOT NULL,
  \`nomor_surat\` VARCHAR(100) NOT NULL,
  \`perihal\` TEXT NOT NULL,
  \`pengirim_id\` VARCHAR(50) NOT NULL,
  \`pengirim_nama\` VARCHAR(150) NOT NULL,
  \`penerima_id\` VARCHAR(50) NOT NULL,
  \`penerima_nama\` VARCHAR(150) NOT NULL,
  \`penerima_unit\` VARCHAR(100) NULL,
  \`instruksi\` VARCHAR(255) NOT NULL,
  \`catatan_tambahan\` TEXT NULL,
  \`prioritas\` ENUM('Biasa', 'Penting', 'Segera', 'Sangat Segera') DEFAULT 'Biasa',
  \`deadline\` DATE NULL,
  \`tanggal_disposisi\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  \`status\` ENUM('Menunggu', 'Dalam Proses', 'Selesai') DEFAULT 'Menunggu',
  \`balasan_disposisi\` TEXT NULL,
  \`tanggal_selesai\` DATETIME NULL,
  FOREIGN KEY (\`surat_masuk_id\`) REFERENCES \`surat_masuk\`(\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`pengirim_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. TABLE SURAT KELUAR
CREATE TABLE IF NOT EXISTS \`surat_keluar\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`nomor_surat\` VARCHAR(100) UNIQUE NOT NULL,
  \`tanggal\` DATE NOT NULL,
  \`tujuan\` VARCHAR(255) NOT NULL,
  \`alamat_tujuan\` TEXT NULL,
  \`perihal\` TEXT NOT NULL,
  \`isi_surat\` LONGTEXT NOT NULL,
  \`lampiran_text\` VARCHAR(255) NULL,
  \`klasifikasi_id\` VARCHAR(50) NOT NULL,
  \`klasifikasi_kode\` VARCHAR(30) NOT NULL,
  \`jenis_surat\` VARCHAR(100) NOT NULL,
  \`penandatangan_id\` VARCHAR(50) NOT NULL,
  \`penandatangan_nama\` VARCHAR(150) NOT NULL,
  \`penandatangan_nip\` VARCHAR(50) NOT NULL,
  \`penandatangan_jabatan\` VARCHAR(100) NOT NULL,
  \`status\` ENUM('Draft', 'Review', 'Disetujui', 'Ditolak', 'Terkirim', 'Diarsipkan') DEFAULT 'Draft',
  \`current_approval_stage\` ENUM('Operator', 'Kepala Bagian', 'Sekretaris', 'Pimpinan', 'Final') DEFAULT 'Operator',
  \`ttd_digital_applied\` TINYINT(1) DEFAULT 0,
  \`qr_code_url\` VARCHAR(255) NULL,
  \`file_pdf_url\` LONGTEXT NULL,
  \`created_by\` VARCHAR(150) NOT NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`klasifikasi_id\`) REFERENCES \`master_klasifikasi\`(\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`penandatangan_id\`) REFERENCES \`master_penandatangan\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. TABLE APPROVAL HISTORY SURAT KELUAR
CREATE TABLE IF NOT EXISTS \`approval_history\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`surat_keluar_id\` VARCHAR(50) NOT NULL,
  \`stage\` ENUM('Operator', 'Kepala Bagian', 'Sekretaris', 'Pimpinan', 'Final') NOT NULL,
  \`actor_nama\` VARCHAR(150) NOT NULL,
  \`actor_role\` VARCHAR(50) NOT NULL,
  \`action\` ENUM('Submit', 'Approve', 'Reject', 'Revision') NOT NULL,
  \`catatan\` TEXT NULL,
  \`timestamp\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`surat_keluar_id\`) REFERENCES \`surat_keluar\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. TABLE TEMPLATE SURAT
CREATE TABLE IF NOT EXISTS \`template_surat\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`kode\` VARCHAR(30) UNIQUE NOT NULL,
  \`nama_template\` VARCHAR(150) NOT NULL,
  \`jenis_surat\` VARCHAR(100) NOT NULL,
  \`deskripsi\` TEXT NULL,
  \`subjek_default\` VARCHAR(255) NULL,
  \`konten_html\` LONGTEXT NOT NULL,
  \`placeholders\` TEXT NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. TABLE LOG AKTIVITAS / AUDIT TRAIL
CREATE TABLE IF NOT EXISTS \`log_aktivitas\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`user_id\` VARCHAR(50) NOT NULL,
  \`user_nama\` VARCHAR(150) NOT NULL,
  \`user_role\` VARCHAR(50) NOT NULL,
  \`aksi\` VARCHAR(50) NOT NULL,
  \`deskripsi\` TEXT NOT NULL,
  \`modul\` VARCHAR(50) NOT NULL,
  \`ip_address\` VARCHAR(50) NULL,
  \`timestamp\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ====================================================================
-- SEEDER DATA INITIAL
-- ====================================================================

INSERT INTO \`master_instansi\` (\`id\`, \`nama\`, \`nama_yayasan\`, \`alamat\`, \`telepon\`, \`email\`, \`website\`, \`kode_pos\`, \`nama_pimpinan\`, \`nip_pimpinan\`, \`jabatan_pimpinan\`, \`kode_instansi\`)
VALUES (1, 'PEMERINTAH KOTA ADMINISTRASI DIGITAL', 'DINAS KOMUNIKASI, INFORMATIKA DAN PERSATUAN PERSANDIAN', 'Jl. Kompleks Perkantoran Sentra Pemerintahan No. 01 Gedung B Lt. 3', '(021) 555-8901', 'sekretariat@diskominfo.go.id', 'https://diskominfo.go.id', '12340', 'Dr. H. Ahmad Wijaya, M.Si.', '19820315 200801 1 002', 'Kepala Dinas Komunikasi dan Informatika', 'DISKOMINFO');

INSERT INTO \`users\` (\`id\`, \`nip\`, \`nama\`, \`jabatan\`, \`unit_kerja\`, \`email\`, \`role\`, \`password_hash\`) VALUES
('usr-admin', '19850101 201001 1 001', 'Budi Santoso, S.Kom., M.T.', 'System Administrator', 'Subbagian TI', 'admin@esurat.go.id', 'Administrator', '$2y$10$e818a72f88ff81122'),
('usr-pimpinan', '19820315 200801 1 002', 'Dr. H. Ahmad Wijaya, M.Si.', 'Kepala Dinas', 'Pimpinan', 'pimpinan@esurat.go.id', 'Pimpinan', '$2y$10$e818a72f88ff81122');
`;
