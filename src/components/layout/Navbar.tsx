import React, { useState } from 'react';
import {
  Bell,
  Sun,
  Moon,
  QrCode,
  UserCheck,
  ChevronDown,
  CheckCircle2,
  Clock,
  Sparkles,
  Calendar,
  KeyRound,
  LogOut
} from 'lucide-react';
import { User, NotificationItem } from '../../types';
import { formatTanggalIndo } from '../../utils/formatter';

interface Props {
  currentUser: User;
  users: User[];
  onSwitchUser: (user: User) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
  onOpenQRVerify?: () => void;
  onOpenLogin?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentUser,
  users,
  onSwitchUser,
  activeTab,
  notifications,
  onMarkAllNotificationsRead,
  onOpenQRVerify,
  onOpenLogin,
  isDarkMode = false,
  onToggleDarkMode
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.dibaca).length;

  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Overview Utama';
      case 'surat-masuk': return 'Manajemen Surat Masuk';
      case 'surat-keluar': return 'Manajemen Surat Keluar';
      case 'disposisi': return 'Tracking & Disposisi Surat';
      case 'templates': return 'Template Surat Resmi';
      case 'instansi': return 'Master Data Instansi';
      case 'pegawai': return 'Master Data Pegawai';
      case 'jabatan-unit': return 'Jabatan & Unit Kerja';
      case 'klasifikasi': return 'Klasifikasi Surat';
      case 'penandatangan': return 'Master Penandatangan TTD';
      case 'arsip': return 'Arsip Surat Digital';
      case 'laporan': return 'Laporan & Rekapitulasi';
      case 'pengaturan': return 'Pengaturan & Audit Trail';
      default: return 'Portal Administrasi';
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 flex-shrink-0 sticky top-0 z-40 shadow-xs">
      
      {/* Left: Clean Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-400 font-medium">Dashboard</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 dark:text-white font-semibold">{getTabTitle(activeTab)}</span>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-5">
        
        {/* Date Display */}
        <div className="hidden md:flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>{formatTanggalIndo(new Date())}</span>
        </div>

        {/* QR Verify Quick Action */}
        {onOpenQRVerify && (
          <button
            onClick={onOpenQRVerify}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-lg border border-blue-200 dark:border-blue-800 transition-all"
            title="Cek keaslian TTD Digital"
          >
            <QrCode className="w-4 h-4 text-blue-600" />
            <span>Verifikasi QR</span>
          </button>
        )}

        {/* Dark Mode Toggle */}
        {onToggleDarkMode && (
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        )}

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] text-white font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Notifikasi System</h4>
                <button
                  onClick={onMarkAllNotificationsRead}
                  className="text-[10px] font-semibold text-blue-600 hover:underline"
                >
                  Tandai Dibaca
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-xl border text-xs ${
                      !item.dibaca
                        ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/40'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                      <span>{item.judul}</span>
                      <Clock className="w-3 h-3 text-slate-400" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{item.pesan}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{item.waktu}</p>
                  </div>
                ))}

                {notifications.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-4">Belum ada notifikasi baru.</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

        {/* User Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {currentUser.nama.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-medium text-slate-900 dark:text-white truncate max-w-[130px]">
                {currentUser.nama}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[130px]">
                {currentUser.role}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {/* Role Switching Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50">
              <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl mb-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Akun Aktif</p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{currentUser.nama}</p>
                <p className="text-[10px] text-slate-500">{currentUser.email} • {currentUser.role}</p>
              </div>

              {onOpenLogin && (
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenLogin();
                  }}
                  className="w-full mb-2 p-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <KeyRound className="w-4 h-4" /> Login Akses Email & PIN
                </button>
              )}

              <div className="text-[10px] font-bold text-slate-400 uppercase px-3 my-1">Switch Akun Pengguna:</div>
              <div className="space-y-1 max-h-52 overflow-y-auto">
                {users.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSwitchUser(u);
                      setShowUserMenu(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                      u.id === currentUser.id
                        ? 'bg-blue-50 dark:bg-blue-950/60 font-bold text-blue-700 dark:text-blue-300'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{u.nama}</p>
                        <p className="text-[10px] text-slate-500">{u.role}</p>
                      </div>
                    </div>
                    {u.id === currentUser.id && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
