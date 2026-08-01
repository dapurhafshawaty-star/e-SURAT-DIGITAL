import {
  MasterInstansi,
  User,
  MasterJabatan,
  MasterUnitKerja,
  MasterKlasifikasi,
  MasterPenandatangan,
  SuratMasuk,
  SuratKeluar,
  Disposisi,
  TemplateSurat,
  HistoryLog,
  SystemConfig
} from '../types';

export const initialInstansi: MasterInstansi = {
  barisAtasHeader: "PEMERINTAH PROVINSI / KABUPATEN DIGITAL",
  nama: "DINAS KOMUNIKASI DAN INFORMATIKA",
  namaYayasan: "SECRETARIAT GENERAL & LAYANAN ELEKTRONIK",
  logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%230369a1'/><path d='M30,65 L50,25 L70,65 Z' fill='%23ffffff'/><circle cx='50' cy='50' r='10' fill='%23f59e0b'/></svg>",
  logoSize: 68,
  alamat: "Jl. Pemuda No. 100, Kompleks Balai Kota, Kota Digital 10110",
  telepon: "(021) 555-0199 / 555-0200",
  email: "sekretariat@diskominfo.go.id",
  website: "https://diskominfo.go.id",
  kodePos: "10110",
  namaPimpinan: "Dr. H. Ahmad Wijaya, M.Si.",
  nipPimpinan: "19820315 200801 1 002",
  jabatanPimpinan: "Kepala Dinas Komunikasi dan Informatika",
  kodeInstansi: "DISKOMINFO",
  kopGarisGanda: true,
  kopGarisStyle: "double",
  kopSubHeader: "Sistem Administrasi Persuratan & Naskah Dinas Digital Terintegrasi",
  footerText: "Dokumen ini sah dan telah ditandatangani secara elektronik menggunakan sertifikat digital resmi.",
  stempelDigital: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><circle cx='60' cy='60' r='52' stroke='%230f172a' stroke-width='3' fill='none' stroke-dasharray='4 2'/><circle cx='60' cy='60' r='44' stroke='%230369a1' stroke-width='2' fill='none'/><text x='60' y='55' font-size='8' font-weight='bold' text-anchor='middle' fill='%230369a1'>DINAS KOMINFO</text><text x='60' y='68' font-size='7' text-anchor='middle' fill='%230369a1'>VERIFIED E-SIGN</text></svg>",
  ttdDigitalPimpinan: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='70' viewBox='0 0 180 70'><path d='M20,45 Q40,10 60,40 T100,20 T140,50 T160,25' stroke='%230f172a' stroke-width='2.5' fill='none'/><text x='20' y='62' font-size='10' font-family='serif' fill='%23334155'>Dr. H. Ahmad Wijaya, M.Si.</text></svg>",
  
  kopAlign: "center",
  fontFamilyHeader: "Times New Roman",
  barisAtasSize: 13,
  barisAtasBold: true,
  barisAtasUppercase: true,
  namaInstansiSize: 16,
  namaInstansiBold: true,
  namaInstansiUppercase: true,
  subHeaderSize: 13,
  subHeaderBold: true,
  subHeaderUppercase: true,
  alamatSize: 11,
  alamatItalic: false,
  kontakSize: 10,
  kontakItalic: true
};

