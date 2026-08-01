import React, { useState, useEffect } from 'react';
import { apiService } from './services/apiService';
import { AppState, User, SuratMasuk, SuratKeluar } from './types';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';

// Views
import { DashboardView } from './components/dashboard/DashboardView';
import { SuratMasukList } from './components/surat-masuk/SuratMasukList';
import { SuratMasukModal } from './components/surat-masuk/SuratMasukModal';
import { SuratKeluarList } from './components/surat-keluar/SuratKeluarList';
import { SuratKeluarModal } from './components/surat-keluar/SuratKeluarModal';
import { SuratApprovalModal } from './components/surat-keluar/SuratApprovalModal';
import { DisposisiList } from './components/disposisi/DisposisiList';
import { DisposisiModal } from './components/disposisi/DisposisiModal';
import { TemplateEditor } from './components/templates/TemplateEditor';
import { MasterInstansiView } from './components/master/MasterInstansi';
import { MasterPegawaiView } from './components/master/MasterPegawai';
import { MasterJabatanUnitView } from './components/master/MasterJabatanUnit';
import { MasterKlasifikasiView } from './components/master/MasterKlasifikasi';
import { MasterPenandatanganView } from './components/master/MasterPenandatangan';
import { ArsipDigitalView } from './components/arsip/ArsipDigital';
import { LaporanRekapView } from './components/laporan/LaporanRekap';
import { SystemSettingsView } from './components/settings/SystemSettings';
import { QRVerifyModal } from './components/common/QRVerifyModal';

