export type Role = 
  | 'Administrator'
  | 'Operator'
  | 'Sekretaris'
  | 'Kepala Bagian'
  | 'Pimpinan'
  | 'Pegawai'
  | 'Tamu';

export type PriorityLevel = 'Biasa' | 'Penting' | 'Segera' | 'Sangat Segera';

export type SifatSurat = 'Biasa' | 'Penting' | 'Rahasia' | 'Sangat Rahasia';

export type StatusSuratMasuk = 'Diterima' | 'Disposisi' | 'Proses' | 'Selesai' | 'Diarsipkan';

export type StatusSuratKeluar = 'Draft' | 'Review' | 'Disetujui' | 'Ditolak' | 'Terkirim' | 'Diarsipkan';

export type ApprovalStage = 'Operator' | 'Kepala Bagian' | 'Sekretaris' | 'Pimpinan' | 'Final';

export interface User {
  id: string;
  nip: string;
  nama: string;
  jabatan: string;
  unitKerja: string;
  noHp: string;
  email: string;
  foto?: string;
  role: Role;
  status: 'Aktif' | 'Nonaktif';
  password?: string;
  pin?: string;
  ttdDigital?: string;
}

export interface MasterInstansi {
  nama: string;
  namaYayasan?: string;
  barisAtasHeader?: string;
  logo: string;
  logoKanan?: string;
  logoSize?: number;
  alamat: string;
  telepon: string;
  email: string;
  website: string;
  kodePos: string;
  namaPimpinan: string;
  nipPimpinan: string;
  jabatanPimpinan: string;
  kodeInstansi: string;
  kopGarisGanda: boolean;
  kopGarisStyle?: 'double' | 'single_thick' | 'dashed' | 'none';
  kopSubHeader?: string;
  footerText?: string;
  stempelDigital?: string;
  ttdDigitalPimpinan?: string;

  // Formatting & Alignment Controls for Kop Text
  kopAlign?: 'center' | 'left' | 'right';
  fontFamilyHeader?: 'Times New Roman' | 'Arial' | 'Calibri' | 'Georgia' | 'Courier New';
  
  // Baris 1: Header Atas (Instansi Induk)
  barisAtasSize?: number;
  barisAtasBold?: boolean;
  barisAtasUppercase?: boolean;

  // Baris 2: Nama Instansi Utama
  namaInstansiSize?: number;
  namaInstansiBold?: boolean;
  namaInstansiUppercase?: boolean;

  // Baris 3: Sub Header / Unit Kerja
  subHeaderSize?: number;
  subHeaderBold?: boolean;
  subHeaderUppercase?: boolean;

  // Baris 4: Alamat Lengkap
  alamatSize?: number;
  alamatItalic?: boolean;

  // Baris 5: Kontak & Informasi
  kontakSize?: number;
  kontakItalic?: boolean;
}

export interface MasterJabatan {
  id: string;
  kodeJabatan: string;
  namaJabatan: string;
  tingkatEselon: string;
  deskripsi?: string;
}

export interface MasterUnitKerja {
  id: string;
  kodeUnit: string;
  namaUnit: string;
  singkatan?: string;
  kepalaUnit: string;
  emailUnit?: string;
}

export interface MasterKlasifikasi {
  id: string;
  kodeKlasifikasi: string;
  namaKlasifikasi: string;
  keterangan?: string;
  retensiTahun?: number;
  hakAksesMin?: Role;
}

export interface MasterPenandatangan {
  id: string;
  nama: string;
  nip: string;
  jabatan: string;
  pangkatGolongan?: string;
  unitKerja?: string;
  ttdImage?: string;
  qrVerificationCode?: string;
  statusAktif: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  linkTab?: string;
}