export const initialUsers: User[] = [
  {
    id: "usr-admin",
    nip: "19850101 201001 1 001",
    nama: "Budi Santoso, S.STP, M.Si.",
    jabatan: "Administrator Sistem e-Surat",
    unitKerja: "Subbagian Umum & Kepegawaian",
    noHp: "0812-3456-7890",
    email: "admin@esurat.go.id",
    pin: "123456",
    role: "Administrator",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-operator",
    nip: "19920412 201502 2 003",
    nama: "Siti Rahmawati, A.Md.",
    jabatan: "Operator Persuratan & Agenda",
    unitKerja: "Subbagian Umum & Kepegawaian",
    noHp: "0813-9876-5432",
    email: "operator@esurat.go.id",
    pin: "123456",
    role: "Operator",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-sekretaris",
    nip: "19880520 201203 2 004",
    nama: "Anisa Nuraini, S.AP.",
    jabatan: "Sekretaris Dinas",
    unitKerja: "Sekretariat Utama",
    noHp: "0811-2233-4455",
    email: "sekretaris@esurat.go.id",
    pin: "123456",
    role: "Sekretaris",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-kabag",
    nip: "19791108 200501 1 005",
    nama: "Drs. Bambang Hermawan, M.Si.",
    jabatan: "Kepala Bagian Tata Usaha & Hukum",
    unitKerja: "Bagian Tata Usaha",
    noHp: "0852-1122-3344",
    email: "kabag.tu@esurat.go.id",
    pin: "123456",
    role: "Kepala Bagian",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-pimpinan",
    nip: "19820315 200801 1 002",
    nama: "Dr. H. Ahmad Wijaya, M.Si.",
    jabatan: "Kepala Dinas Komunikasi dan Informatika",
    unitKerja: "Pimpinan Tinggi",
    noHp: "0812-9988-7766",
    email: "pimpinan@esurat.go.id",
    pin: "123456",
    role: "Pimpinan",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-pegawai",
    nip: "19950817 201903 1 008",
    nama: "Hendrik Wijaya, S.T., M.Kom.",
    jabatan: "Pranata Komputer Ahli Muda",
    unitKerja: "Bidang Layanan E-Government",
    noHp: "0818-0011-2233",
    email: "hendrik@esurat.go.id",
    pin: "123456",
    role: "Pegawai",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-tamu",
    nip: "-",
    nama: "Tamu Publik / Pengunjung",
    jabatan: "Masyarakat Umum",
    unitKerja: "Publik",
    noHp: "0800-0000-0000",
    email: "tamu@esurat.go.id",
    pin: "123456",
    role: "Tamu",
    status: "Aktif"
  }
];

export const initialJabatan: MasterJabatan[] = [
  { id: "jab-1", kodeJabatan: "JAB-001", namaJabatan: "Kepala Dinas", tingkatEselon: "Eselon II.a", deskripsi: "Pimpinan Tertinggi Instansi" },
  { id: "jab-2", kodeJabatan: "JAB-002", namaJabatan: "Sekretaris Dinas", tingkatEselon: "Eselon III.a", deskripsi: "Pengelola Kesekretariatan" },
  { id: "jab-3", kodeJabatan: "JAB-003", namaJabatan: "Kepala Bagian / Kepala Bidang", tingkatEselon: "Eselon III.b", deskripsi: "Pimpinan Unit Struktural" },
  { id: "jab-4", kodeJabatan: "JAB-004", namaJabatan: "Kepala Subbagian / Subkoordinator", tingkatEselon: "Eselon IV.a", deskripsi: "Pimpinan Substruktural" },
  { id: "jab-5", kodeJabatan: "JAB-005", namaJabatan: "Pranata Komputer / Analis System", tingkatEselon: "Fungsional", deskripsi: "Pejabat Fungsional IT" },
  { id: "jab-6", kodeJabatan: "JAB-006", namaJabatan: "Analis Kebijakan / Pengelola Persuratan", tingkatEselon: "Pelaksana", deskripsi: "Pelaksana Persuratan & Disposisi" }
];

export const initialUnitKerja: MasterUnitKerja[] = [
  { id: "unit-1", kodeUnit: "SEKRETARIAT", namaUnit: "Sekretariat Utama", kepalaUnit: "Anisa Nuraini, S.AP.", emailUnit: "sekretariat@esurat.go.id" },
  { id: "unit-2", kodeUnit: "TU-HUKUM", namaUnit: "Bagian Tata Usaha & Hukum", kepalaUnit: "Drs. Bambang Hermawan, M.Si.", emailUnit: "tu@esurat.go.id" },
  { id: "unit-3", kodeUnit: "E-GOV", namaUnit: "Bidang Layanan E-Government", kepalaUnit: "Hendrik Wijaya, S.T., M.Kom.", emailUnit: "egov@esurat.go.id" },
  { id: "unit-4", kodeUnit: "TIK", namaUnit: "Bidang Infrastruktur & Persandian", kepalaUnit: "Rahmat Hidayat, S.T.", emailUnit: "tik@esurat.go.id" },
  { id: "unit-5", kodeUnit: "HUMAS", namaUnit: "Bidang Komunikasi Publik & Humas", kepalaUnit: "Dewi Lestari, M.I.Kom.", emailUnit: "humas@esurat.go.id" }
];

