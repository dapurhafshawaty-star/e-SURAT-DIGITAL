import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ShieldCheck, Clock, UserCheck, X } from 'lucide-react';
import { SuratKeluar, User, ApprovalStage } from '../../types';
import { formatDateTimeIndo } from '../../utils/formatter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  surat: SuratKeluar | null;
  currentUser: User;
  onProcessApproval: (suratId: string, action: 'Approve' | 'Reject' | 'Revision', catatan?: string) => void;
}

const STAGES: ApprovalStage[] = ['Operator', 'Kepala Bagian', 'Sekretaris', 'Pimpinan', 'Final'];

export const SuratApprovalModal: React.FC<Props> = ({
  isOpen,
  onClose,
  surat,
  currentUser,
  onProcessApproval
}) => {
  const [catatan, setCatatan] = useState('');

  if (!isOpen || !surat) return null;

  const currentIdx = STAGES.indexOf(surat.currentApprovalStage);

  const handleAction = (action: 'Approve' | 'Reject' | 'Revision') => {
    if ((action === 'Reject' || action === 'Revision') && !catatan.trim()) {
      alert('Mohon tuliskan alasan/catatan revisi atau penolakan.');
      return;
    }
    onProcessApproval(surat.id, action, catatan);
    setCatatan('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white p-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/20 rounded-xl border border-sky-400/30">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h3 className="font-bold text-base">Persetujuan Berjenjang Naskah Dinas</h3>
              <p className="text-xs text-sky-200">{surat.nomorSurat} - {surat.jenisSurat}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Stepper Progress Bar */}
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Tahapan Workflow Approval
            </p>
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-800 z-0" />
              
              {STAGES.map((stg, idx) => {
                const isPassed = idx < currentIdx || surat.status === 'Disetujui';
                const isCurrent = idx === currentIdx && surat.status !== 'Disetujui';
                
                return (
                  <div key={stg} className="relative z-10 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPassed ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 dark:ring-emerald-950' :
                      isCurrent ? 'bg-amber-500 text-white ring-4 ring-amber-100 dark:ring-amber-950 animate-pulse' :
                      'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span className={`text-[10px] font-semibold mt-1.5 ${isCurrent ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500'}`}>
                      {stg}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Letter Info Box */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs">
            <p><span className="font-semibold text-slate-500">Perihal:</span> <span className="font-bold text-slate-900 dark:text-white">{surat.perihal}</span></p>
            <p><span className="font-semibold text-slate-500">Tujuan:</span> {surat.tujuan}</p>
            <p><span className="font-semibold text-slate-500">Penandatangan Akhir:</span> {surat.penandatanganNama} ({surat.penandatanganJabatan})</p>
          </div>

          {/* History Log Timeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Riwayat Persetujuan
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {surat.approvalHistory.map((ah) => (
                <div key={ah.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                      <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                      <span>{ah.actorNama} ({ah.stage})</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">{ah.catatan || 'Tanpa catatan'}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{formatDateTimeIndo(ah.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Input */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Catatan Persetujuan / Catatan Revisi (Opsional untuk setuju, Wajib untuk Tolak/Revisi)
            </label>
            <textarea
              rows={3}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Tuliskan catatan verifikasi naskah dinas..."
              className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />

            {/* Approval Decision Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleAction('Revision')}
                  className="px-3.5 py-2 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:text-amber-300 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Minta Revisi
                </button>
                <button
                  type="button"
                  onClick={() => handleAction('Reject')}
                  className="px-3.5 py-2 text-xs font-bold text-rose-800 bg-rose-100 hover:bg-rose-200 dark:bg-rose-950 dark:text-rose-300 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" /> Tolak Surat
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleAction('Approve')}
                className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> Setujui & Teruskan
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