export interface Disposisi {
  id: string;
  suratMasukId: string;
  nomorSurat: string;
  perihal: string;
  pengirimId: string;
  pengirimNama: string;
  penerimaId: string; // Pegawai or Unit Kerja ID
  penerimaNama: string;
  penerimaUnit?: string;
  instruksi: string; // e.g., "Tindak Lanjuti", "Pelajari & Laporkan", "Wakili", "Koordinasikan"
  catatanTambahan?: string;
  prioritas: PriorityLevel;
  deadline: string;
  tanggalDisposisi: string;
  status: 'Menunggu' | 'Dalam Proses' | 'Selesai';
  balasanDisposisi?: string;
  tanggalSelesai?: string;
}

export interface SuratMasuk {
  id: string;
  nomorAgenda: string;
  tanggalTerima: string;
  tanggalSurat: string;
  nomorSurat: string;
  asalSurat: string;
  perihal: string;
  ringkasan: string;
  sifatSurat: SifatSurat;
  klasifikasiId: string;
  klasifikasiKode: string;
  lampiranCount: number;
  filePdfUrl?: string; // Data URL or reference
  status: StatusSuratMasuk;
  petugasInput: string;
  disposisiCount: number;
  tags?: string[];
  created_at: string;
  historyLog: HistoryLog[];
}

export interface ApprovalHistory {
  id: string;
  stage: ApprovalStage;
  actorNama: string;
  actorRole: Role;
  action: 'Submit' | 'Approve' | 'Reject' | 'Revision';
  catatan?: string;
  timestamp: string;
}

export interface SuratKeluar {
  id: string;
  nomorSurat: string;
  tanggal: string;
  tujuan: string;
  alamatTujuan: string;
  perihal: string;
  isiSurat: string; // HTML/Rich format content
  lampiranText?: string;
  klasifikasiId: string;
  klasifikasiKode: string;
  jenisSurat: string; // Undangan, Edaran, SK, dll
  penandatanganId: string;
  penandatanganNama: string;
  penandatanganNip: string;
  penandatanganJabatan: string;
  status: StatusSuratKeluar;
  currentApprovalStage: ApprovalStage;
  approvalHistory: ApprovalHistory[];
  ttdDigitalApplied: boolean;
  qrCodeUrl?: string;
  filePdfUrl?: string;
  created_by: string;
  created_at: string;
  tags?: string[];
}

export interface TemplateSurat {
  id: string;
  kode: string;
  namaTemplate: string;
  jenisSurat: string;
  deskripsi: string;
  subjekDefault: string;
  kontenHtml: string;
  placeholders: string[]; // e.g. ["{NOMOR_SURAT}", "{NAMA_PENERIMA}", "{TANGGAL}", "{PERIHAL}"]
}

export interface HistoryLog {
  id: string;
  userId: string;
  userNama: string;
  userRole: Role;
  aksi: 'Login' | 'Logout' | 'Tambah' | 'Edit' | 'Hapus' | 'Disposisi' | 'Approval' | 'Export' | 'Cetak' | 'System';
  deskripsi: string;
  modul: string;
  ipAddress: string;
  timestamp: string;
}

export interface NomeratorRule {
  format: string; // e.g. "{URUT}/{KODE_SURAT}/{KODE_INSTANSI}/{BULAN_ROMAWI}/{TAHUN}"
  nextNumber: number;
  resetYearly: boolean;
  currentYear: number;
}

export interface SystemConfig {
  namaAplikasi: string;
  modeGelap: boolean;
  bahasa: string;
  timeZone: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword?: string;
  autoSendEmailNotification: boolean;
  waGatewayUrl: string;
  waApiKey: string;
  autoSendWaNotification: boolean;
  autoBackupDaily: boolean;
  nomeratorRule: NomeratorRule;
}

export interface AppState {
  currentUser: User;
  instansi: MasterInstansi;
  users: User[];
  jabatans: MasterJabatan[];
  unitKerjas: MasterUnitKerja[];
  klasifikasis: MasterKlasifikasi[];
  penandatangans: MasterPenandatangan[];
  suratMasukList: SuratMasuk[];
  suratKeluarList: SuratKeluar[];
  disposisiList: Disposisi[];
  templates: TemplateSurat[];
  historyLogs: HistoryLog[];
  notifications: NotificationItem[];
  activities: HistoryLog[];
  config: SystemConfig;
}