export const initialKlasifikasi: MasterKlasifikasi[] = [
  { id: "kls-1", kodeKlasifikasi: "005/UND", namaKlasifikasi: "Undangan Resmi", keterangan: "Surat undangan rapat, seminar, dan kegiatan resmi", retensiTahun: 5 },
  { id: "kls-2", kodeKlasifikasi: "800/STG", namaKlasifikasi: "Surat Tugas", keterangan: "Surat perinta tugas perjalanan dinas dan kegiatan", retensiTahun: 3 },
  { id: "kls-3", kodeKlasifikasi: "470/KET", namaKlasifikasi: "Surat Keterangan", keterangan: "Surat keterangan resmi dinas / pegawai", retensiTahun: 5 },
  { id: "kls-4", kodeKlasifikasi: "180/SKP", namaKlasifikasi: "Surat Keputusan (SK)", keterangan: "Keputusan pimpinan instansi", retensiTahun: 10 },
  { id: "kls-5", kodeKlasifikasi: "060/EDR", namaKlasifikasi: "Surat Edaran", keterangan: "Himbauan atau pemberitahuan umum ke unit kerja", retensiTahun: 5 },
  { id: "kls-6", kodeKlasifikasi: "000/PMH", namaKlasifikasi: "Surat Permohonan", keterangan: "Permohonan bantuan, fasilitasi, atau kerjasama", retensiTahun: 3 },
  { id: "kls-7", kodeKlasifikasi: "050/RKM", namaKlasifikasi: "Surat Rekomendasi", keterangan: "Rekomendasi teknis atau kelayakan", retensiTahun: 5 },
  { id: "kls-8", kodeKlasifikasi: "020/NDN", namaKlasifikasi: "Nota Dinas", keterangan: "Surat internal antar pejabat / bidang", retensiTahun: 3 },
  { id: "kls-9", kodeKlasifikasi: "030/BAC", namaKlasifikasi: "Berita Acara", keterangan: "Dokumen serah terima / kesepakatan rapat", retensiTahun: 10 },
  { id: "kls-10", kodeKlasifikasi: "010/MEM", namaKlasifikasi: "Memorandum", keterangan: "Catatan internal pimpinan", retensiTahun: 3 }
];

export const initialPenandatangan: MasterPenandatangan[] = [
  {
    id: "ttd-1",
    nama: "Dr. H. Ahmad Wijaya, M.Si.",
    nip: "19820315 200801 1 002",
    jabatan: "Kepala Dinas Komunikasi dan Informatika",
    unitKerja: "Pimpinan Tinggi Pratama",
    pangkatGolongan: "Pembina Utama Muda (IV/c)",
    ttdImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='70' viewBox='0 0 180 70'><path d='M20,45 Q40,10 60,40 T100,20 T140,50 T160,25' stroke='%230f172a' stroke-width='2.5' fill='none'/><text x='20' y='62' font-size='10' font-family='serif' fill='%23334155'>Dr. H. Ahmad Wijaya, M.Si.</text></svg>",
    qrVerificationCode: "QR-DISCOM-2026-001",
    statusAktif: true
  },
  {
    id: "ttd-2",
    nama: "Anisa Nuraini, S.AP.",
    nip: "19880520 201203 2 004",
    jabatan: "Sekretaris Dinas",
    unitKerja: "Sekretariat Utama",
    pangkatGolongan: "Pembina (IV/a)",
    ttdImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='70' viewBox='0 0 180 70'><path d='M15,40 Q35,15 55,45 T95,30 T135,45' stroke='%230284c7' stroke-width='2' fill='none'/><text x='15' y='60' font-size='10' font-family='serif' fill='%23334155'>Anisa Nuraini, S.AP.</text></svg>",
    qrVerificationCode: "QR-DISCOM-2026-002",
    statusAktif: true
  }
];

