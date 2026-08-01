import React, { useState } from 'react';
import {
  KeyRound,
  Mail,
  Eye,
  EyeOff,
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X
} from 'lucide-react';
import { User, MasterInstansi } from '../../types';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  users: User[];
  instansi: MasterInstansi;
  currentUser: User;
  onLoginSuccess: (user: User) => void;
}

export const LoginModal: React.FC<Props> = ({
  isOpen,
  onClose,
  users,
  instansi,
  currentUser,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPin = pin.trim();

    if (!cleanEmail) {
      setErrorMsg('Mohon masukkan Email terdaftar Anda.');
      return;
    }

    if (!cleanPin) {
      setErrorMsg('Mohon masukkan PIN Akses Email.');
      return;
    }

    // Search for registered user by email
    const targetUser = users.find(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    if (!targetUser) {
      setErrorMsg('Email atau PIN Akses yang Anda masukkan tidak sesuai.');
      return;
    }

    if (targetUser.status !== 'Aktif') {
      setErrorMsg('Akun pengguna ini dalam status Nonaktif. Hubungi Administrator.');
      return;
    }

    // Verify PIN securely against stored pin
    const expectedPin = targetUser.pin;
    if (!expectedPin || cleanPin !== expectedPin) {
      setErrorMsg('Email atau PIN Akses yang Anda masukkan tidak sesuai.');
      return;
    }

    // Success!
    setSuccessMsg(`Login Berhasil! Selamat datang, ${targetUser.nama}`);
    setTimeout(() => {
      onLoginSuccess(targetUser);
      if (onClose) onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col">
        
        {/* Header Branding */}
        <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 p-6 text-white text-center relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="w-16 h-16 mx-auto mb-3 bg-white/10 p-2.5 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-inner">
            {instansi.logo ? (
              <img src={instansi.logo} alt="Logo" className="w-full h-full object-contain" />
            ) : (
              <Building2 className="w-8 h-8 text-sky-400" />
            )}
          </div>

          <h2 className="text-lg font-bold tracking-tight text-white">{instansi.nama}</h2>
          <p className="text-xs text-sky-300 font-medium mt-0.5">Sistem Administrasi Persuratan & Disposisi Digital</p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/20 rounded-full border border-sky-400/30 text-[10px] font-bold text-sky-200 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Autentikasi Keamanan PIN Email
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 space-y-5">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2 animate-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in slide-in-from-top-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-semibold">{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Alamat Email Terdaftar
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email resmi Anda"
                  className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* PIN Email Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  PIN Akses Email
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-3 h-3" /> Lupa PIN?
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPin ? 'text' : 'password'}
                  maxLength={10}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Masukkan PIN Akses Anda"
                  className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono tracking-widest text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <KeyRound className="w-4 h-4" /> Masuk Aplikasi e-Surat
            </button>
          </form>

        </div>

        {/* Footer info */}
        <div className="bg-slate-50 dark:bg-slate-950 p-3 text-center border-t border-slate-200 dark:border-slate-800">
          <p className="text-[10px] text-slate-400">
            e-Surat Digital Government &copy; {new Date().getFullYear()} - Terenkripsi & Terverifikasi
          </p>
        </div>

      </div>

      {/* Forgot PIN Info Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-sm w-full p-5 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-600">
              <HelpCircle className="w-5 h-5" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Bantuan Akses PIN</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Demi keamanan sistem, PIN Akses Email dikelola oleh Administrator Instansi atau dapat diperbarui secara mandiri oleh pejabat yang berwenang.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Jika Anda lupa PIN Akses Email Anda, silakan hubungi Administrator Subbagian Kepegawaian/Umum untuk melakukan verifikasi dan pembaruan PIN.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-1.5 bg-sky-600 text-white font-bold text-xs rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
