import React, { useState } from 'react';
import { CheckCircle2, ShieldAlert, Search, QrCode, X } from 'lucide-react';
import { MasterInstansi } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  instansi: MasterInstansi;
}

export const QRVerifyModal: React.FC<Props> = ({ isOpen, onClose, instansi }) => {
  const [searchNomor, setSearchNomor] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchNomor.trim()) return;

    setVerifying(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/verify/${encodeURIComponent(searchNomor.trim())}`);
      const data = await res.json();
      if (data.valid) {
        setResult(data);
      } else {
        setError(data.message || 'Nomor Surat tidak terdaftar di Sistem Registry e-Surat.');
      }
    } catch (err: any) {
      setError('Gagal menghubungkan ke server verifikasi.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/20 rounded-lg border border-sky-400/30">
              <QrCode className="w-6 h-6 text-sky-300" />
            </div>
            <div>
              <h3 className="font-bold text-base">Verifikasi Keabsahan Surat</h3>
              <p className="text-xs text-sky-200">Portal Keabsahan Tanda Tangan Digital BSrE</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-sky-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleCheck} className="mb-6">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
              Masukkan Nomor Surat / Kode QR
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchNomor}
                  onChange={(e) => setSearchNomor(e.target.value)}
                  placeholder="Contoh: 001/005/UND/DISKOMINFO/VII/2026"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button
                type="submit"
                disabled={verifying}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2"
              >
                {verifying ? 'Cek...' : <><Search className="w-4 h-4" /> Verifikasi</>}
              </button>
            </div>
          </form>

          {/* Verification Result */}
          {result && (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                DOKUMEN RESMI TERVERIFIKASI
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 border-t border-emerald-200/60 dark:border-emerald-800/60 pt-3">
                <p><span className="font-semibold text-slate-500 dark:text-slate-400">Instansi:</span> {result.instansi}</p>
                <p><span className="font-semibold text-slate-500 dark:text-slate-400">Nomor Surat:</span> <span className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-emerald-200">{result.nomorSurat}</span></p>
                <p><span className="font-semibold text-slate-500 dark:text-slate-400">Perihal:</span> {result.perihal}</p>
                <p><span className="font-semibold text-slate-500 dark:text-slate-400">Tanggal:</span> {result.tanggal}</p>
                <p><span className="font-semibold text-slate-500 dark:text-slate-400">Penandatangan:</span> {result.penandatangan} (NIP: {result.nip})</p>
                <p><span className="font-semibold text-slate-500 dark:text-slate-400">Sertifikat:</span> Validated Electronic Signature (BSrE / e-Sign)</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl p-4 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-rose-800 dark:text-rose-300">Gagal Memverifikasi</h4>
                <p className="text-xs text-rose-700 dark:text-rose-400 mt-1">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-3 border-t border-slate-200 dark:border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