export const initialSuratMasuk: SuratMasuk[] = [
  {
    id: "sm-001",
    nomorAgenda: "AGD/2026/07/001",
    tanggalTerima: "2026-07-28",
    tanggalSurat: "2026-07-25",
    nomorSurat: "005/124/SETDA/2026",
    asalSurat: "Sekretariat Daerah Kota Administrasi Digital",
    perihal: "Undangan Rapat Koordinasi Nasional E-Government & Sistem Pemerintahan Berbasis Elektronik (SPBE)",
    ringkasan: "Mengharapkan kehadiran Kepala Dinas beserta Tim Teknis pada Rapat Koordinasi SPBE Tahun 2026.",
    sifatSurat: "Penting",
    klasifikasiId: "kls-1",
    klasifikasiKode: "005/UND",
    lampiranCount: 2,
    filePdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    status: "Disposisi",
    petugasInput: "Siti Rahmawati, A.Md.",
    disposisiCount: 2,
    tags: ["SPBE", "Rakor", "Rapat"],
    created_at: "2026-07-28T09:15:00Z",
    historyLog: [
      { id: "hl-1", userId: "usr-operator", userNama: "Siti Rahmawati", userRole: "Operator", aksi: "Tambah", deskripsi: "Mencatat Surat Masuk baru nomor 005/124/SETDA/2026", modul: "Surat Masuk", ipAddress: "192.168.1.10", timestamp: "2026-07-28T09:15:00Z" },
      { id: "hl-2", userId: "usr-pimpinan", userNama: "Dr. H. Ahmad Wijaya", userRole: "Pimpinan", aksi: "Disposisi", deskripsi: "Menerbitkan disposisi ke Kabag TU dan Bidang E-Gov", modul: "Disposisi", ipAddress: "192.168.1.12", timestamp: "2026-07-28T10:30:00Z" }
    ]
  },
  {
    id: "sm-002",
    nomorAgenda: "AGD/2026/07/002",
    tanggalTerima: "2026-07-29",
    tanggalSurat: "2026-07-27",
    nomorSurat: "B-450/BSSN/07/2026",
    asalSurat: "Badan Siber dan Sandi Negara (BSSN)",
    perihal: "Pemberitahuan Audit Keamanan Siber & Penetration Testing Portal Daerah",
    ringkasan: "Pelaksanaan audit keamanan informasi terjadwal pada infrastruktur pelaporan publik daerah.",
    sifatSurat: "Sangat Rahasia",
    klasifikasiId: "kls-5",
    klasifikasiKode: "060/EDR",
    lampiranCount: 1,
    status: "Proses",
    petugasInput: "Siti Rahmawati, A.Md.",
    disposisiCount: 1,
    tags: ["BSSN", "Siber", "Audit"],
    created_at: "2026-07-29T11:00:00Z",
    historyLog: [
      { id: "hl-3", userId: "usr-operator", userNama: "Siti Rahmawati", userRole: "Operator", aksi: "Tambah", deskripsi: "Input Surat Masuk dari BSSN", modul: "Surat Masuk", ipAddress: "192.168.1.10", timestamp: "2026-07-29T11:00:00Z" }
    ]
  },
  {
    id: "sm-003",
    nomorAgenda: "AGD/2026/07/003",
    tanggalTerima: "2026-07-30",
    tanggalSurat: "2026-07-29",
    nomorSurat: "020/88/BAPPEDA/2026",
    asalSurat: "Bappeda Kota Administrasi Digital",
    perihal: "Permohonan Data Terintegrasi untuk Penyusunan Rencana Kerja Pemerintah Daerah (RKPD) 2027",
    ringkasan: "Permohonan pengiriman data statistik sektoral dan capaian indikator utama Kominfo.",
    sifatSurat: "Biasa",
    klasifikasiId: "kls-6",
    klasifikasiKode: "000/PMH",
    lampiranCount: 0,
    status: "Diterima",
    petugasInput: "Siti Rahmawati, A.Md.",
    disposisiCount: 0,
    tags: ["Bappeda", "RKPD", "Data"],
    created_at: "2026-07-30T08:20:00Z",
    historyLog: []
  }
];

