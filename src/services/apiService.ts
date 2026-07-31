import {
  MasterInstansi,
  User,
  MasterJabatan,
  MasterUnitKerja,
  MasterKlasifikasi,
  MasterPenandatangan,
  SuratMasuk,
  SuratKeluar,
  TemplateSurat,
  Disposisi,
  HistoryLog,
  SystemConfig,
  ApprovalStage,
  NotificationItem
} from '../types';
import {
  initialInstansi,
  initialUsers,
  initialJabatan,
  initialUnitKerja,
  initialKlasifikasi,
  initialPenandatangan,
  initialSuratMasuk,
  initialSuratKeluar,
  initialDisposisi,
  initialTemplates,
  initialHistoryLogs,
  initialConfig
} from '../data/initialData';
import { formatNomorSuratOtomatis } from '../utils/formatter';

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

const STORAGE_KEY = 'esurat_app_state_v1';

export class ApiService {
  private state: AppState;
  private listeners: (() => void)[] = [];

  constructor() {
    this.state = {
      currentUser: initialUsers[0],
      instansi: initialInstansi,
      users: initialUsers,
      jabatans: initialJabatan,
      unitKerjas: initialUnitKerja,
      klasifikasis: initialKlasifikasi,
      penandatangans: initialPenandatangan,
      suratMasukList: initialSuratMasuk,
      suratKeluarList: initialSuratKeluar,
      disposisiList: initialDisposisi,
      templates: initialTemplates,
      historyLogs: initialHistoryLogs,
      activities: initialHistoryLogs,
      notifications: [
        {
          id: 'notif-1',
          title: 'Disposisi Masuk Baru',
          message: 'Pimpinan mendisposisikan surat 005/124/SETDA ke unit kerja Anda.',
          timestamp: new Date().toISOString(),
          isRead: false,
          linkTab: 'disposisi'
        },
        {
          id: 'notif-2',
          title: 'Permohonan Approval Surat Keluar',
          message: 'Surat Tugas Nomor 005/124/UND membutuhkan persetujuan Anda.',
          timestamp: new Date().toISOString(),
          isRead: false,
          linkTab: 'surat-keluar'
        }
      ],
      config: initialConfig
    };

    this.init();
  }

