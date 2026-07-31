import React, { useState } from 'react';
import { Tag, Plus, Trash2 } from 'lucide-react';
import { MasterKlasifikasi } from '../../types';

interface Props {
  klasifikasis: MasterKlasifikasi[];
  onSave: (klasifikasi: MasterKlasifikasi) => void;
  onDelete: (id: string) => void;
}

export const MasterKlasifikasiView: React.FC<Props> = ({ klasifikasis, onSave, onDelete }) => {
  const [kode, setKode] = useState('');
  const [nama, setNama] = useState('');
  const [retensi, setRetensi] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kode.trim() || !nama.trim()) return;
    onSave({
      id: `kls-${Date.now()}`,
      kodeKlasifikasi: kode,
      namaKlasifikasi: nama,
      retensiTahun: Number(retensi)
    });
    setKode('');
    setNama('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-2xl">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Master Klasifikasi Surat Dinas</h1>
            <p className="text-xs text-slate-500">Standar Kode Klasifikasi Arsip (KKA) Permendagri / Arsip Nasional</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Add */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Tambah Kode Klasifikasi</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Kode Klasifikasi (KKA)</label>
              <input
                type="text"
                placeholder="Contoh: 005/UND / 800/SDM"
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Nama Klasifikasi / Perihal</label>
              <input
                type="text"
                placeholder="Contoh: Undangan Kedinasan & Rapat"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Masa Retensi Arsip (Tahun)</label>
              <input
                type="number"
                value={retensi}
                onChange={(e) => setRetensi(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Simpan Kode Klasifikasi
            </button>
          </form>
        </div>

        {/* Table List */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
                <th className="py-3.5 px-4">Kode KKA</th>
                <th className="py-3.5 px-4">Nama Klasifikasi Surat</th>
                <th className="py-3.5 px-4">Retensi Arsip</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {klasifikasis.map((k) => (
                <tr key={k.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{k.kodeKlasifikasi}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">{k.namaKlasifikasi}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600 dark:text-slate-400">{k.retensiTahun} Tahun</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onDelete(k.id)}
                      className="p-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