export const initialSuratKeluar: SuratKeluar[] = [
  {
    id: "sk-001",
    nomorSurat: "001/005/UND/DISKOMINFO/VII/2026",
    tanggal: "2026-07-30",
    tujuan: "Seluruh Kepala Organisasi Perangkat Daerah (OPD) Kota Digital",
    alamatTujuan: "Di Tempat",
    perihal: "Undangan Sosialisasi Penerapan Sertifikat Elektronik & Tanda Tangan Digital BSSN",
    isiSurat: "<p>Dalam rangka meningkatkan efisiensi administrasi pemerintahan dan keamanan dokumen dinas, kami menghimbau kehadiran Bapak/Ibu/Saudara pada kegiatan sosialisasi yang akan diselenggarakan pada:</p><table style='width:100%; margin: 10px 0;'><tr><td style='width: 150px;'><b>Hari/Tanggal</b></td><td>: Senin, 3 Agustus 2026</td></tr><tr><td><b>Waktu</b></td><td>: 08.30 WIB - Selesai</td></tr><tr><td><b>Tempat</b></td><td>: Aula Utama Gedung Teleconference Kominfo Lt. 4</td></tr><tr><td><b>Agenda</b></td><td>: Sosialisasi & Bimbingan Teknis e-Sign BSSN</td></tr></table><p>Demikian surat undangan ini kami sampaikan, atas perhatian dan kehadirannya diucapkan terima kasih.</p>",
    lampiranText: "1 (satu) Berkas Rundown Kegiatan",
    klasifikasiId: "kls-1",
    klasifikasiKode: "005/UND",
    jenisSurat: "Undangan Resmi",
    penandatanganId: "ttd-1",
    penandatanganNama: "Dr. H. Ahmad Wijaya, M.Si.",
    penandatanganNip: "19820315 200801 1 002",
    penandatanganJabatan: "Kepala Dinas Komunikasi dan Informatika",
    status: "Disetujui",
    currentApprovalStage: "Final",
    approvalHistory: [
      { id: "ah-1", stage: "Operator", actorNama: "Siti Rahmawati", actorRole: "Operator", action: "Submit", catatan: "Draft awal dibuat", timestamp: "2026-07-30T09:00:00Z" },
      { id: "ah-2", stage: "Kepala Bagian", actorNama: "Drs. Bambang Hermawan", actorRole: "Kepala Bagian", action: "Approve", catatan: "Disetujui, diteruskan ke Sekretaris", timestamp: "2026-07-30T10:15:00Z" },
      { id: "ah-3", stage: "Sekretaris", actorNama: "Anisa Nuraini", actorRole: "Sekretaris", action: "Approve", catatan: "Naskah sesuai kaidah tata naskah dinas", timestamp: "2026-07-30T11:00:00Z" },
      { id: "ah-4", stage: "Pimpinan", actorNama: "Dr. H. Ahmad Wijaya", actorRole: "Pimpinan", action: "Approve", catatan: "Disetujui dan ditandatangani digital", timestamp: "2026-07-30T13:45:00Z" }
    ],
    ttdDigitalApplied: true,
    qrCodeUrl: "QR-VERIFY-001/005/UND/DISKOMINFO/VII/2026",
    created_by: "Siti Rahmawati",
    created_at: "2026-07-30T09:00:00Z",
    tags: ["Sosialisasi", "Tanda Tangan Digital", "OPD"]
  },
  {
    id: "sk-002",
    nomorSurat: "002/800/STG/DISKOMINFO/VII/2026",
    tanggal: "2026-07-31",
    tujuan: "Budi Santoso, S.Kom., M.T. & Team",
    alamatTujuan: "Jakarta",
    perihal: "Surat Tugas Pendampingan Penilaian Evaluasi Mandiri SPBE Nasional",
    isiSurat: "<p>Pimpinan Dinas Komunikasi dan Informatika memberikan tugas kepada pegawai yang namanya tercantum dalam lampiran untuk melaksanakan Perjalanan Dinas Jabatan dalam rangka Koordinasi SPBE Nasional di Kementerian PANRB Jakarta pada tanggal 2 - 4 Agustus 2026.</p>",
    lampiranText: "1 Lampiran Daftar Nama",
    klasifikasiId: "kls-2",
    klasifikasiKode: "800/STG",
    jenisSurat: "Surat Tugas",
    penandatanganId: "ttd-1",
    penandatanganNama: "Dr. H. Ahmad Wijaya, M.Si.",
    penandatanganNip: "19820315 200801 1 002",
    penandatanganJabatan: "Kepala Dinas Komunikasi dan Informatika",
    status: "Review",
    currentApprovalStage: "Sekretaris",
    approvalHistory: [
      { id: "ah-10", stage: "Operator", actorNama: "Siti Rahmawati", actorRole: "Operator", action: "Submit", catatan: "Pengajuan surat tugas dinas luar", timestamp: "2026-07-31T08:00:00Z" },
      { id: "ah-11", stage: "Kepala Bagian", actorNama: "Drs. Bambang Hermawan", actorRole: "Kepala Bagian", action: "Approve", catatan: "Disetujui kabag", timestamp: "2026-07-31T08:30:00Z" }
    ],
    ttdDigitalApplied: false,
    created_by: "Siti Rahmawati",
    created_at: "2026-07-31T08:00:00Z",
    tags: ["Surat Tugas", "SPBE", "KemenPANRB"]
  }
];

