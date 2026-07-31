import React, { useState } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Send,
  GitPullRequest,
  FileText,
  Database,
  Building2,
  Users,
  Briefcase,
  Tag,
  PenTool,
  Archive,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  FileCheck
} from 'lucide-react';
import { User, Role } from '../../types';

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUser: User;
  counts?: {
    suratMasuk?: number;
    suratKeluarPending?: number;
    disposisiActive?: number;
  };
}

export const Sidebar: React.FC<Props> = ({
  activeTab,
  onTabChange,
  currentUser,
  counts = { suratMasuk: 3, suratKeluarPending: 1, disposisiActive: 2 }
}) => {
  const [masterOpen, setMasterOpen] = useState(
    ['instansi', 'pegawai', 'jabatan-unit', 'klasifikasi', 'penandatangan'].includes(activeTab)
  );

  const isMasterActive = ['instansi', 'pegawai', 'jabatan-unit', 'klasifikasi', 'penandatangan'].includes(activeTab);
  const role: Role = currentUser.role;

  const isActive = (tab: string) => activeTab === tab;

  return (
    <aside className="w-64 bg-[#1e293b] text-slate-300 flex flex-col flex-shrink-0 select-none border-r border-slate-800">
      
      {/* App Branding Top Header */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/30 flex-shrink-0">
          <FileCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-white font-bold tracking-tight text-lg leading-none">e-Surat</h1>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-semibold">Portal Administrasi</p>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <nav className="flex-1 py-4 overflow-y-auto space-y-4">
        
        {/* Menu Utama */}
        <div>
          <div className="px-6 py-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Utama
          </div>

          <div className="space-y-0.5">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`w-full flex items-center justify-between px-6 py-2.5 transition-colors text-sm font-medium ${
                isActive('dashboard')
                  ? 'bg-blue-600/10 text-blue-400 border-l-4 border-blue-600 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => onTabChange('surat-masuk')}
              className={`w-full flex items-center justify-between px-6 py-2.5 transition-colors text-sm font-medium ${
                isActive('surat-masuk')
                  ? 'bg-blue-600/10 text-blue-400 border-l-4 border-blue-600 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-5 h-5" />
                <span>Surat Masuk</span>
              </div>
              {counts.suratMasuk && counts.suratMasuk > 0 ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                  {counts.suratMasuk}
                </span>
              ) : null}
            </button>

            <button
              onClick={() => onTabChange('surat-keluar')}
              className={`w-full flex items-center justify-between px-6 py-2.5 transition-colors text-sm font-medium ${
                isActive('surat-keluar')
                  ? 'bg-blue-600/10 text-blue-400 border-l-4 border-blue-600 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5" />
                <span>Surat Keluar</span>
              </div>
              {counts.suratKeluarPending && counts.suratKeluarPending > 0 ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                  {counts.suratKeluarPending}
                </span>
              ) : null}
            </button>

            <button
              onClick={() => onTabChange('disposisi')}
              className={`w-full flex items-center justify-between px-6 py-2.5 transition-colors text-sm font-medium ${
                isActive('disposisi')
                  ? 'bg-blue-600/10 text-blue-400 border-l-4 border-blue-600 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <GitPullRequest className="w-5 h-5" />
                <span>Disposisi</span>
              </div>
              {counts.disposisiActive && counts.disposisiActive > 0 ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                  {counts.disposisiActive}
                </span>
              ) : null}
            </button>

            <button
              onClick={() => onTabChange('templates')}
              className={`w-full flex items-center justify-between px-6 py-2.5 transition-colors text-sm font-medium ${
                isActive('templates')
                  ? 'bg-blue-600/10 text-blue-400 border-l-4 border-blue-600 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5" />
                <span>Template Surat</span>
              </div>
            </button>
          </div>
        </div>

        {/* Administrasi Master */}
        {(role === 'Administrator' || role === 'Operator' || role === 'Sekretaris' || role === 'Pimpinan') && (
          <div>
            <div className="px-6 py-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Konfigurasi
            </div>

            <div className="space-y-0.5">
              <button
                onClick={() => setMasterOpen(!masterOpen)}
                className={`w-full flex items-center justify-between px-6 py-2.5 transition-colors text-sm font-medium ${
                  isMasterActive
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-blue-400" />
                  <span>Master Data</span>
                </div>
                {masterOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>

              {masterOpen && (
                <div className="bg-slate-900/50 py-1 space-y-0.5">
                  <button
                    onClick={() => onTabChange('instansi')}
                    className={`w-full flex items-center gap-3 pl-12 pr-6 py-2 text-xs transition-colors ${
                      isActive('instansi') ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Master Instansi</span>
                  </button>

                  <button
                    onClick={() => onTabChange('pegawai')}
                    className={`w-full flex items-center gap-3 pl-12 pr-6 py-2 text-xs transition-colors ${
                      isActive('pegawai') ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Master Pegawai</span>
                  </button>

                  <button
                    onClick={() => onTabChange('jabatan-unit')}
                    className={`w-full flex items-center gap-3 pl-12 pr-6 py-2 text-xs transition-colors ${
                      isActive('jabatan-unit') ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Jabatan & Unit</span>
                  </button>

                  <button
                    onClick={() => onTabChange('klasifikasi')}
                    className={`w-full flex items-center gap-3 pl-12 pr-6 py-2 text-xs transition-colors ${
                      isActive('klasifikasi') ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Tag className="w-4 h-4" />
                    <span>Klasifikasi Surat</span>
                  </button>

                  <button
                    onClick={() => onTabChange('penandatangan')}
                    className={`w-full flex items-center gap-3 pl-12 pr-6 py-2 text-xs transition-colors ${
                      isActive('penandatangan') ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <PenTool className="w-4 h-4" />
                    <span>Penandatangan TTD</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Arsip & Laporan */}
        <div>
          <div className="px-6 py-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Laporan & Sistem
          </div>

          <div className="space-y-0.5">
            <button
              onClick={() => onTabChange('arsip')}
              className={`w-full flex items-center gap-3 px-6 py-2.5 transition-colors text-sm font-medium ${
                isActive('arsip')
                  ? 'bg-blue-600/10 text-blue-400 border-l-4 border-blue-600 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Archive className="w-5 h-5" />
              <span>Arsip Digital</span>
            </button>

            <button
              onClick={() => onTabChange('laporan')}
              className={`w-full flex items-center gap-3 px-6 py-2.5 transition-colors text-sm font-medium ${
                isActive('laporan')
                  ? 'bg-blue-600/10 text-blue-400 border-l-4 border-blue-600 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Laporan & Rekap</span>
            </button>

            <button
              onClick={() => onTabChange('pengaturan')}
              className={`w-full flex items-center gap-3 px-6 py-2.5 transition-colors text-sm font-medium ${
                isActive('pengaturan')
                  ? 'bg-blue-600/10 text-blue-400 border-l-4 border-blue-600 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Pengaturan System</span>
            </button>
          </div>
        </div>

      </nav>

      {/* User Info Footer Bar */}
      <div className="p-6 bg-slate-950/40 border-t border-slate-800/80">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.foto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'}
            alt={currentUser.nama}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-700 flex-shrink-0"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-medium text-white truncate">{currentUser.nama}</p>
            <p className="text-[10px] text-slate-400 truncate">{currentUser.jabatan} ({currentUser.role})</p>
          </div>
        </div>
      </div>

    </aside>
  );
};