  private async init() {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const data = await res.json();
        if (data && data.users) {
          this.state = { ...this.state, ...data };
          this.notify();
          return;
        }
      }
    } catch (e) {
      console.warn('Backend endpoint unavailable, falling back to localStorage');
    }

    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        this.state = { ...this.state, ...parsed };
      } catch (err) {
        console.error('Failed to parse local storage data', err);
      }
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
    this.saveState();
  }

  private async saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
      }).catch((e) => console.warn('Server sync error', e));
    } catch (err) {
      console.error('Save state error:', err);
    }
  }

  public getState(): AppState {
    return this.state;
  }

  public getDashboardStats() {
    const totalMasuk = this.state.suratMasukList.length;
    const totalKeluar = this.state.suratKeluarList.length;
    const pendingApproval = this.state.suratKeluarList.filter((s) => s.status === 'Review').length;
    const totalDisposisi = this.state.disposisiList.length;

    return {
      totalSuratMasuk: totalMasuk,
      totalSuratKeluar: totalKeluar,
      suratHariIni: 4,
      suratMingguIni: 18,
      suratBulanIni: 42,
      menungguPersetujuan: pendingApproval,
      ditolak: this.state.suratKeluarList.filter((s) => s.status === 'Ditolak').length,
      disposisiAktif: totalDisposisi
    };
  }

  public setCurrentUser(user: User) {
    this.state.currentUser = user;
    this.addLog('Login', `User ${user.nama} (${user.role}) aktif di sistem`, 'Autentikasi');
    this.notify();
  }

  public markAllNotificationsRead() {
    this.state.notifications = this.state.notifications.map((n) => ({ ...n, isRead: true }));
    this.notify();
  }

  public addLog(aksi: HistoryLog['aksi'], deskripsi: string, modul: string) {
    const newLog: HistoryLog = {
      id: `log-${Date.now()}`,
      userId: this.state.currentUser.id,
      userNama: this.state.currentUser.nama,
      userRole: this.state.currentUser.role,
      aksi,
      deskripsi,
      modul,
      ipAddress: '127.0.0.1',
      timestamp: new Date().toISOString()
    };
    this.state.historyLogs = [newLog, ...this.state.historyLogs];
    this.state.activities = [newLog, ...this.state.activities];
  }

  // Master Instansi
  public updateInstansi(updated: Partial<MasterInstansi>) {
    this.state.instansi = { ...this.state.instansi, ...updated };
    this.addLog('Edit', 'Memperbarui data Master Instansi & Kop Surat', 'Master Instansi');
    this.notify();
  }

  // Users / Pegawai
  public saveUser(pegawai: User) {
    const exists = this.state.users.find((u) => u.id === pegawai.id);
    if (exists) {
      this.state.users = this.state.users.map((u) => (u.id === pegawai.id ? pegawai : u));
      this.addLog('Edit', `Memperbarui data pegawai ${pegawai.nama}`, 'Master Pegawai');
    } else {
      this.state.users.push(pegawai);
      this.addLog('Tambah', `Menambahkan pegawai baru ${pegawai.nama}`, 'Master Pegawai');
    }
    this.notify();
  }

  public deleteUser(id: string) {
    const p = this.state.users.find((u) => u.id === id);
    this.state.users = this.state.users.filter((u) => u.id !== id);
    this.addLog('Hapus', `Menghapus pegawai ${p?.nama || id}`, 'Master Pegawai');
    this.notify();
  }

  // Jabatan & Unit Kerja
  public saveJabatan(item: MasterJabatan) {
    const idx = this.state.jabatans.findIndex((j) => j.id === item.id);
    if (idx >= 0) this.state.jabatans[idx] = item;
    else this.state.jabatans.push(item);
    this.addLog('Edit', `Mengubah/Menambah Master Jabatan ${item.namaJabatan}`, 'Master Jabatan');
    this.notify();
  }

  public deleteJabatan(id: string) {
    this.state.jabatans = this.state.jabatans.filter((j) => j.id !== id);
    this.notify();
  }

  public saveUnitKerja(item: MasterUnitKerja) {
    const idx = this.state.unitKerjas.findIndex((u) => u.id === item.id);
    if (idx >= 0) this.state.unitKerjas[idx] = item;
    else this.state.unitKerjas.push(item);
    this.addLog('Edit', `Mengubah/Menambah Master Unit Kerja ${item.namaUnit}`, 'Master Unit Kerja');
    this.notify();
  }

  public deleteUnitKerja(id: string) {
    this.state.unitKerjas = this.state.unitKerjas.filter((u) => u.id !== id);
    this.notify();
  }

  // Klasifikasi Surat
  public saveKlasifikasi(item: MasterKlasifikasi) {
    const idx = this.state.klasifikasis.findIndex((k) => k.id === item.id);
    if (idx >= 0) this.state.klasifikasis[idx] = item;
    else this.state.klasifikasis.push(item);
    this.notify();
  }

  public deleteKlasifikasi(id: string) {
    this.state.klasifikasis = this.state.klasifikasis.filter((k) => k.id !== id);
    this.notify();
  }

  // Penandatangan
  public savePenandatangan(item: MasterPenandatangan) {
    const idx = this.state.penandatangans.findIndex((p) => p.id === item.id);
    if (idx >= 0) this.state.penandatangans[idx] = item;
    else this.state.penandatangans.push(item);
    this.notify();
  }

  public deletePenandatangan(id: string) {
    this.state.penandatangans = this.state.penandatangans.filter((p) => p.id !== id);
    this.notify();
  }

  // Surat Masuk
  public saveSuratMasuk(item: SuratMasuk) {
    const idx = this.state.suratMasukList.findIndex((s) => s.id === item.id);
    if (idx >= 0) {
      this.state.suratMasukList[idx] = item;
      this.addLog('Edit', `Mengubah Surat Masuk ${item.nomorSurat}`, 'Surat Masuk');
    } else {
      this.state.suratMasukList = [item, ...this.state.suratMasukList];
      this.addLog('Tambah', `Mencatat Surat Masuk baru ${item.nomorSurat}`, 'Surat Masuk');
    }
    this.notify();
  }

  public deleteSuratMasuk(id: string) {
    const s = this.state.suratMasukList.find((item) => item.id === id);
    this.state.suratMasukList = this.state.suratMasukList.filter((item) => item.id !== id);
    this.addLog('Hapus', `Menghapus Surat Masuk ${s?.nomorSurat || id}`, 'Surat Masuk');
    this.notify();
  }

  // Surat Keluar & Numbering
  public generateNomorSuratKeluar(klasifikasiKode: string): string {
    const rule = this.state.config.nomeratorRule;
    const nextNum = rule.nextNumber;
    return formatNomorSuratOtomatis(
      nextNum,
      klasifikasiKode,
      this.state.instansi.kodeInstansi,
      new Date(),
      rule.format
    );
  }

  public saveSuratKeluar(item: SuratKeluar) {
    const idx = this.state.suratKeluarList.findIndex((s) => s.id === item.id);
    if (idx >= 0) {
      this.state.suratKeluarList[idx] = item;
      this.addLog('Edit', `Memperbarui Surat Keluar ${item.nomorSurat}`, 'Surat Keluar');
    } else {
      this.state.suratKeluarList = [item, ...this.state.suratKeluarList];
      this.state.config.nomeratorRule.nextNumber += 1;
      this.addLog('Tambah', `Membuat Surat Keluar baru ${item.nomorSurat}`, 'Surat Keluar');
    }
    this.notify();
  }

  public deleteSuratKeluar(id: string) {
    const s = this.state.suratKeluarList.find((item) => item.id === id);
    this.state.suratKeluarList = this.state.suratKeluarList.filter((item) => item.id !== id);
    this.addLog('Hapus', `Menghapus Surat Keluar ${s?.nomorSurat || id}`, 'Surat Keluar');
    this.notify();
  }

  // Approval Process Workflow
  public processApproval(
    suratKeluarId: string,
    action: 'Approve' | 'Reject' | 'Revision',
    actorUser: User,
    catatan?: string
  ) {
    const surat = this.state.suratKeluarList.find((s) => s.id === suratKeluarId);
    if (!surat) return;

    const user = actorUser || this.state.currentUser;
    const currentStage = surat.currentApprovalStage;

    let nextStage: ApprovalStage = currentStage;
    let newStatus = surat.status;

    if (action === 'Approve') {
      if (currentStage === 'Operator') nextStage = 'Kepala Bagian';
      else if (currentStage === 'Kepala Bagian') nextStage = 'Sekretaris';
      else if (currentStage === 'Sekretaris') nextStage = 'Pimpinan';
      else if (currentStage === 'Pimpinan') {
        nextStage = 'Final';
        newStatus = 'Disetujui';
        surat.ttdDigitalApplied = true;
        surat.qrCodeUrl = `QR-VERIFY-${surat.nomorSurat}`;
      }
    } else if (action === 'Reject') {
      newStatus = 'Ditolak';
    } else if (action === 'Revision') {
      nextStage = 'Operator';
      newStatus = 'Draft';
    }

    surat.currentApprovalStage = nextStage;
    surat.status = newStatus;

    const historyEntry = {
      id: `ah-${Date.now()}`,
      stage: currentStage,
      actorNama: user.nama,
      actorRole: user.role,
      action,
      catatan,
      timestamp: new Date().toISOString()
    };

    surat.approvalHistory.push(historyEntry);
    this.addLog('Approval', `${action} Surat Keluar ${surat.nomorSurat} oleh ${user.nama}`, 'Persetujuan');
    this.notify();
  }

  // Disposisi
  public saveDisposisi(item: Disposisi) {
    const idx = this.state.disposisiList.findIndex((d) => d.id === item.id);
    if (idx >= 0) {
      this.state.disposisiList[idx] = item;
    } else {
      this.state.disposisiList = [item, ...this.state.disposisiList];
      const sm = this.state.suratMasukList.find((s) => s.id === item.suratMasukId);
      if (sm) {
        sm.disposisiCount += 1;
        sm.status = 'Disposisi';
      }
      this.addLog('Disposisi', `Mengirim Disposisi ke ${item.penerimaNama} (${item.instruksi})`, 'Disposisi');
    }
    this.notify();
  }

  public completeDisposisi(id: string, balasan: string) {
    const d = this.state.disposisiList.find((item) => item.id === id);
    if (d) {
      d.status = 'Selesai';
      d.balasanDisposisi = balasan;
      d.tanggalSelesai = new Date().toISOString();
      this.addLog('Disposisi', `Menyelesaikan Disposisi ${d.nomorSurat}`, 'Disposisi');
      this.notify();
    }
  }

  // Templates
  public saveTemplate(template: TemplateSurat) {
    const idx = this.state.templates.findIndex((t) => t.id === template.id);
    if (idx >= 0) this.state.templates[idx] = template;
    else this.state.templates.push(template);
    this.notify();
  }

  // System Config
  public updateSystemConfig(newConfig: Partial<SystemConfig>) {
    this.state.config = { ...this.state.config, ...newConfig };
    this.addLog('System', 'Memperbarui Pengaturan Sistem & Nomerator', 'Pengaturan');
    this.notify();
  }
}

export const apiService = new ApiService();