export const initialDisposisi: Disposisi[] = [
  {
    id: "dsp-001",
    suratMasukId: "sm-001",
    nomorSurat: "005/124/SETDA/2026",
    perihal: "Undangan Rapat Koordinasi Nasional E-Government & SPBE",
    pengirimId: "usr-pimpinan",
    pengirimNama: "Dr. H. Ahmad Wijaya, M.Si. (Pimpinan)",
    penerimaId: "unit-3",
    penerimaNama: "Bidang Layanan E-Government",
    penerimaUnit: "E-GOV",
    instruksi: "Tindak Lanjuti & Siapkan Baha Rapat",
    catatanTambahan: "Wakili pimpinan bersama Tim Teknis SPBE, siapkan bahan paparan indikator 2.1 - 2.4.",
    prioritas: "Sangat Segera",
    deadline: "2026-08-01",
    tanggalDisposisi: "2026-07-28 10:30",
    status: "Dalam Proses"
  },
  {
    id: "dsp-002",
    suratMasukId: "sm-001",
    nomorSurat: "005/124/SETDA/2026",
    perihal: "Undangan Rapat Koordinasi Nasional E-Government & SPBE",
    pengirimId: "usr-pimpinan",
    pengirimNama: "Dr. H. Ahmad Wijaya, M.Si. (Pimpinan)",
    penerimaId: "unit-2",
    penerimaNama: "Bagian Tata Usaha & Hukum",
    penerimaUnit: "TU-HUKUM",
    instruksi: "Koordinasikan & Fasilitasi Perjalanan Dinas",
    catatanTambahan: "Siapkan Surat Tugas dan Anggaran Perjalanan Dinas terkait.",
    prioritas: "Penting",
    deadline: "2026-07-31",
    tanggalDisposisi: "2026-07-28 10:35",
    status: "Selesai",
    balasanDisposisi: "Surat Tugas telah diterbitkan (Nomor: 002/800/STG/DISKOMINFO/VII/2026)",
    tanggalSelesai: "2026-07-31 08:30"
  }
];