export default function App() {
  const [appState, setAppState] = useState<AppState>(apiService.getState());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Modals state
  const [suratMasukModalOpen, setSuratMasukModalOpen] = useState(false);
  const [editingSuratMasuk, setEditingSuratMasuk] = useState<SuratMasuk | null>(null);

  const [suratKeluarModalOpen, setSuratKeluarModalOpen] = useState(false);
  const [editingSuratKeluar, setEditingSuratKeluar] = useState<SuratKeluar | null>(null);

  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [activeApprovalSurat, setActiveApprovalSurat] = useState<SuratKeluar | null>(null);

  const [disposisiModalOpen, setDisposisiModalOpen] = useState(false);
  const [preselectedDisposisiSurat, setPreselectedDisposisiSurat] = useState<SuratMasuk | null>(null);

  const [qrModalOpen, setQrModalOpen] = useState(false);

  // Subscribe to apiService state updates
  useEffect(() => {
    const unsubscribe = apiService.subscribe(() => {
      setAppState({ ...apiService.getState() });
    });
    return () => unsubscribe();
  }, []);

  const handleSwitchUser = (user: User) => {
    apiService.setCurrentUser(user);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Top Navigation Bar */}
      <Navbar
        currentUser={appState.currentUser}
        users={appState.users}
        onSwitchUser={handleSwitchUser}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notifications={appState.notifications}
        onMarkAllNotificationsRead={() => apiService.markAllNotificationsRead()}
        onOpenQRVerify={() => setQrModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentUser={appState.currentUser}
          counts={{
            suratMasuk: appState.suratMasukList.length,
            suratKeluarPending: appState.suratKeluarList.filter((s) => s.status === 'Review').length,
            disposisiActive: appState.disposisiList.filter((d) => d.status === 'Dalam Proses' || d.status === 'Menunggu').length,
          }}
        />

        {/* Main Content Workspace Area */}
        <main className="flex-1 overflow-y-auto w-full min-w-0">
          
          {activeTab === 'dashboard' && (
            <DashboardView
              state={appState}
              onSelectTab={setActiveTab}
              onOpenQRVerify={() => setQrModalOpen(true)}
              onOpenCreateSuratMasuk={() => {
                setEditingSuratMasuk(null);
                setSuratMasukModalOpen(true);
              }}
              onOpenCreateSuratKeluar={() => {
                setEditingSuratKeluar(null);
                setSuratKeluarModalOpen(true);
              }}
            />
          )}

          {activeTab === 'surat-masuk' && (
            <div className="p-8">
              <SuratMasukList
                suratMasukList={appState.suratMasukList}
                instansi={appState.instansi}
                klasifikasis={appState.klasifikasis}
                currentUser={appState.currentUser}
                onOpenCreate={() => {
                  setEditingSuratMasuk(null);
                  setSuratMasukModalOpen(true);
                }}
                onEdit={(sm) => {
                  setEditingSuratMasuk(sm);
                  setSuratMasukModalOpen(true);
                }}
                onDelete={(id) => apiService.deleteSuratMasuk(id)}
                onOpenDisposisiModal={(sm) => {
                  setPreselectedDisposisiSurat(sm);
                  setDisposisiModalOpen(true);
                }}
              />
            </div>
          )}

          {activeTab === 'surat-keluar' && (
            <div className="p-8">
              <SuratKeluarList
                suratKeluarList={appState.suratKeluarList}
                instansi={appState.instansi}
                klasifikasis={appState.klasifikasis}
                currentUser={appState.currentUser}
                onOpenCreate={() => {
                  setEditingSuratKeluar(null);
                  setSuratKeluarModalOpen(true);
                }}
                onEdit={(sk) => {
                  setEditingSuratKeluar(sk);
                  setSuratKeluarModalOpen(true);
                }}
                onDelete={(id) => apiService.deleteSuratKeluar(id)}
                onOpenApprovalModal={(sk) => {
                  setActiveApprovalSurat(sk);
                  setApprovalModalOpen(true);
                }}
              />
            </div>
          )}

          {activeTab === 'disposisi' && (
            <div className="p-8">
              <DisposisiList
                disposisiList={appState.disposisiList}
                currentUser={appState.currentUser}
                onOpenCreate={() => {
                  setPreselectedDisposisiSurat(null);
                  setDisposisiModalOpen(true);
                }}
                onCompleteDisposisi={(id, balasan) => apiService.completeDisposisi(id, balasan)}
              />
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="p-8">
              <TemplateEditor
                templates={appState.templates}
                onSaveTemplate={(tmpl) => apiService.saveTemplate(tmpl)}
              />
            </div>
          )}

          {activeTab === 'instansi' && (
            <div className="p-8">
              <MasterInstansiView
                instansi={appState.instansi}
                onSave={(instData) => apiService.updateInstansi(instData)}
              />
            </div>
          )}

          {activeTab === 'pegawai' && (
            <div className="p-8">
              <MasterPegawaiView
                users={appState.users}
                unitKerjas={appState.unitKerjas}
                jabatans={appState.jabatans}
                onSaveUser={(usr) => apiService.saveUser(usr)}
                onDeleteUser={(id) => apiService.deleteUser(id)}
              />
            </div>
          )}

          {activeTab === 'jabatan-unit' && (
            <div className="p-8">
              <MasterJabatanUnitView
                jabatans={appState.jabatans}
                unitKerjas={appState.unitKerjas}
                onSaveJabatan={(jab) => apiService.saveJabatan(jab)}
                onDeleteJabatan={(id) => apiService.deleteJabatan(id)}
                onSaveUnit={(unit) => apiService.saveUnitKerja(unit)}
                onDeleteUnit={(id) => apiService.deleteUnitKerja(id)}
              />
            </div>
          )}

          {activeTab === 'klasifikasi' && (
            <div className="p-8">
              <MasterKlasifikasiView
                klasifikasis={appState.klasifikasis}
                onSave={(kls) => apiService.saveKlasifikasi(kls)}
                onDelete={(id) => apiService.deleteKlasifikasi(id)}
              />
            </div>
          )}

          {activeTab === 'penandatangan' && (
            <div className="p-8">
              <MasterPenandatanganView
                penandatangans={appState.penandatangans}
                onSave={(p) => apiService.savePenandatangan(p)}
                onDelete={(id) => apiService.deletePenandatangan(id)}
              />
            </div>
          )}

          {activeTab === 'arsip' && (
            <div className="p-8">
              <ArsipDigitalView
                suratMasukList={appState.suratMasukList}
                suratKeluarList={appState.suratKeluarList}
              />
            </div>
          )}

          {activeTab === 'laporan' && (
            <div className="p-8">
              <LaporanRekapView
                suratMasukList={appState.suratMasukList}
                suratKeluarList={appState.suratKeluarList}
                disposisiList={appState.disposisiList}
              />
            </div>
          )}

          {activeTab === 'pengaturan' && (
            <div className="p-8">
              <SystemSettingsView
                config={appState.config}
                onSaveConfig={(cfg) => apiService.updateSystemConfig(cfg)}
              />
            </div>
          )}

        </main>
      </div>

      {/* Global Modals */}

      {/* Surat Masuk Modal */}
      <SuratMasukModal
        isOpen={suratMasukModalOpen}
        onClose={() => setSuratMasukModalOpen(false)}
        onSave={(sm) => apiService.saveSuratMasuk(sm)}
        klasifikasis={appState.klasifikasis}
        petugasNama={appState.currentUser.nama}
        initialData={editingSuratMasuk}
      />

      {/* Surat Keluar Modal */}
      <SuratKeluarModal
        isOpen={suratKeluarModalOpen}
        onClose={() => setSuratKeluarModalOpen(false)}
        onSave={(sk) => apiService.saveSuratKeluar(sk)}
        klasifikasis={appState.klasifikasis}
        penandatangans={appState.penandatangans}
        templates={appState.templates}
        currentUser={appState.currentUser}
        autoNomorGenerator={(kode) => apiService.generateNomorSuratKeluar(kode)}
        initialData={editingSuratKeluar}
      />

      {/* Multi-tier Approval Modal */}
      <SuratApprovalModal
        isOpen={approvalModalOpen}
        onClose={() => setApprovalModalOpen(false)}
        surat={activeApprovalSurat}
        currentUser={appState.currentUser}
        onProcessApproval={(suratId, action, catatan) =>
          apiService.processApproval(suratId, action, appState.currentUser, catatan)
        }
      />

      {/* Disposisi Modal */}
      <DisposisiModal
        isOpen={disposisiModalOpen}
        onClose={() => setDisposisiModalOpen(false)}
        onSave={(disp) => apiService.saveDisposisi(disp)}
        suratMasukList={appState.suratMasukList}
        unitKerjas={appState.unitKerjas}
        users={appState.users}
        currentUser={appState.currentUser}
        preselectedSurat={preselectedDisposisiSurat}
      />

      {/* QR Code Verification Modal */}
      <QRVerifyModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        verifyData={null}
      />

    </div>
  );
}
