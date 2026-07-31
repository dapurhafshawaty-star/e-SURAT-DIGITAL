import React, { useState } from 'react';
import { PenTool, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { MasterPenandatangan } from '../../types';
import { SignaturePadModal } from '../common/SignaturePadModal';

interface Props {
  penandatangans: MasterPenandatangan[];
  onSave: (p: MasterPenandatangan) => void;
  onDelete: (id: string) => void;
}

export const MasterPenandatanganView: React.FC<Props> = ({ penandatangans, onSave, onDelete }) => {
  const [activeSignatory, setActiveSignatory] = useState<MasterPenandatangan | null>(null);
  const [showPadModal, setShowPadModal] = useState(false);

  // Form
  const [nama, setNama] = useState('');
  const [nip, setNip] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [pangkat, setPangkat] = useState('Pembina Utama Muda (IV/c)');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !nip.trim()) return;
    onSave({
      id: `ttd-${Date.now()}`,
      nama,
      nip,
      jabatan,
      pangkatGolongan: pangkat,
      statusAktif: true
    });
    setNama('');
    setNip('');
    setJabatan('');
  };

  const handleSaveSignature = (dataUrl: string) => {
    if (activeSignatory) {
      onSave({ ...activeSignatory, ttdImage: dataUrl });
      setActiveSignatory(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Master Pejabat Penandatangan Surat</h1>
            <p className="text-xs text-slate-500">Daftar pejabat berwenang beserta spesimen TTD digital & sertifikat QR</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Add */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Tambah Pejabat Penandatangan</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Nama Pejabat & Gelar</label>
              <input
                type="text"
                placeholder="Dr. H. Ahmad Wijaya, M.Si."
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">NIP Pejabat</label>
              <input
                type="text"
                placeholder="19820315 200801 1 002"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Jabatan Kedinasan</label>
              <input
                type="text"
                placeholder="Kepala Dinas Informatika"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Pangkat & Golongan</label>
              <input
                type="text"
                value={pangkat}
                onChange={(e) => setPangkat(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Simpan Pejabat
            </button>
          </form>
        </div>

        {/* Table List */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
                <th className="py-3.5 px-4">Pejabat</th>
                <th className="py-3.5 px-4">NIP & Golongan</th>
                <th className="py-3.5 px-4">Spesimen TTD</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {penandatangans.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{p.nama}</p>
                    <p className="text-[10px] text-slate-500">{p.jabatan}</p>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <p className="font-bold text-slate-700 dark:text-slate-300">{p.nip}</p>
                    <p className="text-[10px] text-slate-400 font-sans">{p.pangkatGolongan}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    {p.ttdImage ? (
                      <div className="flex items-center gap-2">
                        <img src={p.ttdImage} alt="TTD" className="h-8 object-contain border rounded px-1" />
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Ada
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveSignatory(p);
                          setShowPadModal(true);
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-[10px] font-bold rounded-lg flex items-center gap-1"
                      >
                        <PenTool className="w-3 h-3" /> Buat TTD Digital
                      </button>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={() => onDelete(p.id)} className="p-1 text-rose-600 hover:bg-rose-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <SignaturePadModal
        isOpen={showPadModal}
        onClose={() => setShowPadModal(false)}
        onSave={handleSaveSignature}
        title={`Spesimen TTD Digital ${activeSignatory?.nama || ''}`}
      />

    </div>
  );
};