export const initialTemplates: TemplateSurat[] = [
  {
    id: "tmpl-undangan",
    kode: "TPL-UND",
    namaTemplate: "Template Surat Undangan Resmi",
    jenisSurat: "Undangan Resmi",
    deskripsi: "Template standar untuk rapat, sosialisasi, dan forum resmi",
    subjekDefault: "Undangan {ACARA_NAMA}",
    placeholders: ["{TANGGAL_SURAT}", "{TUJUAN_NAMA}", "{ALAMAT_TUJUAN}", "{NAMA_ACARA}", "{HARI_TANGGAL_ACARA}", "{WAKTU_ACARA}", "{TEMPAT_ACARA}", "{AGENDA}"],
    kontenHtml: `<p>Dengan hormat,</p>
<p>Sehubungan dengan pelaksanaan program kerja dinas, kami mengundang Bapak/Ibu/Saudara untuk hadir pada kegiatan yang akan diselenggarakan pada:</p>
<table style="width:100%; border-collapse: collapse; margin: 12px 0;">
  <tr><td style="width: 160px; padding: 4px 0;"><b>Hari / Tanggal</b></td><td>: {HARI_TANGGAL_ACARA}</td></tr>
  <tr><td style="padding: 4px 0;"><b>Waktu</b></td><td>: {WAKTU_ACARA} WIB - Selesai</td></tr>
  <tr><td style="padding: 4px 0;"><b>Tempat</b></td><td>: {TEMPAT_ACARA}</td></tr>
  <tr><td style="padding: 4px 0;"><b>Agenda Rapat</b></td><td>: {AGENDA}</td></tr>
</table>
<p>Mengingat pentingnya agenda tersebut, kehadiran Bapak/Ibu/Saudara tepat pada waktunya sangat kami harapkan.</p>
<p>Demikian surat undangan ini disampaikan, atas perhatian dan kerjasamanya diucapkan terima kasih.</p>`
  },
  {
    id: "tmpl-tugas",
    kode: "TPL-STG",
    namaTemplate: "Template Surat Tugas Dinas",
    jenisSurat: "Surat Tugas",
    deskripsi: "Template penugasan pegawai perjalanan dinas / bimtek",
    subjekDefault: "Surat Tugas {KEGIATAN}",
    placeholders: ["{TANGGAL_SURAT}", "{NAMA_PEGAWAI}", "{NIP_PEGAWAI}", "{JABATAN_PEGAWAI}", "{NAMA_KEGIATAN}", "{LOKASI_TUGAS}", "{TANGGAL_TUGAS}"],
    kontenHtml: `<p style="text-align:center;"><b>SURAT TUGAS</b><br/>Nomor: {NOMOR_SURAT}</p>
<p>Yang bertanda tangan di bawah ini:</p>
<table style="width:100%; margin-left: 20px;">
  <tr><td style="width:140px;">Nama</td><td>: {NAMA_PIMPINAN}</td></tr>
  <tr><td>NIP</td><td>: {NIP_PIMPINAN}</td></tr>
  <tr><td>Jabatan</td><td>: {JABATAN_PIMPINAN}</td></tr>
</table>
<p>Memberi tugas kepada:</p>
<table style="width:100%; margin-left: 20px;">
  <tr><td style="width:140px;">Nama</td><td>: {NAMA_PEGAWAI}</td></tr>
  <tr><td>NIP</td><td>: {NIP_PEGAWAI}</td></tr>
  <tr><td>Jabatan</td><td>: {JABATAN_PEGAWAI}</td></tr>
</table>
<p>Untuk melaksanakan tugas dalam rangka: <b>{NAMA_KEGIATAN}</b> yang dilaksanakan di {LOKASI_TUGAS} pada tanggal {TANGGAL_TUGAS}.</p>
<p>Demikian Surat Tugas ini diterbitkan untuk dilaksanakan dengan penuh tanggung jawab.</p>`
  },
  {
    id: "tmpl-keterangan",
    kode: "TPL-KET",
    namaTemplate: "Template Surat Keterangan",
    jenisSurat: "Surat Keterangan",
    deskripsi: "Template surat keterangan dinas atau aktif pegawai",
    subjekDefault: "Surat Keterangan {PERIHAL}",
    placeholders: ["{NOMOR_SURAT}", "{NAMA_PEGAWAI}", "{NIP_PEGAWAI}", "{JABATAN_PEGAWAI}", "{KETERANGAN_ISI}"],
    kontenHtml: `<p style="text-align:center;"><b>SURAT KETERANGAN</b><br/>Nomor: {NOMOR_SURAT}</p>
<p>Yang bertanda tangan di bawah ini menerangkan bahwa:</p>
<table style="width:100%; margin: 10px 20px;">
  <tr><td style="width:140px;">Nama</td><td>: {NAMA_PEGAWAI}</td></tr>
  <tr><td>NIP</td><td>: {NIP_PEGAWAI}</td></tr>
  <tr><td>Jabatan</td><td>: {JABATAN_PEGAWAI}</td></tr>
</table>
<p>{KETERANGAN_ISI}</p>
<p>Demikian surat keterangan ini dibuat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.</p>`
  },
  {
    id: "tmpl-edaran",
    kode: "TPL-EDR",
    namaTemplate: "Template Surat Edaran Resmi",
    jenisSurat: "Surat Edaran",
    deskripsi: "Himbauan dan arahan pimpinan kepada seluruh unit kerja",
    subjekDefault: "Surat Edaran Tentang {PERIHAL}",
    placeholders: ["{NOMOR_SURAT}", "{PERIHAL_EDARAN}", "{TANGGAL_SURAT}", "{POIN_HIMBAUAN}"],
    kontenHtml: `<p style="text-align:center;"><b>SURAT EDARAN</b><br/>Nomor: {NOMOR_SURAT}<br/>TENTANG<br/><b>{PERIHAL_EDARAN}</b></p>
<p>Dalam rangka memelihara ketertiban dan kelancaran pelaksanaan tugas kedinasan, dengan ini disampaikan arahan sebagai berikut:</p>
<div style="margin-left: 20px;">
  {POIN_HIMBAUAN}
</div>
<p>Demikian surat edaran ini untuk dipatuhi dan dilaksanakan dengan sebaik-baiknya.</p>`
  }
];

export const initialHistoryLogs: HistoryLog[] = [
  { id: "log-1", userId: "usr-admin", userNama: "Budi Santoso", userRole: "Administrator", aksi: "Login", deskripsi: "User berhasil masuk ke sistem e-Surat Digital", modul: "Autentikasi", ipAddress: "192.168.1.100", timestamp: "2026-07-31T08:00:00Z" },
  { id: "log-2", userId: "usr-operator", userNama: "Siti Rahmawati", userRole: "Operator", aksi: "Tambah", deskripsi: "Membuat draft Surat Keluar 002/800/STG/DISKOMINFO/VII/2026", modul: "Surat Keluar", ipAddress: "192.168.1.105", timestamp: "2026-07-31T08:15:00Z" },
  { id: "log-3", userId: "usr-pimpinan", userNama: "Dr. H. Ahmad Wijaya", userRole: "Pimpinan", aksi: "Approval", deskripsi: "Menerbitkan Persetujuan Final & TTD Digital Surat 001/005/UND/DISKOMINFO/VII/2026", modul: "Persetujuan", ipAddress: "192.168.1.110", timestamp: "2026-07-30T13:45:00Z" }
];

export const initialConfig: SystemConfig = {
  namaAplikasi: "e-Surat Digital",
  modeGelap: false,
  bahasa: "Bahasa Indonesia",
  timeZone: "Asia/Jakarta (WIB)",
  smtpHost: "mail.esurat.go.id",
  smtpPort: 587,
  smtpUser: "notifikasi@esurat.go.id",
  autoSendEmailNotification: true,
  waGatewayUrl: "https://api.whatsapp-gateway.go.id/send",
  waApiKey: "SECRET_WA_KEY_2026",
  autoSendWaNotification: true,
  autoBackupDaily: true,
  nomeratorRule: {
    format: "{URUT}/{KODE_SURAT}/{KODE_INSTANSI}/{BULAN_ROMAWI}/{TAHUN}",
    nextNumber: 3,
    resetYearly: true,
    currentYear: 2026
  }
};
